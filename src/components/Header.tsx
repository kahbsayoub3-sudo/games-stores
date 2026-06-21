import { useState } from 'react';
import { Sun, Moon, Search, X, HelpCircle, ShieldCheck, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenGuides: () => void;
}

export default function Header({
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  onOpenGuides
}: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 font-display font-black text-white shadow-lg shadow-cyan-500/20">
            A
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-pink-500 ring-2 ring-white dark:ring-neutral-950" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
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
                  animate={{ width: 220, opacity: 1 }}
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
                      placeholder="Search games, apps, mods..."
                      className="w-full rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-8 text-xs font-medium text-neutral-900 outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-cyan-500 dark:focus:bg-neutral-900/40"
                    />
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        id="clear-search"
                        className="absolute right-3 top-2.5 rounded-full p-0.5 hover:bg-gray-200 dark:hover:bg-neutral-700"
                        title="Clear search"
                      >
                        <X className="h-3 w-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-white" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              id="toggle-search-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200"
              title="Search store"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            id="themeToggle"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun id="sunIcon" className="h-4.5 w-4.5 text-yellow-500 animate-pulse" />
            ) : (
              <Moon id="moonIcon" className="h-4.5 w-4.5 text-indigo-600" />
            )}
          </button>

          {/* Installation Manual Drawer Button */}
          <button
            onClick={onOpenGuides}
            id="info-guides-btn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200"
            title="Setup guide & security checklist"
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
