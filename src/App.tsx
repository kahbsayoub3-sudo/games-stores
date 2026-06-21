import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import GuidesDrawer from './components/GuidesDrawer';
import GameDetailsModal from './components/GameDetailsModal';
import LiveChatAndActivity from './components/LiveChatAndActivity';
import { GAMES_DATA, CATEGORY_ACCENT, Game } from './data';
import { SlidersHorizontal, Grid, List, Star, ArrowUp, Zap, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Dark as default based on game store vibe
    }
    return 'dark';
  });

  // Apply class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Main interactive states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentSort, setCurrentSort] = useState<'default' | 'rating' | 'az' | 'za'>('default');
  const [currentView, setCurrentView] = useState<'list' | 'grid'>('list');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Guide sidebar drawer state
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);

  // Back to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter categories
  const categoriesList = ['All', ...Array.from(new Set(GAMES_DATA.map(g => g.category))).sort()];

  // Process sorting & filtering
  const getFilteredAndSortedGames = () => {
    let result = GAMES_DATA.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            g.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = currentCategory === 'All' || g.category === currentCategory;
      return matchesSearch && matchesCategory;
    });

    // Handle sort states
    if (currentSort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentSort === 'za') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  };

  const processedGames = getFilteredAndSortedGames();

  // Scroll to top execution
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300 font-sans antialiased pb-20 selection:bg-cyan-500 selection:text-neutral-950">
      
      {/* Dynamic Header */}
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onOpenGuides={() => setIsGuidesOpen(true)}
      />

      {/* Main Container Stage */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Statistics Grid Board mimicking original screenshot banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200/60 rounded-2xl overflow-hidden border border-gray-200/50 dark:bg-neutral-800/60 dark:border-neutral-800/80 mb-6 shadow-sm select-none">
          <div className="bg-white dark:bg-[#0c0c0e] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-cyan-500">200+</span>
            <span className="block text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Games Available</span>
          </div>
          <div className="bg-white dark:bg-[#0c0c0e] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-purple-500">12+</span>
            <span className="block text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Categories</span>
          </div>
          <div className="bg-white dark:bg-[#0c0c0e] py-4 px-6 text-center transition-colors">
            <div className="flex items-center justify-center gap-1 font-display text-xl font-black text-emerald-500">
              <span>4.7</span>
              <span className="text-sm">★</span>
            </div>
            <span className="block text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Avg User Rating</span>
          </div>
          <div className="bg-white dark:bg-[#0c0c0e] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-[#ff00bb] dark:text-[#ff00bb]/90">Free</span>
            <span className="block text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Sideload Mods</span>
          </div>
        </section>

        {/* Featured Slider Showcase */}
        <HeroSlider games={GAMES_DATA} onOpenGame={(g) => setSelectedGame(g)} />

        {/* Categories Scroller Bar & List-to-Grid Utility Options */}
        <section className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-gray-100 dark:border-neutral-800/80 pb-5">
          {/* Custom Horizontal Scroll Category Track Wrapper */}
          <div className="w-full md:w-auto relative overflow-hidden flex items-center">
            {/* Scribing shadow overlay hint */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fafafa] to-transparent dark:from-neutral-950 pointer-events-none z-10 block sm:hidden" />
            
            <div className="flex gap-2 overflow-x-auto scrollbar-none pr-6 max-w-full pb-1 select-none py-1">
              {categoriesList.map(cat => {
                const isActive = currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat);
                      scrollToTop();
                    }}
                    className={`shrink-0 rounded-full px-4.5 py-1.5 text-xs font-black lowercase tracking-wide transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/10 scale-105'
                        : 'bg-white border border-gray-100 hover:bg-gray-50 text-neutral-500 hover:text-neutral-950 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorters, View Toggle Buttons */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3.5 select-none">
            {/* Sort Dropdown Selector */}
            <div className="flex items-center gap-1.5 relative">
              <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
              <select
                value={currentSort}
                id="sortSelect"
                onChange={(e) => {
                  setCurrentSort(e.target.value as any);
                  scrollToTop();
                }}
                className="bg-white border border-gray-200 text-neutral-700 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 rounded-xl px-2.5 py-1.5 text-xs outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="default">Sort: Default Featured</option>
                <option value="rating">Sort: Best Rating (★)</option>
                <option value="az">Sort: Alphabetical (A-Z)</option>
                <option value="za">Sort: Alphabetical (Z-A)</option>
              </select>
            </div>

            {/* List vs Grid Layout Selection Pill */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-xl dark:bg-neutral-900 border border-gray-200/50 dark:border-neutral-800">
              <button
                id="listViewBtn"
                onClick={() => setCurrentView('list')}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  currentView === 'list'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="List layout view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                id="gridViewBtn"
                onClick={() => setCurrentView('grid')}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  currentView === 'grid'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Grid layout view"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Double-Panel Grid Content Area (Primary Catalog + Shoutbox Sidebar) */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Game Cards Main Frame */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xs font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase font-mono">
                Items Found: {processedGames.length}
              </h3>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-cyan-500 font-bold hover:underline"
                >
                  Clear filter for: &quot;{searchQuery}&quot;
                </button>
              )}
            </div>

            {!processedGames.length ? (
              <div className="rounded-2xl border border-dashed border-gray-200/50 bg-white/50 py-18 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/10">
                <HelpCircle className="h-10 w-10 text-neutral-400 mx-auto animate-bounce mb-3" />
                <h4 className="font-display font-black text-lg text-neutral-800 dark:text-neutral-200">No results match your lookup</h4>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-sm mx-auto px-4">
                  Consider checking your spelling, selecting another category, or trying general names like &quot;Mod&quot;, &quot;Mobile&quot;, or &quot;Pro&quot;.
                </p>
              </div>
            ) : currentView === 'list' ? (
              /* Custom LIST VIEW with items inside screen */
              <div id="gameGrid" className="space-y-3.5">
                {processedGames.map(game => {
                  const accent = CATEGORY_ACCENT[game.category] || '#00f3ff';
                  return (
                    <motion.article
                      layoutId={`game-card-${game.id}`}
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-3.5 flex items-center justify-between gap-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/80 dark:border-neutral-900 dark:bg-[#0c0c0e] dark:hover:bg-[#0f0f12] dark:hover:border-neutral-800 hover:shadow-lg shadow-neutral-100/50"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Thumbnail Wrap */}
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-neutral-800/80">
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Text and stats */}
                        <div className="min-w-0">
                          <span 
                            className="text-[10px] font-black uppercase tracking-wider font-display block"
                            style={{ color: accent }}
                          >
                            {game.category}
                          </span>
                          <h4 className="text-sm font-black text-neutral-900 group-hover:text-cyan-500 dark:text-white transition-colors truncate pr-2 mt-0.5">
                            {game.title}
                          </h4>
                          
                          {/* Badges tag row */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-bold">
                              <span>★</span>
                              <span>{game.rating}</span>
                            </div>
                            <span>•</span>
                            {game.isNew ? (
                              <span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/5 px-1.5 rounded">
                                New Mod
                              </span>
                            ) : (
                              <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-500">
                                Verified Secure Build
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Explicit GET button matching target layout */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGame(game);
                        }}
                        id={`dl-list-btn-${game.id}`}
                        className="rounded-full bg-cyan-500/[0.08] hover:bg-cyan-500 py-1.5 px-4 text-xs font-black uppercase text-cyan-500 hover:text-neutral-950 tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                      >
                        GET
                      </button>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              /* Bento GRID VIEW representation */
              <div id="gameGrid" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {processedGames.map(game => {
                  const accent = CATEGORY_ACCENT[game.category] || '#00f3ff';
                  return (
                    <motion.article
                      layoutId={`game-card-grid-${game.id}`}
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:border-cyan-500/40 dark:border-neutral-900 dark:bg-[#0c0c0e] hover:shadow-lg hover:scale-[1.01]"
                    >
                      {/* Image Frame height */}
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-yellow-400 font-mono">
                          <span>★</span>
                          <span className="text-white font-black">{game.rating}</span>
                        </div>
                        {game.isNew && (
                          <div className="absolute right-2 top-2 rounded bg-cyan-500 px-1.5 py-0.5 text-[8px] font-black uppercase text-black tracking-widest">
                            New
                          </div>
                        )}
                      </div>

                      {/* Info card */}
                      <div className="p-3.5 flex flex-col justify-between h-28">
                        <div className="min-w-0">
                          <span 
                            className="text-[9.5px] font-black uppercase tracking-wider font-display"
                            style={{ color: accent }}
                          >
                            {game.category}
                          </span>
                          <h4 className="text-xs font-black text-neutral-900 group-hover:text-cyan-500 dark:text-white transition-colors truncate mt-1">
                            {game.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-800/60 pt-2.5 mt-2">
                          <span className="text-[10px] text-neutral-400 font-mono">Mod Unlocked</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGame(game);
                            }}
                            id={`dl-grid-btn-${game.id}`}
                            className="text-[10px] font-black text-cyan-500 group-hover:underline uppercase tracking-widest"
                          >
                            Get Mod
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right / Live Shoutbox Activity Section */}
          <aside className="lg:col-span-4 space-y-6">
            <LiveChatAndActivity />

            {/* General FAQs Widget Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm relative overflow-hidden select-none">
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 bg-cyan-500/5 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4.5 w-4.5 text-cyan-500" />
                <h4 className="font-display font-black text-sm text-neutral-900 dark:text-white uppercase tracking-wider">Installer FAQs</h4>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                Curated guidelines and sandbox definitions for absolute package safety. Keep updated and enjoy unlocked attributes.
              </p>
              <button 
                onClick={() => setIsGuidesOpen(true)}
                id="view-manual-link"
                className="w-full text-center text-[11px] font-black text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 py-2 rounded-xl transition-all cursor-pointer hover:shadow-md"
              >
                OPEN INSTALLATION GUIDE
              </button>
            </div>
          </aside>
        </section>

      </main>

      {/* Styled Footer */}
      <footer className="mt-20 border-t border-gray-100 bg-white/50 py-12 dark:border-neutral-900 dark:bg-neutral-950/40 backdrop-blur-md select-none">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
            © 2026 apk25.store • ALL MOD ARCHIVES FREE FOR PLAY TESTING.
          </p>
          <p className="mx-auto mt-2 max-w-md text-[10px] text-neutral-500 leading-normal">
            This workspace provides compiled applications and custom modifiers as a simulated demonstrator sandbox. All trademarks, game brand files, and graphic illustrations belong strictly to their actual publishers.
          </p>
        </div>
      </footer>

      {/* Custom Back To Top Action */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            id="backToTop"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 cursor-pointer hover:bg-cyan-400"
            title="Scroll to top of the catalog"
          >
            <ArrowUp className="h-5 w-5 text-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Collapsible installation help guidelines drawer sliding sheet */}
      <GuidesDrawer isOpen={isGuidesOpen} onClose={() => setIsGuidesOpen(false)} />

      {/* Pop-up detail screen modal triggers */}
      <AnimatePresence>
        {selectedGame && (
          <GameDetailsModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
