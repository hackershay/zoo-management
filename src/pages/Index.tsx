import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import EnclosureCard from "@/components/EnclosureCard";
import AnimalModal from "@/components/AnimalModal";
import StaffSection from "@/components/StaffSection";
import VisitorsTab from "@/components/VisitorsTab";
import TicketsTab from "@/components/TicketsTab";
import MaintenanceTab from "@/components/MaintenanceTab";
import AddAnimalForm from "@/components/AddAnimalForm";
import { enclosures, animals as initialAnimals, staff as initialStaff, Enclosure, Animal, Staff } from "@/data/zooData";

type Tab = "enclosures" | "staff" | "visitors" | "tickets" | "maintenance";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("enclosures");
  const [selectedEnclosure, setSelectedEnclosure] = useState<Enclosure | null>(null);
  const [animalsList, setAnimalsList] = useState<Animal[]>(initialAnimals);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);

  if (showLoading) {
    return <LoadingScreen onEnter={() => setShowLoading(false)} />;
  }

  const handleAddAnimal = (animal: Animal) => {
    setAnimalsList(prev => [...prev, animal]);
  };

  const handleUpdateAnimal = (updated: Animal) => {
    setAnimalsList(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleDeleteAnimal = (animalId: number) => {
    setAnimalsList(prev => prev.filter(a => a.id !== animalId));
  };

  const handleAddStaff = (newStaff: Staff) => {
    setStaffList(prev => [...prev, newStaff]);
  };

  const handleUpdateStaff = (updated: Staff) => {
    setStaffList(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleFireStaff = (staffId: number) => {
    setStaffList(prev => prev.filter(s => s.id !== staffId));
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "enclosures", label: "Enclosures", icon: "🏠" },
    { key: "staff", label: "Staff", icon: "👥" },
    { key: "visitors", label: "Visitors", icon: "🎫" },
    { key: "tickets", label: "Tickets", icon: "🎟️" },
    { key: "maintenance", label: "Maintenance", icon: "🔧" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-zoo-green sticky top-0 z-40 shadow-lg">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="font-bungee text-2xl md:text-3xl text-zoo-gold drop-shadow">
            🦁 Jungle Book
          </h1>
          <div className="flex gap-1 md:gap-2 flex-wrap justify-end">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-nunito font-bold text-xs md:text-sm px-2 md:px-4 py-2 rounded-lg transition-all ${
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

      <main className="container py-8">
        {activeTab === "enclosures" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bungee text-3xl text-foreground mb-1">🐾 Enclosures</h2>
                <p className="text-muted-foreground font-nunito">Click on an enclosure to see the animals inside!</p>
              </div>
              <AddAnimalForm onAdd={handleAddAnimal} existingAnimals={animalsList} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {enclosures.map((enc) => (
                <EnclosureCard key={enc.id} enclosure={enc} onClick={setSelectedEnclosure} animals={animalsList} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "staff" && (
          <div className="animate-fade-in">
            <StaffSection staffList={staffList} onAddStaff={handleAddStaff} onFireStaff={handleFireStaff} onUpdateStaff={handleUpdateStaff} />
          </div>
        )}

        {activeTab === "visitors" && <div className="animate-fade-in"><VisitorsTab /></div>}
        {activeTab === "tickets" && <div className="animate-fade-in"><TicketsTab /></div>}
        {activeTab === "maintenance" && <div className="animate-fade-in"><MaintenanceTab /></div>}
      </main>

      <AnimalModal
        enclosure={selectedEnclosure}
        open={!!selectedEnclosure}
        onClose={() => setSelectedEnclosure(null)}
        animals={animalsList}
        onUpdateAnimal={handleUpdateAnimal}
        onDeleteAnimal={handleDeleteAnimal}
      />

      <footer className="bg-zoo-green text-zoo-sand py-4 mt-8">
        <div className="container text-center font-nunito text-sm">
          <p className="font-bold">Jungle Book</p>
          <p className="text-zoo-sand/60 text-xs mt-1">
            Created by Shreya Elizabeth Joseph • Kamuel Shawn • Joel Jacob Roji • Darren Samuel D'cruz
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
