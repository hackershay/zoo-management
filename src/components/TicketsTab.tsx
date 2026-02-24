import { useState } from "react";
import { Ticket, visitors, tickets as initialTickets } from "@/data/zooData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TicketsTab = () => {
  const [ticketsList, setTicketsList] = useState<Ticket[]>(initialTickets);
  const [open, setOpen] = useState(false);
  const [visitorId, setVisitorId] = useState(visitors[0].id);
  const [visitDate, setVisitDate] = useState("");
  const [ticketType, setTicketType] = useState("Adult");
  const [price, setPrice] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate.trim() || !price) return;
    const maxId = Math.max(...ticketsList.map(t => t.id), 200);
    setTicketsList(prev => [...prev, {
      id: maxId + 1,
      visitorId,
      visitDate: visitDate.trim(),
      ticketType,
      price: Number(price),
    }]);
    setVisitDate(""); setPrice("");
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      setTicketsList(prev => prev.filter(t => t.id !== id));
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bungee text-2xl text-foreground">🎟️ Tickets</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="font-nunito font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">
              ➕ Add Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
            <DialogHeader>
              <DialogTitle className="font-bungee text-xl text-foreground">New Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div>
                <label className="text-sm font-nunito font-bold text-foreground">Visitor</label>
                <select value={visitorId} onChange={e => setVisitorId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
                  {visitors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-nunito font-bold text-foreground">Visit Date</label>
                  <Input value={visitDate} onChange={e => setVisitDate(e.target.value)} placeholder="DD-MMM-YY" required />
                </div>
                <div>
                  <label className="text-sm font-nunito font-bold text-foreground">Type</label>
                  <select value={ticketType} onChange={e => setTicketType(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
                    <option>Adult</option>
                    <option>Child</option>
                    <option>VIP</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-nunito font-bold text-foreground">Price (₹)</label>
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="150" required />
              </div>
              <Button type="submit" className="w-full font-nunito font-bold">🎟️ Add Ticket</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ticketsList.map((t) => {
          const visitor = visitors.find(v => v.id === t.visitorId);
          return (
            <div key={t.id} className="bg-card border border-border rounded-lg p-3 shadow-sm text-center relative group">
              <p className="font-bungee text-lg text-primary">₹{t.price}</p>
              <p className="text-xs font-nunito font-bold text-foreground">{t.ticketType}</p>
              <p className="text-xs text-muted-foreground font-nunito">{visitor?.name}</p>
              <p className="text-xs text-muted-foreground font-nunito">{t.visitDate}</p>
              <button
                onClick={() => handleDelete(t.id)}
                className={`mt-2 w-full text-xs font-nunito font-bold py-1 rounded transition-all ${
                  confirmDelete === t.id
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                }`}
              >
                {confirmDelete === t.id ? "Confirm?" : "✕ Delete"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsTab;
