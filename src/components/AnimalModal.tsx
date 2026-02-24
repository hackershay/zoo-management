import { Animal, Enclosure, getSpeciesById, getMedicalRecordByAnimal, speciesEmojis } from "@/data/zooData";
import { getEmojiForAnimal } from "@/components/AddAnimalForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AnimalModalProps {
  enclosure: Enclosure | null;
  open: boolean;
  onClose: () => void;
  animals: Animal[];
}

const statusColors: Record<string, string> = {
  "Healthy": "bg-secondary text-secondary-foreground",
  "Recovering": "bg-primary text-primary-foreground",
  "Stable": "bg-accent text-accent-foreground",
};

const AnimalModal = ({ enclosure, open, onClose, animals }: AnimalModalProps) => {
  if (!enclosure) return null;

  const encAnimals = animals.filter(a => a.enclosureId === enclosure.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-2 border-zoo-gold/50 rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-bungee text-xl text-foreground flex items-center gap-2">
            {enclosure.name}
            <span className="text-xs font-nunito font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">
              {enclosure.type}
            </span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-nunito">
            📍 {enclosure.location} • {enclosure.areaSqm} sqm
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {encAnimals.map((animal) => {
            const sp = getSpeciesById(animal.speciesId);
            const med = getMedicalRecordByAnimal(animal.id);
            const emoji = sp
              ? speciesEmojis[sp.id] || getEmojiForAnimal(animal.name, sp.commonName)
              : getEmojiForAnimal(animal.name, "");

            return (
              <div key={animal.id} className="bg-background rounded-lg p-4 border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-5xl animate-float">{emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bungee text-lg text-foreground">{animal.name}</h3>
                    {sp && (
                      <p className="text-sm text-muted-foreground font-nunito italic">
                        {sp.commonName} ({sp.scientificName})
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs font-nunito">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-semibold text-foreground">{animal.gender}</span>
                      <span className="text-muted-foreground">Born:</span>
                      <span className="font-semibold text-foreground">{animal.dateOfBirth}</span>
                      <span className="text-muted-foreground">Acquired:</span>
                      <span className="font-semibold text-foreground">{animal.acquisitionDate}</span>
                      {sp && (
                        <>
                          <span className="text-muted-foreground">Diet:</span>
                          <span className="font-semibold text-foreground">{sp.dietType}</span>
                          <span className="text-muted-foreground">Habitat:</span>
                          <span className="font-semibold text-foreground">{sp.habitatType}</span>
                          <span className="text-muted-foreground">Conservation:</span>
                          <span className="font-semibold text-foreground">{sp.conservationStatus}</span>
                        </>
                      )}
                    </div>
                    {med && (
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[med.healthStatus] || "bg-muted text-muted-foreground"}`}>
                          {med.healthStatus}
                        </span>
                        <span className="text-xs text-muted-foreground font-nunito">
                          Last: {med.treatment}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalModal;
