"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Nation = "air" | "water" | "earth" | "fire";

interface ATLAQuoteData {
  text: string;
  speaker: string;
  nation: Nation;
}

const quotes: ATLAQuoteData[] = [
  {
    text: "Even the greatest airbenders started by moving a leaf.",
    speaker: "Monk Gyatso",
    nation: "air",
  },
  {
    text: "It is easy to do nothing, it is hard to forgive.",
    speaker: "Aang",
    nation: "air",
  },
  {
    text: "When we hit our lowest point, we are open to the greatest change.",
    speaker: "Aang",
    nation: "air",
  },
  { text: "The past can be a great teacher.", speaker: "Aang", nation: "air" },
  {
    text: "Anyone's capable of great good and great evil. Everyone, even the Fire Lord and the Fire Nation, have to be treated like they're worth giving a chance.",
    speaker: "Aang",
    nation: "air",
  },
  {
    text: "Selfless duty calls you to sacrifice your own spiritual needs and do whatever it takes to protect the world.",
    speaker: "Avatar Yangchen",
    nation: "air",
  },
  {
    text: "Sometimes the best way to solve your own problems is to help someone else.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Life happens wherever you are, whether you make it or not.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Pride is not the opposite of shame, but its source. True humility is the only antidote to shame.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "In the darkest times, hope is something you give yourself. That is the meaning of inner strength.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Destiny is a funny thing. You never know how things are going to work out.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "While it is always best to believe in oneself, a little help from others can be a great blessing.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Failure is only the opportunity to begin again, only this time, more wisely.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "It is important to draw wisdom from different places. If you take it from only one place it becomes rigid and stale.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Good times become good memories, but bad times make good lessons.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "You must never give into despair. Allow yourself to slip down that road and you surrender to your lowest instincts.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "I was never angry with you. I was sad, because I was afraid you had lost your way.",
    speaker: "Uncle Iroh",
    nation: "fire",
  },
  {
    text: "Some friendships are so strong, they can even transcend lifetimes.",
    speaker: "Avatar Roku",
    nation: "fire",
  },
  {
    text: "I have changed. And I am not going back to the person I used to be.",
    speaker: "Zuko",
    nation: "fire",
  },
  {
    text: "I will never, ever turn my back on people who need me!",
    speaker: "Katara",
    nation: "water",
  },
  {
    text: "The strength of your heart makes you who you are.",
    speaker: "Katara",
    nation: "water",
  },
  {
    text: "I'm just a guy with a boomerang. I didn't ask for all this flying and magic.",
    speaker: "Sokka",
    nation: "water",
  },
  {
    text: "My first girlfriend turned into the moon.",
    speaker: "Sokka",
    nation: "water",
  },
  {
    text: "Drink cactus juice! It'll quench ya! Nothing's quenchier! It's the quenchiest!",
    speaker: "Sokka",
    nation: "water",
  },
  { text: "You can't knock me down!", speaker: "Katara", nation: "water" },
  {
    text: "I am the greatest earthbender in the world! Don't you two dunderheads ever forget it!",
    speaker: "Toph",
    nation: "earth",
  },
  {
    text: "You've got to be willing to look foolish if you want to become a master.",
    speaker: "Toph",
    nation: "earth",
  },
  {
    text: "There are no different angles, no clever solutions, no trickety trick that's gonna move that rock. You've got to face it head-on.",
    speaker: "Toph",
    nation: "earth",
  },
  {
    text: "You must learn to wait. Listen to the earth, wait for the right moment, and then strike!",
    speaker: "King Bumi",
    nation: "earth",
  },
  {
    text: "Only justice will bring peace.",
    speaker: "Avatar Kyoshi",
    nation: "earth",
  },
  {
    text: "True earthbending is about listening to the earth.",
    speaker: "Toph",
    nation: "earth",
  },
];

const getNationBorderClass = (nation: Nation) => {
  switch (nation) {
    case "air":
      return "border-yellow-500 shadow-[-1px_0_10px_-2px_rgba(234,179,8,0.5)]";
    case "water":
      return "border-blue-500 shadow-[-1px_0_10px_-2px_rgba(59,130,246,0.5)]";
    case "earth":
      return "border-emerald-500 shadow-[-1px_0_10px_-2px_rgba(16,185,129,0.5)]";
    case "fire":
      return "border-amber-600 shadow-[-1px_0_10px_-2px_rgba(245,158,11,0.5)]";
    default:
      return "border-foreground/20";
  }
};

const INTERVAL = 9000; // ms per quote

export function ATLAQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Pick a random quote on mount to avoid always starting with the same one
    setIndex(Math.floor(Math.random() * quotes.length));

    const timer = setInterval(() => {
      setIndex(Math.floor(Math.random() * quotes.length));
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const quote = quotes[index];

  return (
    <div className="w-full max-w-2xl mb-12 flex flex-col items-center px-4 min-h-[5rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-xl text-left p-4 border-l-2 rounded-xl flex flex-col items-start transition-all duration-300 ${
            quote.speaker.includes("Iroh")
              ? "border-[var(--color-fire-accent)] bg-amber-900/10 dark:bg-amber-950/20 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
              : getNationBorderClass(quote.nation)
          }`}
        >
          <p
            className={`text-[15px] sm:text-[17px] font-medium italic leading-relaxed tracking-wide drop-shadow-md ${quote.speaker.includes("Iroh") ? "text-amber-800 dark:text-amber-200" : "text-foreground/80"}`}
          >
            &ldquo;{quote.text}&rdquo;
          </p>
          <p
            className={`mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2 ${quote.speaker.includes("Iroh") ? "text-amber-700/70 dark:text-amber-400/70" : "text-foreground/50"}`}
          >
            <span
              className={`w-4 h-px block ${quote.speaker.includes("Iroh") ? "bg-amber-700/50 dark:bg-amber-400/50" : "bg-foreground/30"}`}
            />{" "}
            {quote.speaker}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
