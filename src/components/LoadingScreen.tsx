import { useState } from "react";

const teamMembers = [
  { name: "Shreya Elizabeth Joseph", id: "2462364" },
  { name: "Kamuel Shawn", id: "2462345" },
  { name: "Joel Jacob Roji", id: "2462333" },
  { name: "Darren Samuel D'cruz", id: "2462323" },
];

interface LoadingScreenProps {
  onEnter: () => void;
}

const LoadingScreen = ({ onEnter }: LoadingScreenProps) => {
  const [revealedIndex, setRevealedIndex] = useState(-1);

  const handleClick = () => {
    if (revealedIndex < teamMembers.length - 1) {
      setRevealedIndex(prev => prev + 1);
    }
  };

  const allRevealed = revealedIndex >= teamMembers.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zoo-green cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="text-center mb-8">
        <h1 className="font-bungee text-5xl md:text-7xl text-zoo-gold mb-2 animate-float drop-shadow-lg">
          🦁 ZOO DBMS 🐅
        </h1>
        <p className="text-zoo-sand font-nunito text-lg md:text-xl font-semibold tracking-wide">
          Database Management System
        </p>
      </div>

      <div className="bg-zoo-brown/60 backdrop-blur-sm rounded-xl p-8 max-w-md w-full mx-4 border-2 border-zoo-gold/30">
        <h2 className="font-bungee text-zoo-gold text-center text-lg mb-6">
          Created By
        </h2>
        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`transition-all duration-500 ${
                index <= revealedIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-zoo-sand/90 rounded-lg px-4 py-3 flex items-center justify-between shadow-md">
                <span className="font-nunito font-bold text-zoo-brown text-sm md:text-base">
                  {member.name}
                </span>
                <span className="font-nunito text-zoo-green-light font-semibold text-xs md:text-sm bg-zoo-green/10 rounded px-2 py-0.5">
                  {member.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {revealedIndex < teamMembers.length - 1 && (
          <p className="text-zoo-sand/70 text-center text-sm mt-6 animate-pulse font-nunito">
            👆 Click to reveal team members
          </p>
        )}
      </div>

      {allRevealed && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEnter();
          }}
          className="mt-8 font-bungee text-xl px-10 py-4 bg-zoo-gold text-zoo-brown rounded-xl shadow-lg hover:scale-105 transition-transform animate-bounce-in animate-pulse-glow"
        >
          Enter Zoo 🐾
        </button>
      )}
    </div>
  );
};

export default LoadingScreen;
