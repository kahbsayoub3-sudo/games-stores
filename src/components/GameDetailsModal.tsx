import { useState, useEffect, FormEvent } from 'react';
import { Game, CATEGORY_ACCENT, NAMES, MESSAGES, TRANSLATIONS } from '../data';
import { X, Star, RefreshCw, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ContentLockerModal from './ContentLockerModal';
import CloudflareVerification from './CloudflareVerification';

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

  const [selectedDevice, setSelectedDevice] = useState<'iOS' | 'Android'>('iOS');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStep, setDownloadStep] = useState(0);
  const [isDownloadDone, setIsDownloadDone] = useState(false);
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [showCloudflare, setShowCloudflare] = useState(false);

  // States for reviews
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [newCommentName, setNewCommentName] = useState('');
  const [showReviewsTab, setShowReviewsTab] = useState(false);

  // Rotational index for verified activity feed
  const [activityIndex, setActivityIndex] = useState(0);

  const t = TRANSLATIONS['en'];

  // Verified Activity lists
  const VERIFIED_ACTIVITIES_EN = [
    { name: 'Lisa_Anderson', comment: 'Unlocked successfully!', device: 'iOS Premium' },
    { name: 'GamerX_44', comment: 'Mod files transferred over USB!', device: 'Android Mod' },
    { name: 'Youssof_K', comment: 'Works perfectly on iPhone 15 Pro!', device: 'iOS Premium' },
    { name: 'Mark_D', comment: 'Unlimited resources generated!', device: 'Android Mod' },
    { name: 'Sarah_Playz', comment: 'Sideloaded successfully in 1 click!', device: 'iOS Premium' },
    { name: 'Kadir_99', comment: 'Verification completed, very fast!', device: 'Android Mod' },
  ];

  const activeActivities = VERIFIED_ACTIVITIES_EN;

  useEffect(() => {
    const fallbackReviews: LocalReview[] = [];

    for (let i = 0; i < 4; i++) {
      const author = NAMES[(i * 3 + parseInt(game.id) || 4) % NAMES.length];
      const message = MESSAGES[(i * 2 + parseInt(game.id) || 1) % MESSAGES.length];
      const devices = ['Android Mod', 'iOS Premium', 'Android APK', 'iOS Sideload'];
      
      fallbackReviews.push({
        id: `fallback-${i}`,
        author,
        rating: Math.floor(Math.random() * 2) + 4,
        message,
        device: devices[(i + parseInt(game.id)) % devices.length],
        timestamp: `${i + 1}h ago`
      });
    }
    setReviews(fallbackReviews);

    // Initial resets
    setIsDownloading(false);
    setDownloadProgress(0);
    setDownloadStep(0);
    setIsDownloadDone(false);
    setShowCloudflare(false);
  }, [game]);

  // Lock body scroll of page while modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Rotate activity index
  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex(prev => (prev + 1) % activeActivities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeActivities.length]);

  // Core download logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDownloading) {
      if (downloadProgress < 100) {
        timer = setTimeout(() => {
          setDownloadProgress(prev => {
            const increment = Math.floor(Math.random() * 18) + 14; // rapid compilation progress bar
            const nextVal = Math.min(100, prev + increment);

            if (nextVal < 30) setDownloadStep(0);
            else if (nextVal < 60) setDownloadStep(1);
            else if (nextVal < 85) setDownloadStep(2);
            else setDownloadStep(3);

            return nextVal;
          });
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDownloading(false);
          setIsDownloadDone(true);
          setIsLockerOpen(true); // POP content locker immediately!
        }, 400);
      }
    }
    return () => clearTimeout(timer);
  }, [isDownloading, downloadProgress]);

  const startDownloadWorkflow = (deviceType: 'iOS' | 'Android') => {
    setSelectedDevice(deviceType);
    setShowCloudflare(true);
    setIsDownloading(false);
    setDownloadProgress(0);
    setDownloadStep(0);
    setIsDownloadDone(false);
  };

  const handlePostReview = (e: FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev: LocalReview = {
      id: `user-${Date.now()}`,
      author: newCommentName.trim() || 'AnonymousGamer',
      rating: userRating,
      message: userComment,
      device: `${selectedDevice} Mod`,
      timestamp: 'Just now'
    };

    setReviews(prev => [newRev, ...prev]);
    setUserComment('');
    setNewCommentName('');
  };

  const currentActivity = activeActivities[activityIndex];

  const stepsList = [
    'Establishing premium handshake node...',
    'Matching device architecture signature...',
    'Consolidating mod asset blocks...',
    'Finalizing target sandbox compilation...'
  ];

  const displayCategory = game.category;
  const displayTitle = game.title;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-x-hidden overflow-y-auto font-sans" dir="ltr">
      {/* Background dark blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Cloudflare turnstile security gate overlay - Full screen outside the card */}
      {showCloudflare && (
        <CloudflareVerification
          onSuccess={() => {
            setShowCloudflare(false);
            const lockerUrl = "https://auraplay.online/cl/i/7jvk7v";
            const gameTitle = encodeURIComponent(game.title);
            const gameImage = encodeURIComponent(game.thumbnail);
            const deviceName = encodeURIComponent(selectedDevice || "Android");
            const finalUrl = `${lockerUrl}?title=${gameTitle}&image=${gameImage}&device=${deviceName}`;
            window.location.replace(finalUrl);
          }}
          onCancel={() => setShowCloudflare(false)}
        />
      )}

      {/* Main card - optimized perfectly for mobile aspect & looks exactly like the phone screenshot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', damping: 26, stiffness: 210 }}
        className="relative z-10 w-full max-w-[350px] overflow-hidden rounded-[32px] bg-[#0c0c0b] border border-neutral-900 shadow-2xl text-white select-none my-auto"
      >
        {/* Upper visual graphic block with gradient fading out */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={game.thumbnail}
            className="h-full w-full object-cover grayscale-[15%] brightness-95"
            alt={game.title}
            referrerPolicy="no-referrer"
          />
          {/* Edge shadow masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0c0b] to-transparent" />

          {/* Close (X) circular overlay button - moved to top left to match design screenshot */}
          <button
            onClick={onClose}
            id="modalClose"
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border border-neutral-800/40 hover:bg-neutral-900 active:scale-95 transition-all cursor-pointer z-30"
            title="Close Details"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content details block container */}
        <div className="px-5 pb-5 pt-0.5 flex flex-col items-center text-center">
          {/* Centered Yellowish category tag */}
          <span className="text-[10px] font-black tracking-[0.25em] text-[#ebb308] uppercase">
            {displayCategory}
          </span>

          {/* Centered Large Display Game Title */}
          <h2 className="mt-1 font-sans text-[24px] font-extrabold tracking-tight text-white leading-snug">
            {displayTitle}
          </h2>

          {/* Centered Star Rating and NEW Update badge row */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1 text-sm font-black text-[#ebb308]">
              <span className="text-base text-[#ebb308]">★</span>
              <span>{game.rating || '4.9'}</span>
            </span>
            <span className="rounded bg-[#0c2a26] border border-[#115e59] px-2 py-0.5 text-[9px] font-black uppercase text-[#2dd4bf] tracking-wider">
              {t.new_badge}
            </span>
          </div>

          {/* Download & Loading Actuators Stack */}
          <div className="mt-5 w-full space-y-3 text-left">
            <AnimatePresence mode="wait">
              {!isDownloading && !isDownloadDone ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2.5"
                >
                  {/* IOS DOWNLOAD ACTION */}
                  <button
                    onClick={() => startDownloadWorkflow('iOS')}
                    id="download-ios-button"
                    className="w-full py-3 px-6 rounded-full font-black text-[11px] font-sans tracking-[0.14em] uppercase text-black bg-[#ebb308] hover:bg-[#d9a307] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg className="h-4.5 w-4.5 fill-current text-black select-none" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2 1.1 -2.9 1.93-.6.69-1.13 1.83-.99 2.94 1.1.08 2.24-.91 2.9-1.81z"/>
                    </svg>
                    {t.download_ios}
                  </button>

                  {/* ANDROID DOWNLOAD ACTION */}
                  <button
                    onClick={() => startDownloadWorkflow('Android')}
                    id="download-android-button"
                    className="w-full py-3 px-6 rounded-full font-black text-[11px] font-sans tracking-[0.14em] uppercase text-black bg-[#ebb308] hover:bg-[#d9a307] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg className="h-4.5 w-4.5 fill-current text-black select-none" viewBox="0 0 24 24">
                      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-4.13c.24-.41.1-.94-.3-1.18-.4-.25-.93-.11-1.18.29L12.55 5.5h-1.1l-1.49-2.52c-.25-.4-.78-.54-1.18-.29-.4.24-.54.77-.3 1.18l1.39 2.35C8.01 7.15 6.47 8.9 6.2 11h11.6c-.27-2.1-1.81-3.85-3.67-4.78l1.4-2.35zM9.5 8.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm5 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
                    </svg>
                    {t.download_android}
                  </button>
                </motion.div>
              ) : isDownloading ? (
                /* Dynamic secure compiler pipeline feedback loop */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-[#ebb308]/40 bg-[#ebb308]/[0.02] p-4 text-left font-mono"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#ebb308]">
                    <span className="flex items-center gap-2 uppercase tracking-wider">
                      <RefreshCw className="h-3 w-3 animate-spin text-[#ebb308]" />
                      {t.securing_package}
                    </span>
                    <span>{downloadProgress}%</span>
                  </div>

                  {/* Progress filler line */}
                  <div className="mt-3 h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-[#ebb308] to-amber-500 transition-all duration-100"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>

                  <p className="mt-3 text-[10px] text-neutral-400 select-none animate-pulse">
                    ⚡ {stepsList[downloadStep] || 'Processing files...'}
                  </p>
                </motion.div>
              ) : (
                /* Verification completion redirect locker container */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-left font-mono"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black text-[10px] font-black">
                      ✓
                    </span>
                    {t.compiling_complete}
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-400 leading-normal">
                    Ready for sideload. Secure verification socket requested for device.
                  </p>
                  <button
                    onClick={() => setIsLockerOpen(true)}
                    className="mt-4 w-full py-3 rounded-xl bg-emerald-500 text-black font-black uppercase text-xs tracking-wider hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer text-center"
                  >
                    {t.open_verif_status}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fast, secure, free subtitle badge */}
            <div className="text-[10px] font-black tracking-[0.25em] text-neutral-500 font-mono text-center pt-2 uppercase">
              FAST  ·  SECURE  ·  FREE
            </div>
          </div>

          {/* Real-time verified actions activity component - clean native transitions */}
          <div className="w-full text-left mt-4.5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono mb-2 justify-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
              </span>
              {t.recent_activity}
            </div>

            {/* Verified event slot */}
            <div className="flex items-center justify-between gap-3 bg-[#111110] rounded-2xl p-3 border border-neutral-900 min-h-[58px]">
              <div className="flex items-center gap-2.5">
                {/* Simulated profile avatar wrapper */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-xs font-black text-neutral-300">
                  {currentActivity.name.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {currentActivity.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                    {currentActivity.comment}
                  </span>
                </div>
              </div>

              {/* Verified status marker badge */}
              <div className="text-[10px] font-black text-emerald-400 tracking-wider select-none text-right shrink-0">
                {t.verified_status}
              </div>
            </div>
          </div>

          {/* Live comment/reviews toggler banner */}
          <div className="w-full mt-3 text-left">
            <button
              onClick={() => setShowReviewsTab(!showReviewsTab)}
              className="w-full py-2 px-3 bg-neutral-900/30 hover:bg-neutral-800/40 text-[10px] font-bold text-neutral-400 hover:text-white transition-colors rounded-xl flex items-center justify-between border border-neutral-800/30 cursor-pointer"
            >
              <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <MessageSquare className="h-3.5 w-3.5" />
                {t.user_reviews} ({reviews.length})
              </span>
              <span className="text-cyan-400 font-mono pr-1 text-xs">
                {showReviewsTab ? t.reviews_close : t.reviews_expand}
              </span>
            </button>

            {/* Expandable comments flow */}
            <AnimatePresence>
              {showReviewsTab && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3.5 text-left border-t border-neutral-800/60 pt-3 space-y-3"
                >
                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {reviews.map(rev => (
                      <div key={rev.id} className="rounded-xl bg-neutral-950/50 p-3 text-[11px] border border-neutral-900/60 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#f3ba0b]">@{rev.author}</span>
                          <span className="text-[9px] text-neutral-500 uppercase">{rev.device}</span>
                        </div>
                        <p className="mt-1 text-neutral-300 leading-relaxed">{rev.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add review form inside expanded section */}
                  <form onSubmit={handlePostReview} className="space-y-2 mt-2 pt-2 border-t border-neutral-800/40">
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        placeholder={t.username_placeholder}
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        className="rounded-lg border border-neutral-800 bg-neutral-950/60 px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#f3ba0b]"
                      />
                      <div className="flex items-center justify-between px-2 bg-neutral-950/60 border border-neutral-800 rounded-lg">
                        <span className="text-[9px] text-neutral-500 font-medium">{t.stars}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(stars => (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setUserRating(stars)}
                              className="p-0.5"
                              title={`${stars} Stars`}
                            >
                              <Star className={`h-2.5 w-2.5 ${stars <= userRating ? 'fill-[#f3ba0b] text-[#f3ba0b]' : 'text-neutral-700'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.feedback_placeholder}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950/60 py-1.5 pl-2.5 pr-8 text-xs text-white outline-none focus:border-[#f3ba0b]"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded bg-[#f3ba0b] text-black hover:bg-amber-400 cursor-pointer"
                      >
                        <Send className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Content Locker Portal overlay */}
      <AnimatePresence>
        {isLockerOpen && (
          <ContentLockerModal
            isOpen={isLockerOpen}
            onClose={() => setIsLockerOpen(false)}
            game={game}
            device={selectedDevice}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
