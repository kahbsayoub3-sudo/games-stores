import { useState, useEffect, FormEvent } from 'react';
import { Game, CATEGORY_ACCENT, GAME_DESCRIPTIONS, NAMES, MESSAGES } from '../data';
import { X, Star, Smartphone, Laptop, Check, Info, ShieldCheck, Download, Sparkles, MessageSquare, Play, RefreshCw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
}

interface LocalReview {
  id: string;
  author: string;
  rating: number;
  message: string;
  device: string;
  timestamp: string;
}

export default function GameDetailsModal({ game, onClose }: GameDetailsModalProps) {
  if (!game) return null;

  // Selected download target device
  const [selectedDevice, setSelectedDevice] = useState<'Android' | 'iOS' | 'PC' | 'macOS'>('Android');

  // Simulated download process state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStep, setDownloadStep] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadDone, setIsDownloadDone] = useState(false);

  // Reviews list starting with original static comments plus any user added
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [newCommentName, setNewCommentName] = useState('');

  // Auto-generate some initial reviews when game loads
  useEffect(() => {
    const fallbackReviews: LocalReview[] = [];
    // Combine names and messages into a couple of reviews
    for (let i = 0; i < 4; i++) {
      const author = NAMES[(i * 3 + parseInt(game.id) || 4) % NAMES.length];
      const message = MESSAGES[(i * 2 + parseInt(game.id) || 1) % MESSAGES.length];
      const devices = ['Android APK', 'iOS Premium', 'PC Mod', 'Android Mod'];
      const deviceUsed = devices[(i + parseInt(game.id)) % devices.length];
      fallbackReviews.push({
        id: `fallback-${i}`,
        author,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        message,
        device: deviceUsed,
        timestamp: `${i + 1}h ago`
      });
    }
    setReviews(fallbackReviews);

    // Initial resets
    setIsDownloading(false);
    setDownloadStep(0);
    setDownloadProgress(0);
    setIsDownloadDone(false);
  }, [game]);

  // Handler to progress download steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDownloading) {
      if (downloadProgress < 100) {
        timer = setTimeout(() => {
          setDownloadProgress(prev => {
            const increment = Math.floor(Math.random() * 8) + 4;
            const nextVal = Math.min(100, prev + increment);

            // Dynamically change steps based on progress percent
            if (nextVal < 25) setDownloadStep(0); // Mirror server handshake
            else if (nextVal < 50) setDownloadStep(1); // Mod licenses binding
            else if (nextVal < 80) setDownloadStep(2); // Injecting asset files 
            else if (nextVal < 100) setDownloadStep(3); // Archiving game payload
            else setDownloadStep(4); // Verification checking

            return nextVal;
          });
        }, 120);
      } else {
        // Delay a tiny bit once at 100% to simulate safety scan
        timer = setTimeout(() => {
          setIsDownloading(false);
          setIsDownloadDone(true);
        }, 800);
      }
    }
    return () => clearTimeout(timer);
  }, [isDownloading, downloadProgress]);

  const startSimulatorDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadStep(0);
    setIsDownloadDone(false);
  };

  const handlePostReview = (e: FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev: LocalReview = {
      id: `user-${Date.now()}`,
      author: newCommentName.trim() || 'GamerPro_44',
      rating: userRating,
      message: userComment,
      device: `${selectedDevice} Mod`,
      timestamp: 'Just now'
    };

    setReviews(prev => [newRev, ...prev]);
    setUserComment('');
    setNewCommentName('');
    // User success message trigger can be implied by animated insert!
  };

  // Specs information based on Game Details
  const gameSize = `${((parseInt(game.id) || 12) * 18 % 380 + 45).toFixed(0)} MB`;
  const gameVersion = `v${(parseInt(game.id) || 1) % 4 + 1}.${(parseInt(game.id) || 1) % 9}.4`;
  const accentColor = CATEGORY_ACCENT[game.category] || '#00f3ff';
  const description = GAME_DESCRIPTIONS[game.category] || 'Enhanced features, ad-free play, premium unlock codes, and visual enhancements.';

  const stepsList = [
    'Handshaking secure mirror node...',
    'Authenticating special unlocked keys...',
    'Writing customized script assets...',
    'Downloading premium bundle payload...',
    'Verifying binary hashes with checksums...'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.section 
        id={`modal-${game.id}`}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 duration-300 grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
      >
        {/* Close Button Corner */}
        <button 
          onClick={onClose}
          id="modalClose"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 hover:bg-black/80"
          title="Close detail page"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Column Left: Graphic, Stats, Description */}
        <div className="md:col-span-5 bg-neutral-50 dark:bg-neutral-950/30 p-5 border-r border-gray-100 dark:border-neutral-800 flex flex-col justify-between max-h-[40vh] md:max-h-[92vh] overflow-y-auto">
          <div>
            {/* Visual Header */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 shadow-md">
              <img 
                src={game.thumbnail} 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" 
                alt={game.title} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 items-center">
                <span 
                  className="rounded px-2 py-0.5 text-[10px] font-black uppercase text-white tracking-widest"
                  style={{ backgroundColor: accentColor }}
                >
                  {game.category}
                </span>
                {game.isNew && (
                  <span className="rounded bg-cyan-500/80 px-2 py-0.5 text-[10px] font-black uppercase text-white tracking-wider animate-pulse">
                    New Update
                  </span>
                )}
              </div>
            </div>

            {/* General Specs */}
            <h2 className="mt-4 font-display text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
              {game.title}
            </h2>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-neutral-800 dark:text-neutral-100">{game.rating} Rating</span>
              <span>•</span>
              <span>{gameSize}</span>
              <span>•</span>
              <span className="text-cyan-500">{gameVersion}</span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {description}
            </p>

            <div className="mt-4 rounded-lg bg-neutral-100/50 p-3 text-[11px] text-neutral-500 dark:bg-neutral-900/40 dark:text-neutral-400 space-y-2 border border-gray-100 dark:border-neutral-800/40">
              <div className="flex justify-between">
                <span>Verification Signature:</span>
                <span className="text-emerald-500 font-mono font-bold">SHA-256 Validated</span>
              </div>
              <div className="flex justify-between">
                <span>Sideload Target:</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium font-mono">SANDBOX_OK</span>
              </div>
              <div className="flex justify-between">
                <span>Current Online Mirrors:</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-mono">3 Active Mirror Links</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800/60 hidden md:block">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Powered by apk25.store Secure Shield</span>
            </div>
          </div>
        </div>

        {/* Column Right: Interactive Install and Reviews Panel */}
        <div className="md:col-span-7 p-6 flex flex-col justify-between max-h-[52vh] md:max-h-[92vh] overflow-y-auto">
          {/* Target Sideload Platform Selector */}
          <div>
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-3 font-display">
              1. Choose Sideload Target Device
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Android', icon: Smartphone, ext: 'APK MOD' },
                { name: 'iOS', icon: Smartphone, ext: 'IPA Sideload' },
                { name: 'PC', icon: Laptop, ext: 'EXE Standalone' },
                { name: 'macOS', icon: Laptop, ext: 'DMG Universal' }
              ].map(platform => {
                const isSelected = selectedDevice === platform.name;
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.name}
                    id={`device-${platform.name}`}
                    onClick={() => {
                      if (!isDownloading) setSelectedDevice(platform.name as any);
                    }}
                    disabled={isDownloading}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500 shadow-md shadow-cyan-500/5'
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-200 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/20 dark:hover:bg-neutral-800'
                    } ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Icon className="h-4.5 w-4.5 mb-1" />
                    <span className="text-xs font-bold leading-none text-neutral-800 dark:text-neutral-200">{platform.name}</span>
                    <span className="text-[9px] text-neutral-400 font-mono mt-0.5">{platform.ext}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sideload Installation Simulator */}
          <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-5">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-3 font-display">
              2. Download and Compile Mod Package
            </span>

            {!isDownloading && !isDownloadDone && (
              <button
                onClick={startSimulatorDownload}
                id="start-download-btn"
                style={{ backgroundColor: accentColor }}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 font-display text-sm font-black uppercase tracking-wider text-black shadow-lg shadow-black/10 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="h-4.5 w-4.5 text-black" />
                GET MODDED LINK ({selectedDevice})
              </button>
            )}

            {/* Actively Downloading state */}
            {isDownloading && (
              <div className="rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/[0.02] p-4 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-500 flex items-center gap-2 font-bold select-none">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Securing Package...
                  </span>
                  <span className="text-cyan-500 font-bold">{downloadProgress}%</span>
                </div>

                {/* Simulated Progress bar */}
                <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-150 shadow-md shadow-cyan-500/50"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>

                {/* Animated changing description logs */}
                <p className="mt-3 text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 animate-pulse min-h-[1.5rem]">
                  <span>⚡</span> {stepsList[downloadStep]}
                </p>
              </div>
            )}

            {/* Download complete state! */}
            {isDownloadDone && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-neutral-900 text-xs">✓</span>
                  Compiled Successfully!
                </div>
                <p className="mt-2.5 text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                  Unique dynamic key generated for {selectedDevice} sandbox payload. Ready to execute offline mode.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`In an production execution, this initiates direct transmission of ${game.title} ${selectedDevice} mod package!`);
                    }}
                    className="flex-1 rounded-lg bg-emerald-500 py-2.5 px-3 text-center text-xs font-black text-black uppercase tracking-wide hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                  >
                    Install Package File
                  </a>
                  <button
                    onClick={() => setIsDownloadDone(false)}
                    aria-label="Generate new compilation key"
                    className="rounded-lg border border-neutral-200 hover:bg-gray-50 flex items-center justify-center p-2.5 dark:border-neutral-800 dark:hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Review Feed & Ratings Section */}
          <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1 font-display">
                  <MessageSquare className="h-3.5 w-3.5 text-neutral-400" />
                  3. Community Verification Feed ({reviews.length})
                </span>
                <span className="text-[10px] text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 font-bold">
                  100% Secure Reviews
                </span>
              </div>

              {/* Scrolling reviews box */}
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {reviews.map((rev) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg bg-neutral-50/50 p-3 text-xs dark:bg-neutral-950/20 border border-gray-100 dark:border-neutral-800/40 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-800 dark:text-neutral-200 font-display">@{rev.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-medium text-cyan-500">{rev.device}</span>
                          <div className="flex items-center text-yellow-400 text-[10px] font-bold">
                            ★ {rev.rating}
                          </div>
                        </div>
                      </div>
                      <p className="mt-1.5 text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                        {rev.message}
                      </p>
                      <span className="absolute right-3 bottom-1.5 text-[9px] text-neutral-400 font-mono scale-90">{rev.timestamp}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Type/Add review form */}
            <form onSubmit={handlePostReview} className="mt-4 border-t border-gray-100 dark:border-neutral-800/50 pt-4">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 block mb-2">Write Sideload Review</span>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Gamer Username (e.g. John_App)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-cyan-500 dark:border-neutral-800 dark:text-white"
                />
                <div className="flex items-center justify-between px-2 bg-neutral-50 dark:bg-neutral-950/20 border border-gray-200 dark:border-neutral-800 rounded-lg">
                  <span className="text-[10px] text-neutral-400 font-medium">Your Rating:</span>
                  <div className="flex gap-0.5" id="user-star-scale">
                    {[1, 2, 3, 4, 5].map(stars => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setUserRating(stars)}
                        className="p-0.5 hover:scale-110 active:scale-95 transition-transform"
                        title={`${stars} star rating`}
                      >
                        <Star className={`h-3 w-3 ${stars <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300 dark:text-neutral-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type verification feedback... (e.g. Working instantly on Android!)"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  maxLength={160}
                  className="w-full rounded-lg border border-gray-200 bg-transparent py-2 pl-3 pr-10 text-xs text-neutral-900 outline-none focus:border-cyan-500 dark:border-neutral-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500 text-white hover:bg-cyan-600 active:scale-95 transition-all cursor-pointer"
                  title="Post review comment"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
