import { useState } from 'react';
import { Search, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../data';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenGuides: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenGuides
}: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const t = TRANSLATIONS['en'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-neutral-950/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 font-display font-black text-white shadow-lg shadow-cyan-500/20">
            A
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#f3ba0b] ring-2 ring-neutral-950" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            apk25<span className="text-cyan-500 font-semibold">.store</span>
          </span>
        </div>

        {/* Global Instant Actions */}
        <div className="flex items-center gap-3">
          {/* Animated Search Bar Toggle */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {(isSearchExpanded || searchQuery) && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 170, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="mr-2"
                >
                  <div className="relative">
                    <input
                      type="text"
                      id="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.search_placeholder}
                      className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-1.5 pl-8 pr-8 text-xs font-medium text-white outline-none focus:border-cyan-500 focus:bg-neutral-900/60"
                    />
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        id="clear-search"
                        className="absolute right-3 top-2.5 rounded-full p-0.5 hover:bg-neutral-850"
                        title="Clear search"
                      >
                        <X className="h-3 w-3 text-neutral-400 hover:text-white" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              id="toggle-search-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-colors duration-200"
              title="Search store"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Installation Manual Drawer Button */}
          <button
            onClick={onOpenGuides}
            id="info-guides-btn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-colors duration-200"
            title={t.setup_guide}
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
