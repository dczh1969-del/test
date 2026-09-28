import React, { useState } from 'react';
import { Video } from '../types';
import { TRENDING_VIDEOS, MOST_VIEWED_TODAY, FEATURED_HERO_VIDEO } from '../data/mockData';

interface TrendingScreenProps {
  onSelectVideo: (video: Video) => void;
  onOpenSearch: () => void;
}

export const TrendingScreen: React.FC<TrendingScreenProps> = ({ onSelectVideo, onOpenSearch }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Gaming' | 'Tech' | 'Music' | 'IRL'>('All');

  const allTrendingList = [FEATURED_HERO_VIDEO, ...TRENDING_VIDEOS, ...MOST_VIEWED_TODAY];

  const filtered = activeFilter === 'All'
    ? allTrendingList
    : allTrendingList.filter(
        (v) => v.category.toLowerCase() === activeFilter.toLowerCase()
      );

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#131313] text-[#e5e2e1] pb-24 pt-4 px-3 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#201f1f]">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#ff9900] text-[26px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <h1 className="font-['Outfit'] text-[22px] font-bold text-[#e5e2e1] tracking-tight">
            Trending Hub
          </h1>
        </div>
        <button
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full bg-[#201f1f] flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1]"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
        {(['All', 'Gaming', 'Tech', 'Music', 'IRL'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-['Inter'] font-semibold transition-all ${
              activeFilter === cat
                ? 'bg-[#ff9900] text-[#4a2800] shadow-sm shadow-[#ff9900]/20'
                : 'bg-[#201f1f] text-[#dbc2ad] hover:bg-[#2a2a2a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ranked Video Feed */}
      <div className="flex flex-col gap-3 mt-1">
        {filtered.map((vid, index) => (
          <div
            key={`${vid.id}-${index}`}
            onClick={() => onSelectVideo(vid)}
            className="flex items-center gap-3 p-2.5 bg-[#201f1f] rounded-xl hover:bg-[#2a2a2a] transition-all cursor-pointer border border-[#2a2a2a] group"
          >
            <span
              className={`font-['Outfit'] text-[24px] font-black w-6 text-center italic ${
                index === 0
                  ? 'text-[#ff9900]'
                  : index === 1
                  ? 'text-[#ffb95a]'
                  : index === 2
                  ? 'text-[#ffc082]'
                  : 'text-[#a38d7a]'
              }`}
            >
              #{index + 1}
            </span>

            <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-[#0e0e0e] shrink-0">
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0e0e0e]/90 text-[10px] font-bold rounded">
                {vid.duration}
              </span>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="font-['Outfit'] text-[14px] font-bold text-[#e5e2e1] line-clamp-2 leading-snug group-hover:text-[#ffc082] transition-colors">
                {vid.title}
              </h3>
              <p className="font-['Inter'] text-[12px] text-[#dbc2ad] mt-1 truncate">
                {vid.creator}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#a38d7a]">
                <span>{vid.views}</span>
                <span>•</span>
                <span className="text-[#ff9900] font-semibold">{vid.ratingPercentage}% liked</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
