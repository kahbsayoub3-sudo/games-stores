import { useState, useEffect, FormEvent } from 'react';
import { NAMES, MESSAGES, GAMES_DATA } from '../data';
import { Activity, Send, MessageSquare, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  game: string;
  avatarSeed: number;
}

interface ActivityItem {
  id: string;
  user: string;
  game: string;
  platform: string;
  timeSec: number;
}

export default function LiveChatAndActivity() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentTab, setCurrentTab] = useState<'chat' | 'activity'>('chat');

  // Seed initial values
  useEffect(() => {
    // Generate initial live chats
    const initialChats: ChatMessage[] = Array.from({ length: 6 }).map((_, i) => {
      const g = GAMES_DATA[Math.floor(Math.random() * GAMES_DATA.length)];
      return {
        id: `chat-${i}-${Date.now()}`,
        user: NAMES[i % NAMES.length],
        text: MESSAGES[i % MESSAGES.length],
        game: g.title,
        avatarSeed: Math.floor(Math.random() * 100) + 1
      };
    });
    setChatMessages(initialChats);

    // Generate initial dynamic activity
    const initialActs: ActivityItem[] = Array.from({ length: 5 }).map((_, i) => {
      const g = GAMES_DATA[Math.floor(Math.random() * GAMES_DATA.length)];
      const platforms = ['Android APK', 'iOS Premium', 'PC Standalone', 'macOS DMG'];

      return {
        id: `act-${i}-${Date.now()}`,
        user: NAMES[(i + 3) % NAMES.length],
        game: g.title,
        platform: platforms[i % platforms.length],
        timeSec: (i + 1) * 4
      };
    });
    setActivities(initialActs);
  }, []);

  // Periodic triggers to add new messages / installations and keep the simulation ticking
  useEffect(() => {
    const interval = setInterval(() => {
      const selectedGame = GAMES_DATA[Math.floor(Math.random() * GAMES_DATA.length)];
      const randomUser = NAMES[Math.floor(Math.random() * NAMES.length)];
      
      if (Math.random() > 0.4) {
        // Appends new chat comment
        const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        const newMsg: ChatMessage = {
          id: `chat-${Date.now()}`,
          user: randomUser,
          text: randomMsg,
          game: selectedGame.title,
          avatarSeed: Math.floor(Math.random() * 100) + 1
        };
        setChatMessages(prev => [newMsg, ...prev.slice(0, 15)]);
      }

      // Append new download action
      const platforms = ['Android APK', 'iOS Premium', 'PC Mod', 'Android Mod'];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        user: randomUser,
        game: selectedGame.title,
        platform: randomPlatform,
        timeSec: 1
      };
      setActivities(prev => [newAct, ...prev.slice(0, 15)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const clientMsg: ChatMessage = {
      id: `chat-client-${Date.now()}`,
      user: 'You_Gamer',
      text: inputText,
      game: 'Global Feed',
      avatarSeed: 44
    };

    setChatMessages(prev => [clientMsg, ...prev]);
    setInputText('');
  };

  return (
    <div className="rounded-2xl border border-neutral-900 bg-[#0c0c0b] p-5 shadow-xl flex flex-col justify-between h-[450px]" dir="ltr">
      <div>
        {/* Toggle tabs and counter indicator */}
        <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-display transition-all cursor-pointer ${
                currentTab === 'chat'
                  ? 'bg-cyan-500/10 text-cyan-500'
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Live Chat
            </button>
            <button
              onClick={() => setCurrentTab('activity')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-display transition-all cursor-pointer ${
                currentTab === 'activity'
                  ? 'bg-cyan-500/10 text-cyan-500'
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              Active Installs
            </button>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-mono font-black uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            420 Online
          </span>
        </div>

        {/* Content Feeds */}
        <div className="mt-4 space-y-3 overflow-y-auto h-[280px] pr-1">
          <AnimatePresence initial={false}>
            {currentTab === 'chat' ? (
              chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2.5 text-xs rounded-lg p-2.5 bg-neutral-950/20 border border-neutral-900/40"
                >
                  {/* Small Profile Initial Avatar */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 font-display font-black text-neutral-300">
                    {msg.user.substring(0, 1).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-200 font-display text-[11px]">
                        @{msg.user}
                      </span>
                      <span className="text-[9px] text-[#f3ba0b] font-mono bg-[#f3ba0b]/5 px-1.5 rounded">
                        {msg.game}
                      </span>
                    </div>
                    <p className="mt-1 text-neutral-400 leading-relaxed text-[11px] text-left">
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              activities.map((act) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-xs p-2 rounded-lg bg-emerald-500/[0.02] border border-emerald-500/5"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <Zap className="h-4 w-4 animate-bounce" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[11px] text-neutral-300 leading-normal text-left">
                      <span>
                        <strong className="text-white font-bold">@{act.user}</strong> sideloaded{' '}
                        <span className="text-cyan-400 font-bold">{act.game}</span> ({act.platform})
                      </span>
                    </p>
                    <span className="text-[9px] text-neutral-400 font-mono">Verified • Just now</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent chat inputs */}
      <form onSubmit={handleSendChat} id="chat-entry-form" className="mt-2 border-t border-neutral-800 pt-3">
        <div className="flex gap-2">
          <input
            type="text"
            id="shout-input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Shout to the mods feed..."
            maxLength={100}
            className="flex-1 rounded-lg border border-neutral-800 bg-transparent px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            aria-label="Send Shout"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
