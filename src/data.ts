export interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  rating: number;
  isNew?: boolean;
}

export const GAMES_DATA: Game[] = [
  { id: '1', title: 'NightGamer', category: 'Simulation', thumbnail: 'https://www.latestmodapks.com/wp-content/uploads/2024/10/nightgamer-mod-3-media.webp', rating: 4.9, isNew: true },
  { id: '109', title: 'Cryptid Park', category: 'Simulation', thumbnail: 'https://apktodo.io/uploads/2026/2/cryptid-park-2-free.jpg', rating: 4.5, isNew: true },
  { id: '2', title: 'Kunoichi Sekiren', category: 'Action', thumbnail: 'https://thomastaihei-hgames.net/wp-content/uploads/2020/11/HG361-01.jpg', rating: 4.7 },
  { id: '3', title: 'College Brawl', category: 'Action', thumbnail: 'https://qa-apk.com/wp-content/uploads/2024/04/college-brawl.png', rating: 4.8 },
  { id: '4', title: 'Tag After School', category: 'Horror', thumbnail: 'https://myvideogamelist-com.s3.amazonaws.com/assets/boxart/NBSOjcDLZoMdlLDfS7n4EwQuxnboe0DeeL7Cq7Q5.jpg', rating: 4.3 },
  { id: '5', title: 'Spooky Milk', category: 'Simulation', thumbnail: 'https://www.latestmodapks.com/wp-content/uploads/2023/07/Spooky.Milk_.Life-1.jpeg', rating: 4.8 },
  { id: '6', title: 'Handyman Legend', category: 'Simulation', thumbnail: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2127010/capsule_616x353.jpg?t=1748937113', rating: 4.8 },
  { id: '8', title: 'Helltaker', category: 'Puzzle', thumbnail: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1289310/header.jpg', rating: 4.9 },
  { id: '11', title: 'Dead Cells', category: 'Pixel', thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/capsule_616x353.jpg', rating: 4.8 },
  { id: '19', title: 'Vampire Survivors', category: 'Pixel', thumbnail: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1794680/header.jpg', rating: 4.8 },
  { id: '63', title: 'Pragmata Mobile', category: 'Adventure', thumbnail: 'https://i.ibb.co/L4sfZmS/demo-image-sp.webp', rating: 4.8 },
  { id: '64', title: 'Assassin’s Creed Black Flag Resynced', category: 'Adventure', thumbnail: 'https://i.ibb.co/Kj07VQcL/images.jpg', rating: 4.8 },
  
  // ===== ألعاب تم استيرادها من الموقع الثاني =====
  { id: 'new_1', title: 'BeamNG.drive', category: 'Action', thumbnail: 'https://avatars.githubusercontent.com/u/6404024?s=280&v=4', rating: 4.8, isNew: true },
  { id: 'new_2', title: 'GTA VI Mod', category: 'Action', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtz8H4QHw9gQGKsLDCqRXwVepv44-M22HIw&s', rating: 4.9, isNew: true },
  { id: 'new_3', title: 'CarX Street Mod', category: 'Racing', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pqJlpezWAKhl0bwwWy1GIc_zVOGXjHvz9Q&s', rating: 4.7 },
  { id: 'new_100', title: 'Mecchacha Meleon', category: 'Action', thumbnail: 'https://i.ibb.co/kVwQNGM7/400x400bb-75.webp', rating: 4.7 },
  { id: 'new_102', title:'Naruto Ultimate Ninja Storm 4', category: 'Action', thumbnail: 'https://i.ibb.co/N2wFRX1V/2-Xi-LRw-H0u-Vkent-Yvwhwqs-X8-FRywlul-Yp.jpg', rating: 4.6 },
  { id: 'new_4', title: 'Delta Executor', category: 'Tool', thumbnail: 'https://deltaexectr.com/wp-content/uploads/2025/03/Delta-Executor-logo.webp', rating: 4.6 },
  { id: 'new_5', title: 'Baseball 9 Mod', category: 'Sports', thumbnail: 'https://i.ibb.co/1tj1k4hV/unnamed.png', rating: 4.5 },
  { id: 'new_6', title: 'MLB The Show 26', category: 'Sports', thumbnail: 'https://i.ibb.co/wr05mv9T/images.jpg', rating: 4.7 },
  { id: 'new_7', title: 'The Spike MOD', category: 'Sports', thumbnail: 'https://i.ibb.co/bMyPRTKz/images-1.jpg', rating: 4.8 },
  { id: 'new_8', title: 'Fortnite Mobile', category: 'Action', thumbnail: 'https://i.ibb.co/xKphdSZT/unnamed-1.png', rating: 4.5 },
  { id: 'new_9', title: 'Poppy Playtime 6', category: 'Horror', thumbnail: 'https://i.ibb.co/SXsM0G87/poppy-playtime-chapter-6-900x506.jpg', rating: 4.9 },
  { id: 'new_10', title: 'Tomodachi Life', category: 'Simulation', thumbnail: 'https://i.ibb.co/67XND6tF/Tomodachi-Life.jpg', rating: 4.4 },
  { id: 'new_11', title: 'Assetto Corsa', category: 'Racing', thumbnail: 'https://i.postimg.cc/mgStnz0K/Picsart-25-10-16-14-24-02-706.jpg', rating: 4.8 },
  { id: 'new_12', title: 'NBA 2K26 Mod', category: 'Sports', thumbnail: 'https://i.ibb.co/Kcwq18V3/nba-2k26-cdkeys.png', rating: 4.7 },
  { id: 'new_13', title: 'Spider-Man 2', category: 'Action', thumbnail: 'https://steamunlocked.org/wp-content/uploads/2025/02/Marvels-Spider-man-2-Free-Download.png', rating: 4.9 },
  { id: 'new_14', title: 'PVZ Fusion 3.0', category: 'Strategy', thumbnail: 'https://blogger.googleusercontent.com/img/a/AVvXsEhdo_akHiC3o7TUSawNrIlS7Ea0CFnBBvCglBdrb2mXHZomSn3btOXZjqXdibNNCtNhgwx_6W-7FYrZ6cutTNndlcE4soGyqiLerzs4BZ6ExC-Gy2PR7qMy8C-LIPVlJqFCArT0ixYTTHP_AiHwGky-GID7EFJTRXOwGYP_bsHSd6araaifcWy4ToZsGsY', rating: 4.6 },
  { id: 'new_15', title: 'RDR Mobile', category: 'Adventure', thumbnail: 'https://blogger.googleusercontent.com/img/a/AVvXsEhaXZCCjZBDhDhV8wJmjHi63WvvyPDv62XNIBjsct4tkmOqXHNsTaMoiAtjF-AuvoHwQ02nWWIZzWbk6hxzd1r2DalRAxarE0aDN128q2dtddoJ7QF83uv4Fa204x52xWx1oe54r9Wcc2c31bpfPnnG07UrQwIwk8dCeiRAq9Pr63VmMAwECRkB94PUOzc', rating: 4.8 },
  { id: 'new_16', title: 'GTA 5 Mobile', category: 'Action', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtz8H4QHw9gQGKsLDCqRXwVepv44-M22HIw&s', rating: 4.9 },
  { id: 'new_17', title: 'Euro Truck 2', category: 'Simulation', thumbnail: 'https://i.pinimg.com/564x/32/ae/e5/32aee5919f1c4e81da58627d21b3323a.jpg', rating: 4.5 },
  { id: 'new_18', title: 'FIFA 26 Mobile', category: 'Sports', thumbnail: 'https://i.ibb.co/JWDDTbQV/unnamed-2.png', rating: 4.7 },
  { id: 'new_19', title: 'Hytale Beta', category: 'RPG', thumbnail: 'https://blogger.googleusercontent.com/img/a/AVvXsEiZj_9ZSrEjFbx6E22UMOyF5YErCLl5glSa89w1dYm2M9-qOEeWBeXOL7K0FdqMyWGXjHUL4hdybcU2JjzRsZibaRyxVZT2CDW02ixjuQl2NT7Me_pW28n32vL_nnnuQ1FIaH1CMsB5LsdK3EEaYHy9hvg2C4kLr3u_ZJ6u8p_Pr_lNNLOHUPCI4C1WE6w', rating: 4.6 },
  { id: 'new_20', title: 'Forza Horizon 5', category: 'Racing', thumbnail: 'https://images.seeklogo.com/logo-png/40/1/forza-horizon-5-logo-png_seeklogo-406612.png', rating: 4.9 },
  { id: 'new_21', title: 'Watch Dogs 2', category: 'Action', thumbnail: 'https://images.steamusercontent.com/ugc/180542583658076938/524D520DFF7C6671219DF93F38B195D435B93786/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true', rating: 4.6 },
  { id: 'new_22', title: 'Rooftops & Alleys', category: 'Action', thumbnail: 'https://i.postimg.cc/W1bm7TRt/Fh-T2ixl-Wyl9-TPswg-KLF0j-Pp9j-Nuq.png', rating: 4.4 },
  { id: 'new_23', title: 'The Crew Motorfest', category: 'Racing', thumbnail: 'https://i.postimg.cc/8Pq2KNXW/TCM-KA-low-Rez.jpg', rating: 4.7 },
  { id: 'new_24', title: "Dandy's World", category: 'Horror', thumbnail: 'https://i.ibb.co/9HgJ71zS/MV5-BMTIy-Mz-Zl-N2-Mt-NTUy-Ni00-Nm-Uz-LTlk-YWUt-Mz-Q5-Mz-Yz-Mzk4-M2-Mx-Xk-Ey-Xk-Fqc-Gc-V1.jpg', rating: 4.5 },
  { id: 'new_25', title: 'My Voice Zoo', category: 'App', thumbnail: 'https://i.ibb.co/233hPD5W/my-voice-zoo-icon.jpg', rating: 4.3 },
  { id: 'new_26', title: 'Warzone Mobile', category: 'Action', thumbnail: 'https://i.ibb.co/WNwj1HPt/images-2.jpg', rating: 4.7 },
  { id: 'new_27', title: 'Poppy Playtime 5', category: 'Horror', thumbnail: 'https://i.ibb.co/B5RF6DJm/images-3.jpg', rating: 4.8 },
  { id: 'new_28', title: 'UFC 5 Mobile', category: 'Sports', thumbnail: 'https://i.ibb.co/svv4j5KL/images-4.jpg', rating: 4.5 },
  { id: 'new_29', title: 'Minecraft 2026', category: 'Adventure', thumbnail: 'https://i.ibb.co/HfqCSdw6/images-5.jpg', rating: 4.9 },
  { id: 'new_30', title: 'Brawl Stars Mod', category: 'Action', thumbnail: 'https://i.ibb.co/CpZDGRGm/images-14.jpg', rating: 4.6 },
  { id: 'new_31', title: 'PUBG Mobile Mod', category: 'Action', thumbnail: 'https://i.ibb.co/LD7V2KPB/images-15.jpg', rating: 4.8 },
  { id: 'new_32', title: 'eFootball 2026', category: 'Sports', thumbnail: 'https://i.ibb.co/RG8GRDq0/images-16.jpg', rating: 4.7 },
  { id: 'new_33', title: 'Spotify Premium', category: 'App', thumbnail: 'https://i.ibb.co/jtx8v71/images-17.jpg', rating: 4.9 },
  { id: 'new_34', title: 'FNAF Security', category: 'Horror', thumbnail: 'https://i.ibb.co/fYM7qYxc/Five-Nights-at-Freddy-s-Security-Breach-Group-Wall-Poster-22-375-x-34-d341d39f-2820-4707-8b77-bede42.jpg', rating: 4.5 },
  { id: 'new_35', title: 'Palworld Mobile', category: 'Adventure', thumbnail: 'https://i.ibb.co/WWGm788s/images-18.jpg', rating: 4.8 },
  { id: 'new_36', title: 'Free Fire Max', category: 'Action', thumbnail: 'https://i.ibb.co/Rkzgx50s/images-19.jpg', rating: 4.6 },
  { id: 'new_37', title: 'Dream League', category: 'Sports', thumbnail: 'https://i.ibb.co/VW8Tv5gz/Dream-League-Soccer-2026-Logo.webp', rating: 4.7 },
  { id: 'new_38', title: 'Hello Neighbor', category: 'Horror', thumbnail: 'https://i.ibb.co/fY54dh1q/page-bg-raw.png', rating: 4.5 },
  { id: 'new_39', title: 'Netflix Mod', category: 'App', thumbnail: 'https://i.ibb.co/HT1prWFn/images-20.jpg', rating: 4.8 },
  { id: 'new_40', title: 'Valorant Mobile', category: 'Action', thumbnail: 'https://i.ibb.co/gbbM5YPz/images-21.jpg', rating: 4.9 },
  { id: 'new_41', title: 'Genshin Impact', category: 'RPG', thumbnail: 'https://i.ibb.co/Jw4dcv4f/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.jpg', rating: 4.8 },
  { id: 'new_42', title: '8 Ball Pool Mod', category: 'Sports', thumbnail: 'https://i.ibb.co/PzzFpWgm/images-22.jpg', rating: 4.5 },
  { id: 'new_43', title: 'CapCut Pro', category: 'App', thumbnail: 'https://i.ibb.co/8D1yPw2S/image251014121427bkkzdd.jpg', rating: 4.7 },
  { id: 'new_44', title: 'Identity V', category: 'Horror', thumbnail: 'https://i.ibb.co/dsS7SSxf/776.jpg', rating: 4.6 },
  { id: 'new_45', title: 'Bully AE Mod', category: 'Action', thumbnail: 'https://i.ibb.co/MkXSnjx2/images-23.jpg', rating: 4.8 },
  { id: 'new_46', title: 'Real Racing 3', category: 'Racing', thumbnail: 'https://i.ibb.co/mF1ZgXns/60c7c37e77e9c.png', rating: 4.7 },
  { id: 'new_47', title: 'Kinemaster Pro', category: 'App', thumbnail: 'https://i.ibb.co/zWhkJHMT/07e08269e74446b3557e22a1dbdd8bfd.jpg', rating: 4.6 },
  { id: 'new_48', title: 'Granny 3 Mod', category: 'Horror', thumbnail: 'https://i.ibb.co/209LJpff/1692822931-granny-3.jpg', rating: 4.4 },
  { id: 'new_49', title: 'Hades Mobile', category: 'Action', thumbnail: 'https://i.ibb.co/gZz8QS8D/HADES-DESTACADA.jpg', rating: 4.9 },
  { id: 'new_50', title: 'Shadow Fight 4', category: 'Action', thumbnail: 'https://i.ibb.co/WpDTHHMZ/capsule-616x353.jpg', rating: 4.7 },
  { id: 'new_51', title: 'F1 Mobile Racing', category: 'Sports', thumbnail: 'https://i.ibb.co/zh8b5nNq/images-10.jpg', rating: 4.5 },
  { id: 'new_52', title: 'PicsArt Gold', category: 'App', thumbnail: 'https://cdn.phototourl.com/free/2026-04-06-44b7c5d3-83bd-4eb9-9d77-611817db4f1c.jpg', rating: 4.7 },
  { id: 'new_53', title: 'Hollow Knight', category: 'Action', thumbnail: 'https://cdn.phototourl.com/free/2026-04-06-a28a6d11-7497-4441-a198-16cf9b292795.jpg', rating: 4.9 },
  { id: 'new_54', title: 'Minecraft Dungeons', category: 'Adventure', thumbnail: 'https://cdn.phototourl.com/free/2026-04-06-713e0538-7a96-44b8-94de-cb262a3ea92e.jpg', rating: 4.6 },
  { id: 'new_55', title: 'Animal Company Mods', category: 'Action', thumbnail: 'https://i.ibb.co/Zz2MV0Y1/images-24.jpg', rating: 4.5 },
  { id: 'new_56', title: 'Borderlands Mobile', category: 'Action', thumbnail: 'https://i.postimg.cc/rmNgBwKy/images-(25).jpg', rating: 4.7 },
  { id: 'new_57', title: 'Cooking Clash', category: 'App', thumbnail: 'https://i.postimg.cc/Bbx8Yj6v/header.jpg', rating: 4.4 },
  { id: 'new_58', title: 'FIFA Heroes', category: 'Sports', thumbnail: 'https://i.postimg.cc/rwhDPX8x/images-(26).jpg', rating: 4.5 },
  { id: 'new_59', title: 'Roblox Plus', category: 'App', thumbnail: 'https://i.postimg.cc/mD9hkP7p/roblox-plus-announcement-1.webp', rating: 4.8 },
  { id: 'new_60', title: 'Galvan Ben 10', category: 'Action', thumbnail: 'https://i.postimg.cc/HsdjWsjC/galvan-ben-10-icon-150.png', rating: 4.3 },
  { id: 'new_61', title: 'Halloween', category: 'Horror', thumbnail: 'https://i.postimg.cc/N09jCKCt/Halloween-(2026-video-game)-cover-(style-2).webp', rating: 4.6 },
  { id: 'new_62', title: 'Trees Hate You', category: 'Horror', thumbnail: 'https://i.postimg.cc/qq0B7jJ8/header-(1).jpg', rating: 4.2 }
];

export const CATEGORY_ACCENT: Record<string, string> = {
  'Action': '#ff4747', 
  'RPG': '#a855f7', 
  'Strategy': '#3b82f6', 
  'Adventure': '#22c55e',
  'Simulation': '#eab308', 
  'Horror': '#ef4444', 
  'Casual': '#ec4899', 
  'Visual Novel': '#d946ef',
  'Puzzle': '#06b6d4', 
  'Arcade': '#f97316', 
  'Pixel': '#8b5cf6', 
  'Racing': '#fb923c', 
  'Sports': '#34d399', 
  'App': '#60a5fa', 
  'Tool': '#a78bfa'
};

export const NAMES = [
  "John_Smith", "Mike", "Sarah_Wilson", "Chris_Davis", "Emma_Miller", 
  "David_Brown", "Jessica_Taylor", "Robert_Williams", "Lisa_Anderson", "James_Thomas"
];

export const MESSAGES = [
  "Got all Games Working Thank You", "Received instantly!", "I got it !", 
  "Unlocked successfully!", "Working perfectly!", "Acquired in game!", 
  "Game 100% working!"
];

export const GAME_DESCRIPTIONS: Record<string, string> = {
  'Simulation': 'Experience ultra-realistic gameplay mechanics, custom environment modifiers, and unlimited resources simulation built specifically for enthusiasts.',
  'Action': 'Fast-paced, high-octane gameplay with enhanced performance multipliers, fully unlocked skins, dynamic controls, and superior frame rates.',
  'Horror': 'Immerse yourself in chilling atmosphere, detailed shadows, full chapter access, and customizable gameplay helpers to survive the darkness.',
  'Puzzle': 'Engage your mind with beautifully rendered logic systems, unlocked bonus stages, hints engine, and full premium levels ready to explore.',
  'Pixel': 'Retro gaming redefined with high performance custom optimizations, nostalgic styling, clean scaling modes, and unlimited inventory options.',
  'Adventure': 'Explore vast, open-world environments with unlocked fast-travel options, unique visual styles, high resolution, and maximum dynamic range.',
  'Racing': 'Tear through absolute boundaries in modified ultra-performance supersport cars, custom paint works, infinite nitrous oxide, and physics modeling.',
  'Sports': 'Play premium sports simulations with unlocked draft cards, legendary sports stars available dynamically, maximum stat points, and smooth gameplay flow.',
  'App': 'Enhanced system utility with unlocked premium attributes, zero advertisements, dynamic audio filters, and advanced rendering modes.',
  'Tool': 'Advanced execution terminal with multi-tier processing power, secure script injections, and highly customizable UI templates.'
};
