import { motion } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface GuidesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuidesDrawer({ isOpen, onClose }: GuidesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="ltr">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="absolute inset-y-0 right-0 pr-10 flex max-w-full">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#0c0c0b] p-6 shadow-2xl overflow-y-auto border-l border-neutral-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-500" />
              <h2 className="font-display text-lg font-bold text-white">
                Sideloading & Installation
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-neutral-800 cursor-pointer"
              title="Close panel"
            >
              <X className="h-5 w-5 text-neutral-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-6 text-left">
            {/* Guarantee Statement */}
            <div className="rounded-xl bg-cyan-500/5 p-4 border border-cyan-500/20">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    Double-Verified Secure Files
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Every package (APK, IPA, or Mod configuration) in apk25.store undergoes dynamic behavioral testing, hash validation, and signature verification using sandbox environments to ensure 100% safety.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Guides */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-neutral-200 text-sm tracking-wide uppercase">
                Step-by-Step Installation Guides
              </h3>

              {/* Android Guide */}
              <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-800/20">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-500 gap-1.5">
                    <img 
                      src="https://i.postimg.cc/mrWGrWq3/android-logo-powerful-mobile-apps-for-those-with-disabilities-3.png" 
                      alt="Android logo" 
                      className="h-3.5 w-auto object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                    Android APK
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-white">
                  Allow Unknown App Sources
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1.5 text-xs text-neutral-400 leading-relaxed">
                  <li>Get your dynamic APK install mirror token.</li>
                  <li>Go to system settings → <strong className="text-neutral-200 font-medium">Security & Safety</strong>.</li>
                  <li>Enable the &quot;Install Unknown Sources&quot; toggle for Google Chrome or your File Manager.</li>
                  <li>Open the downloaded APK from your download tray to install instantly with saved mod attributes intact.</li>
                </ol>
              </div>

              {/* iOS Guide */}
              <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-800/20">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded bg-indigo-500/10 px-1.5 py-0.5 text-xs font-semibold text-indigo-500 gap-1.5">
                    <img 
                      src="https://i.postimg.cc/43RT3RM6/file-apple-logo-black-svg-wikimedia-commons-1.png" 
                      alt="Apple logo" 
                      className="h-3.5 w-auto object-contain brightness-0 invert select-none"
                      referrerPolicy="no-referrer"
                    />
                    iOS IPA Sideload
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-white">
                  Installation Methods
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1.5 text-xs text-neutral-400 leading-relaxed">
                  <li>Transfer the provided IPA bundle on device.</li>
                  <li>Sideload using applications like TrollStore, Scarlet, AltStore, or Sideloadly.</li>
                  <li>If prompted with Developer Mode, turn it on under system Settings → <strong className="text-neutral-200 font-medium">Privacy & Security</strong>.</li>
                  <li>Trust the sideload profile in <strong className="text-neutral-200 font-medium">VPN & Device Management</strong>.</li>
                </ol>
              </div>
            </div>

            {/* Disclaimer Info */}
            <div className="flex gap-2.5 rounded-xl border border-orange-950/40 bg-orange-500/5 p-4 text-xs text-orange-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span>
                  <strong>Disclaimer Note:</strong> All files downloaded from the server are intended for personal, offline sandbox play. Make sure to bypass standard licensing servers safely.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
