import { useState } from "react";
import { departments, getDepartmentById, Staff } from "@/data/zooData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const staffEmojis = ["👨‍⚕️", "👩‍🔬", "🧑‍🔧", "👨‍💼", "👮", "🧑‍⚕️", "👩‍🏫", "🧑‍🍳", "👨‍💻", "🔬"];

interface StaffSectionProps {
  staffList: Staff[];
  onAddStaff: (staff: Staff) => void;
  onFireStaff: (staffId: number) => void;
  onUpdateStaff: (staff: Staff) => void;
}

const StaffFormFields = ({
  name, setName, salary, setSalary, email, setEmail, phone, setPhone, departmentId, setDepartmentId,
}: {
  name: string; setName: (v: string) => void;
  salary: string; setSalary: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  departmentId: number; setDepartmentId: (v: number) => void;
}) => (
  <>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Full Name</label>
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dr. Jane Doe" required />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-nunito font-bold text-foreground">Salary (₹)</label>
        <Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="35000" required />
      </div>
      <div>
        <label className="text-sm font-nunito font-bold text-foreground">Department</label>
        <select value={departmentId} onChange={e => setDepartmentId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
          {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Email</label>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@zoo.com" required />
    </div>
    <div>
      <label className="text-sm font-nunito font-bold text-foreground">Phone</label>
      <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" />
    </div>
  </>
);

const StaffSection = ({ staffList, onAddStaff, onFireStaff, onUpdateStaff }: StaffSectionProps) => {
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState(departments[0].id);
  const [confirmFire, setConfirmFire] = useState<number | null>(null);

  // Edit state
  const [editStaff, setEditStaff] = useState<Staff | null>(null);
  const [eName, setEName] = useState("");
  const [eSalary, setESalary] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [ePhone, setEPhone] = useState("");
  const [eDeptId, setEDeptId] = useState(1);

  const openEdit = (s: Staff) => {
    setEditStaff(s);
    setEName(s.name); setESalary(String(s.salary));
    setEEmail(s.email); setEPhone(s.phone); setEDeptId(s.departmentId);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !salary || !email.trim()) return;
    const maxId = Math.max(...staffList.map(s => s.id), 200);
    onAddStaff({
      id: maxId + 1, name: name.trim(), salary: Number(salary),
      hireDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).toUpperCase(),
      departmentId, phone: phone.trim(), email: email.trim(),
    });
    setName(""); setSalary(""); setEmail(""); setPhone("");
    setAddOpen(false);
  };

  const handleEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStaff || !eName.trim() || !eSalary || !eEmail.trim()) return;
    onUpdateStaff({
      ...editStaff, name: eName.trim(), salary: Number(eSalary),
      email: eEmail.trim(), phone: ePhone.trim(), departmentId: eDeptId,
    });
    setEditStaff(null);
  };

  const handleFire = (id: number) => {
    if (confirmFire === id) { onFireStaff(id); setConfirmFire(null); }
    else { setConfirmFire(id); }
  };

  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bungee text-2xl text-foreground">🧑‍⚕️ Staff</h2>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="font-nunito font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">➕ Hire Staff</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
              <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">Hire New Staff</DialogTitle></DialogHeader>
              <form onSubmit={handleAddStaff} className="space-y-4 mt-2">
                <StaffFormFields {...{ name, setName, salary, setSalary, email, setEmail, phone, setPhone, departmentId, setDepartmentId }} />
                <Button type="submit" className="w-full font-nunito font-bold">👤 Hire Staff Member</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffList.map((s, i) => {
            const dept = getDepartmentById(s.departmentId);
            return (
              <div key={s.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{staffEmojis[i % staffEmojis.length]}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-nunito font-bold text-foreground">{s.name}</h3>
                    <p className="text-xs text-muted-foreground font-nunito">{dept?.name || "N/A"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs font-nunito">
                  <span className="text-muted-foreground">Salary:</span>
                  <span className="font-semibold text-foreground">₹{s.salary.toLocaleString()}</span>
                  <span className="text-muted-foreground">Hired:</span>
                  <span className="font-semibold text-foreground">{s.hireDate}</span>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold text-foreground truncate">{s.email}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="flex-1 text-xs font-nunito font-bold py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleFire(s.id)}
                    className={`flex-1 text-xs font-nunito font-bold py-1.5 rounded-lg transition-all ${
                      confirmFire === s.id
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    }`}
                  >
                    {confirmFire === s.id ? "⚠️ Confirm?" : "🔥 Fire"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Staff Dialog */}
      <Dialog open={!!editStaff} onOpenChange={(o) => { if (!o) setEditStaff(null); }}>
        <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
          <DialogHeader><DialogTitle className="font-bungee text-xl text-foreground">Edit Staff</DialogTitle></DialogHeader>
          <form onSubmit={handleEditStaff} className="space-y-4 mt-2">
            <StaffFormFields name={eName} setName={setEName} salary={eSalary} setSalary={setESalary} email={eEmail} setEmail={setEEmail} phone={ePhone} setPhone={setEPhone} departmentId={eDeptId} setDepartmentId={setEDeptId} />
            <Button type="submit" className="w-full font-nunito font-bold">✅ Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Departments */}
      <div>
        <h2 className="font-bungee text-2xl text-foreground mb-4">🏢 Departments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d) => (
            <div key={d.id} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <h3 className="font-nunito font-bold text-foreground mb-1">{d.name}</h3>
              <p className="text-xs text-muted-foreground font-nunito">📍 {d.location}</p>
              <p className="text-xs text-muted-foreground font-nunito">📞 {d.contactNo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
