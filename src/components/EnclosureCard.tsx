import { Animal, Enclosure, getSpeciesById, speciesEmojis } from "@/data/zooData";

interface EnclosureCardProps {
  enclosure: Enclosure;
  onClick: (enclosure: Enclosure) => void;
  animals: Animal[];
}

const typeGradients: Record<string, string> = {
  "Open": "from-zoo-green to-zoo-green-light",
  "Semi-Aquatic": "from-zoo-sky to-secondary",
  "Closed": "from-accent to-zoo-brown",
};

const EnclosureCard = ({ enclosure, onClick, animals }: EnclosureCardProps) => {
  const encAnimals = animals.filter(a => a.enclosureId === enclosure.id);
  const animalSpecies = encAnimals.map(a => getSpeciesById(a.speciesId));
  const emoji = animalSpecies[0] ? speciesEmojis[animalSpecies[0].id] || "🐾" : "🐾";

  return (
    <button
      onClick={() => onClick(enclosure)}
      className={`group relative w-full rounded-xl overflow-hidden border-2 border-zoo-gold/40 shadow-lg 
        hover:shadow-xl hover:scale-[1.03] hover:border-zoo-gold transition-all duration-300 cursor-pointer text-left`}
    >
      <div className={`bg-gradient-to-br ${typeGradients[enclosure.type] || "from-muted to-card"} h-36 md:h-44 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-around">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-6 bg-zoo-sand/40 rounded-t-sm" />
          ))}
        </div>
        <div className="absolute bottom-5 left-0 right-0 h-0.5 bg-zoo-sand/30" />
        <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-zoo-sand/30" />
        <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-float">
          {emoji}
        </span>
      </div>

      <div className="bg-card p-3 md:p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-nunito font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
            {enclosure.type}
          </span>
          <span className="text-xs font-nunito text-muted-foreground">
            {enclosure.location}
          </span>
        </div>
        <h3 className="font-bungee text-sm md:text-base text-foreground">
          {enclosure.name}
        </h3>
        <p className="text-xs text-muted-foreground font-nunito mt-1">
          {encAnimals.length} animal{encAnimals.length !== 1 ? "s" : ""} • {enclosure.areaSqm} sqm
        </p>
      </div>
    </button>
  );
};

export default EnclosureCard;
