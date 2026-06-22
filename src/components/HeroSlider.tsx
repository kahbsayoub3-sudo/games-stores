import { useState, useEffect } from 'react';
import { Game, CATEGORY_ACCENT, TRANSLATIONS } from '../data';
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

  const t = TRANSLATIONS['en'];
  const displayTitle = currentGame.title;
  const displayCategory = currentGame.category;

  return (
    <div id="heroSlider" className="relative w-full overflow-hidden rounded-[32px] bg-black shadow-2xl my-6 aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0.85, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.85, scale: 0.99 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background image */}
          <img
            src={currentGame.thumbnail}
            alt={currentGame.title}
            className="h-full w-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />

          {/* Solid overlays mimicking screenshot depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          {/* Slide content container */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end h-full select-none">
            {/* Category tag */}
            <div className="mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#10b981]">
                {displayCategory}
              </span>
            </div>

            {/* Heavy displaying Title */}
            <h2 className="font-sans text-[22px] sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-sm text-left max-w-xl">
              {displayTitle}
            </h2>

            {/* Controls panel perfectly aligned like screenshot */}
            <div className="mt-5 flex items-center gap-3.5 flex-wrap">
              <button
                onClick={() => onOpenGame(currentGame)}
                id={`view-featured-${currentGame.id}`}
                className="rounded-full bg-white hover:bg-neutral-100 text-neutral-950 py-2.5 px-6 text-[11px] sm:text-xs font-black tracking-widest uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
              >
                VIEW GAME
              </button>

              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-white/80 py-1 select-none">
                <span className="text-white/40">★</span>
                <span>{currentGame.rating}</span>
              </div>

              {/* Slide dots tracking aligned directly in same row */}
              <div className="flex items-center gap-1.5 ml-2 min-w-[70px] sm:min-w-[90px] max-w-[120px] sm:max-w-none flex-1">
                {sliderGames.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className="h-1 rounded-full transition-all duration-300 flex-1 cursor-pointer"
                    style={{
                      backgroundColor: idx === currentIndex ? '#00f3ff' : 'rgba(255, 255, 255, 0.25)',
                      height: idx === currentIndex ? '4px' : '2px',
                    }}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
