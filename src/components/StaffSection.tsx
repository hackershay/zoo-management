import { staff, departments, getDepartmentById } from "@/data/zooData";

const staffEmojis = ["👨‍⚕️", "👩‍🔬", "🧑‍🔧", "👨‍💼", "👮", "🧑‍⚕️", "👩‍🏫", "🧑‍🍳", "👨‍💻", "🔬"];

const StaffSection = () => {
  return (
    <section className="space-y-8">
      {/* Staff */}
      <div>
        <h2 className="font-bungee text-2xl text-foreground mb-4">🧑‍⚕️ Staff</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((s, i) => {
            const dept = getDepartmentById(s.departmentId);
            return (
              <div key={s.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{staffEmojis[i] || "🧑"}</span>
                  <div>
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
              </div>
            );
          })}
        </div>
      </div>

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
