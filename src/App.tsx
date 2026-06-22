import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import GuidesDrawer from './components/GuidesDrawer';
import GameDetailsModal from './components/GameDetailsModal';
import LiveChatAndActivity from './components/LiveChatAndActivity';
import { GAMES_DATA, CATEGORY_ACCENT, Game, TRANSLATIONS } from './data';
import { SlidersHorizontal, Grid, List, Star, ArrowUp, Zap, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Theme Management - Force Dark Mode
  const theme = 'dark';

  // Apply dark mode class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }, []);

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

  const t = TRANSLATIONS['en'];

  return (
    <div 
      className="min-h-screen bg-[#09090b] text-neutral-100 transition-colors duration-300 font-sans antialiased pb-20 selection:bg-cyan-500 selection:text-neutral-950"
      dir="ltr"
    >
      
      {/* Dynamic Header */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onOpenGuides={() => setIsGuidesOpen(true)}
      />

      {/* Main Container Stage */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Statistics Grid Board mimicking original screenshot banner exactly */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900/65 rounded-2xl overflow-hidden border border-neutral-850 mb-6 shadow-sm select-none">
          <div className="bg-[#0c0c0b] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-cyan-500">{t.games_available_num}</span>
            <span className="block text-xs font-mono font-bold text-neutral-500 mt-0.5">{t.games_available_label}</span>
          </div>
          <div className="bg-[#0c0c0b] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-purple-500">{t.categories_num}</span>
            <span className="block text-xs font-mono font-bold text-neutral-500 mt-0.5">{t.categories_label}</span>
          </div>
          <div className="bg-[#0c0c0b] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-emerald-500">{t.rating_num}</span>
            <span className="block text-xs font-mono font-bold text-neutral-500 mt-0.5">{t.rating_label}</span>
          </div>
          <div className="bg-[#0c0c0b] py-4 px-6 text-center transition-colors">
            <span className="block font-display text-xl font-black text-rose-500">{t.mods_num}</span>
            <span className="block text-xs font-mono font-bold text-neutral-500 mt-0.5">{t.mods_label}</span>
          </div>
        </section>

        {/* Featured Slider Showcase */}
        <HeroSlider games={GAMES_DATA} onOpenGame={(g) => setSelectedGame(g)} />

        {/* Categories Scroller Bar & List-to-Grid Utility Options */}
        <section className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-neutral-900 pb-5">
          {/* Custom Horizontal Scroll Category Track Wrapper */}
          <div className="w-full md:w-auto relative overflow-hidden flex items-center">
            {/* shadow overlay hint */}
            <div className="absolute right-0 top-0 bottom-0 w-8 from-neutral-950 to-transparent pointer-events-none z-10 block sm:hidden" />
            
            <div className="flex gap-2 overflow-x-auto scrollbar-none no-scrollbar pr-6 max-w-full pb-1 select-none py-1">
              {categoriesList.map(cat => {
                const isActive = currentCategory === cat;
                const displayCategory = cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat);
                      scrollToTop();
                    }}
                    className={`shrink-0 rounded-full px-4.5 py-1.5 text-xs font-black tracking-wide transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/10 scale-105'
                        : 'bg-neutral-900 border border-neutral-850 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {displayCategory}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorters, View Toggle Buttons */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 select-none">
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
                className="bg-neutral-900 border border-neutral-850 text-neutral-200 rounded-xl px-2.5 py-1.5 text-xs outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="default">{t.sort_by}: {t.sort_default}</option>
                <option value="rating">{t.sort_by}: {t.sort_rating}</option>
                <option value="az">{t.sort_by}: {t.sort_az}</option>
                <option value="za">{t.sort_by}: {t.sort_za}</option>
              </select>
            </div>

            {/* List vs Grid Layout Selection Pill */}
            <div className="flex items-center p-0.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <button
                id="listViewBtn"
                onClick={() => setCurrentView('list')}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  currentView === 'list'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
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
                    : 'text-neutral-400 hover:text-white'
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
              <h3 className="text-xs font-black tracking-widest text-neutral-500 uppercase font-mono">
                {t.items_found} {processedGames.length}
              </h3>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-cyan-500 font-bold hover:underline"
                >
                  {t.clear_filter} &quot;{searchQuery}&quot;
                </button>
              )}
            </div>

            {!processedGames.length ? (
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#0c0c0b]/20 py-18 text-center text-neutral-500">
                <HelpCircle className="h-10 w-10 text-neutral-500 mx-auto animate-bounce mb-3" />
                <h4 className="font-display font-black text-lg text-neutral-200">{t.no_results}</h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto px-4">
                  {t.no_results_desc}
                </p>
              </div>
            ) : currentView === 'list' ? (
              /* Custom LIST VIEW with items inside screen */
              <div id="gameGrid" className="space-y-3.5 text-left">
                {processedGames.map(game => {
                  const accent = CATEGORY_ACCENT[game.category] || '#00f3ff';
                  const displayTitle = game.title;
                  const displayCategory = game.category;
                  return (
                    <motion.article
                      layoutId={`game-card-${game.id}`}
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer rounded-2xl border border-neutral-900 bg-[#0c0c0b] p-3.5 flex items-center justify-between gap-4 transition-all duration-300 hover:border-neutral-800 hover:bg-[#0d0d10] hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Thumbnail Wrap */}
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-800/85 bg-[#0d0d0c]">
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
                        <div className="min-w-0 text-left">
                          <span 
                            className="text-[10px] font-black uppercase tracking-wider font-display block text-left"
                            style={{ color: accent }}
                          >
                            {displayCategory}
                          </span>
                          <h4 className="text-sm font-black text-white group-hover:text-cyan-500 transition-colors truncate mt-0.5 text-left">
                            {displayTitle}
                          </h4>
                          
                          {/* Badges tag row */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-bold">
                              <span>★</span>
                              <span>{game.rating}</span>
                            </div>
                            <span>•</span>
                            {game.isNew ? (
                              <span className="text-[9px] font-semibold tracking-wider text-cyan-400 bg-cyan-400/5 px-1.5 rounded">
                                {t.new_badge}
                              </span>
                            ) : (
                              <span className="text-[9px] font-medium text-neutral-500">
                                {t.verified_badge}
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
                        className="rounded-full bg-cyan-500/10 hover:bg-cyan-500 py-1.5 px-4.5 text-xs font-black uppercase text-cyan-500 hover:text-black tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 animate-pulse hover:animate-none"
                      >
                        {t.get_button}
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
                  const displayTitle = game.title;
                  const displayCategory = game.category;
                  return (
                    <motion.article
                      layoutId={`game-card-grid-${game.id}`}
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer rounded-2xl border border-neutral-900 bg-[#0c0c0b] overflow-hidden transition-all duration-300 hover:border-neutral-850 hover:shadow-lg hover:scale-[1.01]"
                    >
                      {/* Image Frame height */}
                      <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold text-[#f3ba0b] font-mono">
                          <span>★</span>
                          <span className="text-white font-black">{game.rating}</span>
                        </div>
                        {game.isNew && (
                          <div className="absolute right-2 top-2 rounded bg-cyan-500 px-1.5 py-0.5 text-[8px] font-black uppercase text-black tracking-widest">
                            {t.new_badge}
                          </div>
                        )}
                      </div>

                      {/* Info card */}
                      <div className="p-3.5 flex flex-col justify-between h-28">
                        <div className="min-w-0 text-left">
                          <span 
                            className="text-[9.5px] font-black uppercase tracking-wider font-display block text-left"
                            style={{ color: accent }}
                          >
                            {displayCategory}
                          </span>
                          <h4 className="text-xs font-black text-white group-hover:text-cyan-500 transition-colors truncate mt-1 text-left">
                            {displayTitle}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between border-t border-neutral-850 pt-2.5 mt-2">
                          <span className="text-[9px] text-neutral-500 font-mono">Mod Unlocked</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGame(game);
                            }}
                            id={`dl-grid-btn-${game.id}`}
                            className="text-[10px] font-black text-cyan-500 group-hover:underline uppercase tracking-widest"
                          >
                            {t.get_button}
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
            <div className="rounded-2xl border border-neutral-900 bg-[#0c0c0b] p-5 shadow-sm relative overflow-hidden select-none text-left">
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 bg-cyan-500/5 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4.5 w-4.5 text-cyan-500" />
                <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  Installer FAQs
                </h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4 text-left">
                Curated guidelines and sandbox definitions for absolute package safety. Keep updated and enjoy unlocked attributes.
              </p>
              <button 
                onClick={() => setIsGuidesOpen(true)}
                id="view-manual-link"
                className="w-full text-center text-[11px] font-black text-black bg-[#f3ba0b] hover:bg-amber-400 py-2.5 rounded-xl transition-all cursor-pointer hover:shadow-md uppercase"
              >
                OPEN INSTALLATION GUIDE
              </button>
            </div>
          </aside>
        </section>

      </main>

      {/* Styled Footer */}
      <footer className="mt-20 border-t border-neutral-900 bg-neutral-950/40 py-12 backdrop-blur-md select-none">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-mono tracking-wider text-neutral-450 uppercase">
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
            title="Scroll to top"
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
