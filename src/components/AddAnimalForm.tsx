import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Animal, Species, Enclosure, species as allSpecies, enclosures as allEnclosures, speciesEmojis } from "@/data/zooData";

// Extended emoji map for auto-assigning pictures based on animal/species name keywords
const animalEmojiMap: Record<string, string> = {
  lion: "🦁", tiger: "🐅", cheetah: "🐆", leopard: "🐆", jaguar: "🐆",
  elephant: "🐘", giraffe: "🦒", zebra: "🦓", hippo: "🦛", rhino: "🦏",
  bear: "🐻", panda: "🐼", koala: "🐨", monkey: "🐒", gorilla: "🦍",
  wolf: "🐺", fox: "🦊", deer: "🦌", horse: "🐴", cow: "🐄",
  pig: "🐷", sheep: "🐑", goat: "🐐", rabbit: "🐰", hamster: "🐹",
  mouse: "🐭", rat: "🐀", bat: "🦇", hedgehog: "🦔", otter: "🦦",
  beaver: "🦫", sloth: "🦥", kangaroo: "🦘", camel: "🐪",
  eagle: "🦅", owl: "🦉", parrot: "🦜", penguin: "🐧", flamingo: "🦩",
  swan: "🦢", peacock: "🦚", toucan: "🦜", duck: "🦆", chicken: "🐔",
  turkey: "🦃", dove: "🕊️", cassowary: "🦅",
  snake: "🐍", lizard: "🦎", crocodile: "🐊", alligator: "🐊",
  turtle: "🐢", tortoise: "🐢", frog: "🐸", salamander: "🦎",
  fish: "🐟", shark: "🦈", whale: "🐋", dolphin: "🐬", octopus: "🐙",
  jellyfish: "🪼", crab: "🦀", lobster: "🦞", shrimp: "🦐",
  butterfly: "🦋", bee: "🐝", ant: "🐜", spider: "🕷️", scorpion: "🦂",
  anaconda: "🐍", cobra: "🐍", python: "🐍",
  bald: "🦅", // for "Bald Eagle"
};

function getEmojiForAnimal(name: string, speciesName: string): string {
  const combined = `${name} ${speciesName}`.toLowerCase();
  for (const [key, emoji] of Object.entries(animalEmojiMap)) {
    if (combined.includes(key)) return emoji;
  }
  return "🐾";
}

interface AddAnimalFormProps {
  onAdd: (animal: Animal, speciesId: number) => void;
  existingAnimals: Animal[];
}

const AddAnimalForm = ({ onAdd, existingAnimals }: AddAnimalFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [speciesId, setSpeciesId] = useState(allSpecies[0].id);
  const [enclosureId, setEnclosureId] = useState(allEnclosures[0].id);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dateOfBirth.trim()) return;

    const maxId = Math.max(...existingAnimals.map(a => a.id), 200);
    const newAnimal: Animal = {
      id: maxId + 1,
      speciesId,
      enclosureId,
      name: name.trim(),
      gender,
      acquisitionDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).toUpperCase(),
      dateOfBirth: dateOfBirth.trim(),
    };

    onAdd(newAnimal, speciesId);
    setName("");
    setDateOfBirth("");
    setOpen(false);
  };

  const selectedSpecies = allSpecies.find(s => s.id === speciesId);
  const previewEmoji = getEmojiForAnimal(name, selectedSpecies?.commonName || "");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-nunito font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">
          ➕ Add Animal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-2 border-zoo-gold/50">
        <DialogHeader>
          <DialogTitle className="font-bungee text-xl text-foreground">Add New Animal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-nunito font-bold text-foreground">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Simba" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-nunito font-bold text-foreground">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-nunito font-bold text-foreground">Date of Birth</label>
              <Input value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} placeholder="DD-MMM-YY" required />
            </div>
          </div>

          <div>
            <label className="text-sm font-nunito font-bold text-foreground">Species</label>
            <select value={speciesId} onChange={e => setSpeciesId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
              {allSpecies.map(s => (
                <option key={s.id} value={s.id}>{speciesEmojis[s.id] || "🐾"} {s.commonName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-nunito font-bold text-foreground">Enclosure</label>
            <select value={enclosureId} onChange={e => setEnclosureId(Number(e.target.value))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-nunito">
              {allEnclosures.map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.type})</option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
            <span className="text-4xl animate-float">{previewEmoji}</span>
            <div>
              <p className="font-bungee text-foreground">{name || "New Animal"}</p>
              <p className="text-xs text-muted-foreground font-nunito italic">{selectedSpecies?.commonName} • AI-assigned icon</p>
            </div>
          </div>

          <Button type="submit" className="w-full font-nunito font-bold">
            🐾 Add to Zoo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { getEmojiForAnimal };
export default AddAnimalForm;
