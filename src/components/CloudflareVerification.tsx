import { useState, useEffect } from 'react';

interface CloudflareVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type VerificationState = 'loading_initial' | 'ready_checkbox' | 'loading_check' | 'failed_required';

export default function CloudflareVerification({ onSuccess, onCancel }: CloudflareVerificationProps) {
  const [state, setState] = useState<VerificationState>('loading_initial');
  const [rayId, setRayId] = useState('');

  // Generate a realistic Cloudflare Ray ID on mount
  useEffect(() => {
    const chars = '0123456789abcdef';
    let p1 = '';
    let p2 = '';
    for (let i = 0; i < 16; i++) {
      p1 += chars[Math.floor(Math.random() * chars.length)];
    }
    for (let i = 0; i < 16; i++) {
      p2 += chars[Math.floor(Math.random() * chars.length)];
    }
    setRayId(`${p1}sux${p2}`);
  }, []);

  // Handle the automatic states to match the screenshot verification flow
  useEffect(() => {
    if (state === 'loading_initial') {
      const timer = setTimeout(() => {
        setState('ready_checkbox');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (state === 'loading_check') {
      const timer = setTimeout(() => {
        setState('failed_required');
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (state === 'failed_required') {
      const timer = setTimeout(() => {
        onSuccess();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [state, onSuccess]);

  const handleCheckboxClick = () => {
    if (state === 'ready_checkbox') {
      setState('loading_check');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 sm:p-12 md:p-16 text-white font-sans text-left overflow-y-auto">
      {/* Top Banner Header & Cancel Button */}
      <div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[13px] font-extrabold tracking-wider text-white font-sans select-none">
            APK25.STORE
          </span>
        </div>

        {/* Primary Title Block */}
        <h2 className="mt-8 text-2xl font-bold text-white tracking-tight leading-tight select-none">
          Performing security verification
        </h2>
        <p className="mt-4 text-xs text-neutral-400 leading-relaxed select-none">
          This website uses a security service to protect against malicious bots. This page is displayed while we verify you are not a bot.
        </p>

        {/* Turnstile Container Box */}
        <div className="mt-8 rounded-md border border-[#2d2d2d] bg-[#0c0c0e] hover:bg-[#111113] transition-colors p-4 flex items-center justify-between shadow-lg">
          
          {/* Left state interactive panel */}
          <div className="flex items-center gap-3">
            {state === 'loading_initial' && (
              <div className="flex items-center gap-3 select-none">
                {/* Thin green arc spinner inside a circle */}
                <div className="relative flex h-[28px] w-[28px] items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin" />
                </div>
                <span className="text-sm text-[#d4d4d8] font-medium font-sans">
                  Verifying...
                </span>
              </div>
            )}

            {state === 'ready_checkbox' && (
              <button 
                onClick={handleCheckboxClick}
                className="flex items-center gap-3 cursor-pointer group text-left outline-none"
              >
                {/* Simulated turnstile checkbox check outline */}
                <div className="h-7 w-7 rounded border-2 border-[#52525b] group-hover:border-neutral-300 transition-colors bg-transparent flex items-center justify-center shrink-0" />
                <span className="text-sm text-neutral-200 font-medium font-sans select-none">
                  Verify you are human
                </span>
              </button>
            )}

            {state === 'loading_check' && (
              <div className="flex items-center gap-3 select-none">
                {/* Thin green arc spinner inside a circle */}
                <div className="relative flex h-[28px] w-[28px] items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin" />
                </div>
                <span className="text-sm text-[#d4d4d8] font-medium font-sans">
                  Verifying...
                </span>
              </div>
            )}

            {state === 'failed_required' && (
              <div className="flex items-center gap-3 select-none">
                {/* Red cross outline */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-rose-500 bg-rose-500/10 text-rose-500 text-xs font-bold leading-none select-none">
                  ✕
                </div>
                <span className="text-sm text-rose-500 font-bold font-sans">
                  Verification required!
                </span>
              </div>
            )}
          </div>

          {/* Right Cloudflare logo image */}
          <div className="flex items-center select-none shrink-0 border-l border-neutral-800/80 pl-3">
            <img 
              src="https://i.ibb.co/nqV5JMM8/cloudflare-logo-black-sth-2-removebg-preview.png" 
              alt="Cloudflare" 
              className="h-7 w-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      {/* Footer Details block with thin line match */}
      <div className="mb-6 select-none font-sans">
        <div className="border-t border-[#1c1c1f] my-4" />
        <div className="text-[11px] text-neutral-500 space-y-1">
          <div>
            Ray ID: <span className="text-neutral-400 font-mono font-medium">{rayId}</span>
          </div>
          <div>
            Performance & Security by{' '}
            <span className="text-neutral-400 underline decoration-neutral-700 cursor-pointer hover:text-neutral-200 transition-colors">
              Cloudflare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

