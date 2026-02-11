import { visitors, tickets, maintenance, enclosures, staff as staffData } from "@/data/zooData";

const VisitorsSection = () => {
  return (
    <section className="space-y-8">
      {/* Visitors */}
      <div>
        <h2 className="font-bungee text-2xl text-foreground mb-4">🎫 Visitors</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm font-nunito">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Name</th>
                <th className="px-4 py-3 text-left font-bold">Membership</th>
                <th className="px-4 py-3 text-left font-bold">Email</th>
                <th className="px-4 py-3 text-left font-bold">Phone</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tickets */}
      <div>
        <h2 className="font-bungee text-2xl text-foreground mb-4">🎟️ Tickets</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tickets.map((t) => {
            const visitor = visitors.find(v => v.id === t.visitorId);
            return (
              <div key={t.id} className="bg-card border border-border rounded-lg p-3 shadow-sm text-center">
                <p className="font-bungee text-lg text-primary">₹{t.price}</p>
                <p className="text-xs font-nunito font-bold text-foreground">{t.ticketType}</p>
                <p className="text-xs text-muted-foreground font-nunito">{visitor?.name}</p>
                <p className="text-xs text-muted-foreground font-nunito">{t.visitDate}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Maintenance */}
      <div>
        <h2 className="font-bungee text-2xl text-foreground mb-4">🔧 Maintenance</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm font-nunito">
            <thead className="bg-accent text-accent-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Date</th>
                <th className="px-4 py-3 text-left font-bold">Type</th>
                <th className="px-4 py-3 text-left font-bold">Enclosure</th>
                <th className="px-4 py-3 text-left font-bold">Cost</th>
                <th className="px-4 py-3 text-left font-bold">Staff</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map((m, i) => {
                const enc = enclosures.find(e => e.id === m.enclosureId);
                const s = staffData.find(s => s.id === m.staffId);
                return (
                  <tr key={m.id} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                    <td className="px-4 py-2 text-foreground">{m.date}</td>
                    <td className="px-4 py-2 font-semibold text-foreground">{m.type}</td>
                    <td className="px-4 py-2 text-muted-foreground">{enc?.name || "N/A"}</td>
                    <td className="px-4 py-2 text-foreground font-semibold">₹{m.cost.toLocaleString()}</td>
                    <td className="px-4 py-2 text-muted-foreground">{s?.name || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default VisitorsSection;
