import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import EnclosureCard from "@/components/EnclosureCard";
import AnimalModal from "@/components/AnimalModal";
import StaffSection from "@/components/StaffSection";
import VisitorsSection from "@/components/VisitorsSection";
import { enclosures, Enclosure } from "@/data/zooData";

type Tab = "enclosures" | "staff" | "visitors";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("enclosures");
  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(null);

  if (showLoading) {
    return <LoadingScreen onEnter={() => setShowLoading(false)} />;
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "enclosures", label: "Enclosures", icon: "🏠" },
    { key: "staff", label: "Staff & Depts", icon: "👥" },
    { key: "visitors", label: "Visitors & More", icon: "🎫" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-zoo-green sticky top-0 z-40 shadow-lg">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="font-bungee text-2xl md:text-3xl text-zoo-gold drop-shadow">
            🦁 Zoo DBMS
          </h1>
          <div className="flex gap-1 md:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-nunito font-bold text-xs md:text-sm px-3 md:px-5 py-2 rounded-lg transition-all ${
                  activeTab === tab.key
                    ? "bg-zoo-gold text-zoo-brown shadow-md"
                    : "bg-zoo-brown/40 text-zoo-sand hover:bg-zoo-brown/60"
                }`}
              >
                <span className="hidden md:inline">{tab.icon} </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-8">
        {activeTab === "enclosures" && (
          <div className="animate-fade-in">
            <h2 className="font-bungee text-3xl text-foreground mb-2">🐾 Enclosures</h2>
            <p className="text-muted-foreground font-nunito mb-6">
              Click on an enclosure to see the animals inside!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {enclosures.map((enc) => (
                <EnclosureCard
                  key={enc.id}
                  enclosure={enc}
                  onClick={setSelectedEnclosure}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "staff" && (
          <div className="animate-fade-in">
            <StaffSection />
          </div>
        )}

        {activeTab === "visitors" && (
          <div className="animate-fade-in">
            <VisitorsSection />
          </div>
        )}
      </main>

      <AnimalModal
        enclosure={selectedEnclosure}
        open={!!selectedEnclosure}
        onClose={() => setSelectedEnclosure(null)}
      />

      {/* Footer */}
      <footer className="bg-zoo-green text-zoo-sand py-4 mt-8">
        <div className="container text-center font-nunito text-sm">
          <p className="font-bold">Zoo Database Management System</p>
          <p className="text-zoo-sand/60 text-xs mt-1">
            Created by Shreya Elizabeth Joseph • Kamuel Shawn • Joel Jacob Roji • Darren Samuel D'cruz
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
