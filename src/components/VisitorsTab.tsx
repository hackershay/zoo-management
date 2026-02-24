import { useState } from "react";
import { visitors, Visitor } from "@/data/zooData";
import { Button } from "@/components/ui/button";

const VisitorsTab = () => {
  return (
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
  );
};

export default VisitorsTab;
