import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Check, Lock, RefreshCw, ChevronRight } from 'lucide-react';
import { Game, TRANSLATIONS } from '../data';

interface ContentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
  device: string;
}

export default function ContentLockerModal({ isOpen, onClose, game, device }: ContentLockerModalProps) {
  const [sessionTimeLeft, setSessionTimeLeft] = useState(299); // 5 minutes locker countdown
  const [logIndex, setLogIndex] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSessionTimeLeft(prev => (prev > 0 ? prev - 1 : 299));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Rotational checking logs
  const checkingLogs = [
    'Initializing secure handshakes...',
    'Matching device fingerprints...',
    'Awaiting premium verification callback...',
    'Checking offer completion logs on server...',
    'Verification pending - Action required below'
  ];

  useEffect(() => {
    if (!isOpen) return;
    const logTimer = setInterval(() => {
      setLogIndex(prev => (prev + 1) % checkingLogs.length);
    }, 4000);
    return () => clearInterval(logTimer);
  }, [isOpen, checkingLogs.length]);

  if (!isOpen || !game) return null;

  // Format the countdown display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const lockerUrl = "https://auraplay.online/cl/i/7jvk7v";
  const t = TRANSLATIONS['en'];
  const displayTitle = game.title;
  const displayDevice = device;

  // Replace placeholders inside the desc
  const formattedDesc = t.locker_desc
    .replace('{game}', displayTitle)
    .replace('{device}', displayDevice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-x-hidden overflow-y-auto font-sans" dir="ltr">
      {/* Background Mask */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Locker Pop-up Sheet */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-rose-500/30 bg-[#0d0d0c] text-white shadow-2xl shadow-rose-950/20 px-5 py-6 sm:p-6 text-left"
      >
        {/* top scanline animation effect */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-neutral-900 border border-neutral-800 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
          title="Cancel"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Animated Locker Shield Header */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-500/20 mb-3.5">
            <Lock className="h-7 w-7 text-white animate-pulse" />
            <span className="absolute -right-1 -bottom-1 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-black text-black">
              !
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            {t.locker_title}
          </h3>
          <p className="mt-2 text-xs text-neutral-400 max-w-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedDesc.replace(displayTitle, `<span class="text-[#f3ba0b] font-bold">${displayTitle}</span>`).replace(displayDevice, `<span class="text-cyan-400">${displayDevice}</span>`) }} />
        </div>

        {/* Urgency Countdown banner */}
        <div className="mt-4.5 rounded-2xl bg-black p-3 flex items-center justify-between border border-neutral-900">
          <div className="flex items-center gap-2 text-[10px] font-mono font-medium text-rose-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            {t.locker_securing}
          </div>
          <span className="text-xs font-mono font-black text-[#f3ba0b]">{formatTime(sessionTimeLeft)}</span>
        </div>

        {/* Instructions Block */}
        <div className="mt-5 space-y-3">
          <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider font-mono">
            {t.locker_how_to}
          </span>

          <div className="space-y-2">
            {[
              { text: t.locker_step1 },
              { text: t.locker_step2 },
              { text: t.locker_step3 }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 text-xs bg-neutral-950/80 p-3 rounded-xl border border-neutral-900 text-left">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 font-bold font-mono text-xs">
                  {idx + 1}
                </span>
                <p className="text-neutral-300 leading-normal">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Pulsing Lock Trigger Button linking to lock destination */}
        <div className="mt-6">
          <a
            href={lockerUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="locker-download-trigger"
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f3ba0b] to-amber-500 hover:from-[#ffd443] hover:to-amber-400 py-4 px-6 text-center text-sm font-black uppercase tracking-wider text-black shadow-xl shadow-[#f3ba0b]/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="h-5 w-5 text-black animate-pulse" />
            {t.locker_verify_btn}
            <ChevronRight className="h-4.5 w-4.5 text-black transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Dynamic checking logs and simulator spinners */}
        <div className="mt-5.5 rounded-2xl bg-neutral-950/60 p-3.5 border border-neutral-900/60 text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-amber-500/90">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span className="uppercase font-bold tracking-widest leading-none">{t.live_monitor}</span>
          </div>
          <p className="mt-1.5 font-mono text-xs text-neutral-400 min-h-[1.5rem] antialiased select-none animate-pulse">
            {checkingLogs[logIndex]}
          </p>
        </div>

        {/* Trust Signals Footer Grid Block */}
        <div className="mt-5.5 pt-4.5 border-t border-neutral-900/80 flex items-center justify-center gap-6 text-[9px] text-neutral-500 font-mono font-bold uppercase select-none">
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Norton Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>PROtect verified</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>SSL MATCH</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
