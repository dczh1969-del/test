import React from 'react';
import { StreamHubLogo } from './StreamHubLogo';
import { CATEGORIES, USER_PROFILE } from '../data/mockData';

interface HeaderProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#131313]/90 backdrop-blur-xl border-b border-[#201f1f]/50 pt-safe">
      <div className="h-28 flex flex-col justify-between px-3 max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        {/* Top Bar */}
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectCategory('All')}>
            <StreamHubLogo size="md" />
            <span className="font-['Outfit'] text-[18px] text-[#e5e2e1] font-bold tracking-tight ml-0.5">
              StreamHub
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#201f1f] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            <button
              onClick={onOpenProfile}
              aria-label="User profile"
              className="w-11 h-11 flex items-center justify-center rounded-full active:scale-95 transition-all p-0.5 group"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#ff9900]/40 group-hover:ring-[#ff9900] transition-all">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src={USER_PROFILE.avatarUrl}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Category Pills Scroller */}
        <div className="h-12 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`shrink-0 h-8 px-3.5 rounded-full font-['Inter'] text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#ff9900] text-[#4a2800] font-bold shadow-sm shadow-[#ff9900]/20'
                    : 'bg-[#2a2a2a] text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#353534]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
