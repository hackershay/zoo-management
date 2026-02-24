import { useState } from "react";
import { Visitor, visitors as initialVisitors } from "@/data/zooData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VisitorFormFields = ({
  name, setName, email, setEmail, phone, setPhone, membershipType, setMembershipType,
}: {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  membershipType: string; setMembershipType: (v: string) => void;
}) => (
  <>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Name</label>
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" required />
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Membership</label>
      <select value={membershipType} onChange={e => setMembershipType(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
        <option>Regular</option>
        <option>Premium</option>
        <option>VIP</option>
      </select>
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Email</label>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com" required />
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Phone</label>
      <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" required />
    </div>
  </>
);

const VisitorsTab = () => {
  const [visitorsList, setVisitorsList] = useState<Visitor[]>(initialVisitors);
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipType, setMembershipType] = useState("Regular");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Edit
  const [editVisitor, setEditVisitor] = useState<Visitor | null>(null);
  const [eName, setEName] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [ePhone, setEPhone] = useState("");
  const [eMembership, setEMembership] = useState("Regular");

  const openEdit = (v: Visitor) => {
    setEditVisitor(v);
    setEName(v.name); setEEmail(v.email); setEPhone(v.phone); setEMembership(v.membershipType);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    const maxId = Math.max(...visitorsList.map(v => v.id), 100);
    setVisitorsList(prev => [...prev, {
      id: maxId + 1, name: name.trim(), email: email.trim(),
      phone: phone.trim(), membershipType,
    }]);
    setName(""); setEmail(""); setPhone("");
    setAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVisitor || !eName.trim()) return;
    setVisitorsList(prev => prev.map(v =>
      v.id === editVisitor.id ? { ...v, name: eName.trim(), email: eEmail.trim(), phone: ePhone.trim(), membershipType: eMembership } : v
    ));
    setEditVisitor(null);
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      setVisitorsList(prev => prev.filter(v => v.id !== id));
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bungee text-2xl text-foreground">🎫 Visitors</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="font-nunito font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">➕ Add Visitor</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
            <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">Add Visitor</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <VisitorFormFields {...{ name, setName, email, setEmail, phone, setPhone, membershipType, setMembershipType }} />
              <Button type="submit" className="w-full font-nunito font-bold">🎫 Add Visitor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm font-nunito">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Name</th>
              <th className="px-4 py-3 text-left font-bold">Membership</th>
              <th className="px-4 py-3 text-left font-bold">Email</th>
              <th className="px-4 py-3 text-left font-bold">Phone</th>
              <th className="px-4 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitorsList.map((v, i) => (
              <tr key={v.id} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                <td className="px-4 py-2 font-semibold text-foreground">{v.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    v.membershipType === "VIP" ? "bg-zoo-gold text-zoo-brown" :
                    v.membershipType === "Premium" ? "bg-secondary text-secondary-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>{v.membershipType}</span>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{v.email}</td>
                <td className="px-4 py-2 text-muted-foreground">{v.phone}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(v)} className="text-xs font-nunito font-bold px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(v.id)} className={`text-xs font-nunito font-bold px-2 py-1 rounded transition-all ${
                      confirmDelete === v.id ? "bg-destructive text-destructive-foreground" : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    }`}>
                      {confirmDelete === v.id ? "⚠️" : "🗑️"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editVisitor} onOpenChange={(o) => { if (!o) setEditVisitor(null); }}>
        <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
          <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">Edit Visitor</DialogTitle></DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-2">
            <VisitorFormFields name={eName} setName={setEName} email={eEmail} setEmail={setEEmail} phone={ePhone} setPhone={setEPhone} membershipType={eMembership} setMembershipType={setEMembership} />
            <Button type="submit" className="w-full font-nunito font-bold">✅ Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitorsTab;
