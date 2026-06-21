import { useState, useEffect } from 'react';
import { Game, CATEGORY_ACCENT } from '../data';
import { Star, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSliderProps {
  games: Game[];
  onOpenGame: (game: Game) => void;
}

export default function HeroSlider({ games, onOpenGame }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take first 5 games as featured content 
  const sliderGames = games.slice(10, 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sliderGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderGames.length]);

  if (!sliderGames.length) return null;

  const currentGame = sliderGames[currentIndex];
  const accentColor = CATEGORY_ACCENT[currentGame.category] || '#00f3ff';

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % sliderGames.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + sliderGames.length) % sliderGames.length);
  };

  return (
    <div id="heroSlider" className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl my-6 aspect-[16/8] sm:aspect-[21/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0.85, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.85, scale: 0.98 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background image */}
          <img
            src={currentGame.thumbnail}
            alt={currentGame.title}
            className="h-full w-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />

          {/* Solid modern gradient overlays mimicking screenshot depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/10 to-transparent" />

          {/* Slide content container */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 flex flex-col justify-end h-full max-w-2xl select-none">
            {/* Category tag and special tag */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="text-xs font-black uppercase tracking-widest text-[#00f3ff]"
                style={{ color: accentColor }}
              >
                {currentGame.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-[10px] font-mono font-bold text-white/60 tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                June 2026 UPDATE
              </span>
            </div>

            {/* Heavy displaying Title */}
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
              {currentGame.title}
            </h2>

            {/* Controls panel */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenGame(currentGame)}
                id={`view-featured-${currentGame.id}`}
                className="rounded-full bg-white py-2.5 px-6 text-xs sm:text-sm font-black text-black tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5 cursor-pointer"
              >
                VIEW GAME
              </button>

              <div className="flex items-center gap-1 text-sm font-black text-white/80">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>★ {currentGame.rating}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide dots tracking */}
      <div className="absolute bottom-6 right-6 z-25 flex gap-2">
        {sliderGames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/45'
            }`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Manual Left/Right buttons for fine tuning layout */}
      <div className="absolute bottom-18 right-6 z-25 hidden sm:flex gap-1.5">
        <button
          onClick={handlePrev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/95 active:scale-90"
          title="Previous slide"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={handleNext}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/95 active:scale-90"
          title="Next slide"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}
