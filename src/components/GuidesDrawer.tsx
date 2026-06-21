import { motion } from 'motion/react';
import { X, ShieldCheck, Download, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GuidesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuidesDrawer({ isOpen, onClose }: GuidesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white p-6 shadow-2xl dark:bg-neutral-900 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-500" />
              <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                Sideloading & Installation
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
              title="Close panel"
            >
              <X className="h-5 w-5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-6">
            {/* Guarantee Statement */}
            <div className="rounded-xl bg-cyan-500/5 p-4 border border-cyan-500/20">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">
                    Double-Verified Secure Files
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    Every package (APK, IPA, or Mod configuration) in apk25.store undergoes dynamic behavioral testing, hash validation, and signature verification using sandbox environments to ensure 100% safety.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Guides */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-neutral-800 dark:text-neutral-200 text-sm tracking-wide uppercase">
                Step-by-Step Installation Guides
              </h3>

              {/* Android Guide */}
              <div className="rounded-xl border border-gray-100 p-4 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
                <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-500">
                  Android APK
                </span>
                <h4 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Allow Unknown App Sources
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  <li>Get your dynamic APK install mirror token.</li>
                  <li>Go to system settings → <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Security & Safety</strong>.</li>
                  <li>Enable the &quot;Install Unknown Sources&quot; toggle for Google Chrome or your File Manager.</li>
                  <li>Open the downloaded APK from your download tray to install instantly with saved mod attributes intact.</li>
                </ol>
              </div>

              {/* iOS Guide */}
              <div className="rounded-xl border border-gray-100 p-4 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
                <span className="inline-flex items-center rounded bg-indigo-500/10 px-1.5 py-0.5 text-xs font-semibold text-indigo-500">
                  iOS IPA Sideload
                </span>
                <h4 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Installation Methods
                </h4>
                <ol className="mt-2 list-decimal list-inside space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  <li>Transfer the provided IPA bundle on device.</li>
                  <li>Sideload using applications like TrollStore, Scarlet, AltStore, or Sideloadly.</li>
                  <li>If prompted with Developer Mode, turn it on under system Settings → <strong className="text-neutral-800 dark:text-neutral-200 font-medium">Privacy & Security</strong>.</li>
                  <li>Trust the sideload profile in <strong className="text-neutral-800 dark:text-neutral-200 font-medium">VPN & Device Management</strong>.</li>
                </ol>
              </div>

              {/* PC Guide */}
              <div className="rounded-xl border border-gray-100 p-4 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
                <span className="inline-flex items-center rounded bg-amber-500/10 px-1.5 py-0.5 text-xs font-semibold text-amber-500">
                  PC / Emulator
                </span>
                <h4 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  Extract and Run
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  PC versions are delivered as lightweight standalones. Simply extract the zip archive anywhere and execute the program. No admin installations required. For mobile emulation, load the APK directly onto LDPlayer, BlueStacks, or MuMu emulator of choice.
                </p>
              </div>
            </div>

            {/* Disclaimer Info */}
            <div className="flex gap-2.5 rounded-xl border border-orange-200 bg-orange-500/5 p-4 text-xs text-orange-600 dark:border-orange-950/40 dark:text-orange-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Disclaimer Note:</strong> All files downloaded from the server are intended for personal, offline sandbox play. Make sure to bypass standard licensing servers safely.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
