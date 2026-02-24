import { useState } from "react";
import { Maintenance, maintenance as initialMaintenance, enclosures, staff as staffData } from "@/data/zooData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MaintenanceFormFields = ({
  date, setDate, type, setType, cost, setCost, enclosureId, setEnclosureId, staffId, setStaffId,
}: {
  date: string; setDate: (v: string) => void;
  type: string; setType: (v: string) => void;
  cost: string; setCost: (v: string) => void;
  enclosureId: number; setEnclosureId: (v: number) => void;
  staffId: number; setStaffId: (v: number) => void;
}) => (
  <>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-nunito font-bold text-foreground">Date</label>
        <Input value={date} onChange={e => setDate(e.target.value)} placeholder="DD-MMM-YY" required />
      </div>
      <div>
        <label className="text-sm font-nunito font-bold text-foreground">Type</label>
        <Input value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Cleaning" required />
      </div>
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Cost (₹)</label>
      <Input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="5000" required />
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Enclosure</label>
      <select value={enclosureId} onChange={e => setEnclosureId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
        {enclosures.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Staff</label>
      <select value={staffId} onChange={e => setStaffId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
        {staffData.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </div>
  </>
);

const MaintenanceTab = () => {
  const [maintenanceList, setMaintenanceList] = useState<Maintenance[]>(initialMaintenance);
  const [addOpen, setAddOpen] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [enclosureId, setEnclosureId] = useState(enclosures[0].id);
  const [staffId, setStaffId] = useState(staffData[0].id);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Edit
  const [editRecord, setEditRecord] = useState<Maintenance | null>(null);
  const [eDate, setEDate] = useState("");
  const [eType, setEType] = useState("");
  const [eCost, setECost] = useState("");
  const [eEncId, setEEncId] = useState(enclosures[0].id);
  const [eStaffId, setEStaffId] = useState(staffData[0].id);

  const openEdit = (m: Maintenance) => {
    setEditRecord(m);
    setEDate(m.date); setEType(m.type); setECost(String(m.cost));
    setEEncId(m.enclosureId); setEStaffId(m.staffId);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim() || !type.trim() || !cost) return;
    const maxId = Math.max(...maintenanceList.map(m => m.id), 300);
    setMaintenanceList(prev => [...prev, {
      id: maxId + 1, date: date.trim(), type: type.trim(),
      cost: Number(cost), enclosureId, staffId,
    }]);
    setDate(""); setType(""); setCost(""); setAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRecord || !eDate.trim() || !eType.trim() || !eCost) return;
    setMaintenanceList(prev => prev.map(m =>
      m.id === editRecord.id ? { ...m, date: eDate.trim(), type: eType.trim(), cost: Number(eCost), enclosureId: eEncId, staffId: eStaffId } : m
    ));
    setEditRecord(null);
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      setMaintenanceList(prev => prev.filter(m => m.id !== id));
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bungee text-2xl text-foreground">🔧 Maintenance</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="font-nunito font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">➕ Add Record</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
            <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">New Maintenance Record</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <MaintenanceFormFields {...{ date, setDate, type, setType, cost, setCost, enclosureId, setEnclosureId, staffId, setStaffId }} />
              <Button type="submit" className="w-full font-nunito font-bold">🔧 Add Record</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm font-nunito">
          <thead className="bg-accent text-accent-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Date</th>
              <th className="px-4 py-3 text-left font-bold">Type</th>
              <th className="px-4 py-3 text-left font-bold">Enclosure</th>
              <th className="px-4 py-3 text-left font-bold">Cost</th>
              <th className="px-4 py-3 text-left font-bold">Staff</th>
              <th className="px-4 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceList.map((m, i) => {
              const enc = enclosures.find(e => e.id === m.enclosureId);
              const s = staffData.find(s => s.id === m.staffId);
              return (
                <tr key={m.id} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="px-4 py-2 text-foreground">{m.date}</td>
                  <td className="px-4 py-2 font-semibold text-foreground">{m.type}</td>
                  <td className="px-4 py-2 text-muted-foreground">{enc?.name || "N/A"}</td>
                  <td className="px-4 py-2 text-foreground font-semibold">₹{m.cost.toLocaleString()}</td>
                  <td className="px-4 py-2 text-muted-foreground">{s?.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(m)} className="text-xs font-nunito font-bold px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(m.id)} className={`text-xs font-nunito font-bold px-2 py-1 rounded transition-all ${
                        confirmDelete === m.id ? "bg-destructive text-destructive-foreground" : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                      }`}>
                        {confirmDelete === m.id ? "⚠️" : "✕"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editRecord} onOpenChange={(o) => { if (!o) setEditRecord(null); }}>
        <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
          <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">Edit Maintenance Record</DialogTitle></DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-2">
            <MaintenanceFormFields date={eDate} setDate={setEDate} type={eType} setType={setEType} cost={eCost} setCost={setECost} enclosureId={eEncId} setEnclosureId={setEEncId} staffId={eStaffId} setStaffId={setEStaffId} />
            <Button type="submit" className="w-full font-nunito font-bold">✅ Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaintenanceTab;
