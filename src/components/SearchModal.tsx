import React, { useState } from 'react';
import { Video } from '../types';
import { FEATURED_HERO_VIDEO, TRENDING_VIDEOS, MOST_VIEWED_TODAY, NEXT_UP_VIDEOS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideo: (video: Video) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectVideo }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const allVideos: Video[] = [
    FEATURED_HERO_VIDEO,
    ...TRENDING_VIDEOS,
    ...MOST_VIEWED_TODAY,
    ...NEXT_UP_VIDEOS,
  ];

  const results = query.trim()
    ? allVideos.filter(
        (v) =>
          v.title.toLowerCase().includes(query.toLowerCase()) ||
          v.creator.toLowerCase().includes(query.toLowerCase()) ||
          v.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularTags = ['Cyberpunk', 'Lo-Fi', 'Keyboards', 'Tokyo 4K', 'Espresso', 'Vulkan', 'Synthesizer'];

  return (
    <div className="fixed inset-0 z-50 bg-[#131313]/95 backdrop-blur-md flex flex-col pt-safe px-3">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 py-3 border-b border-[#2a2a2a] max-w-md mx-auto w-full sm:max-w-xl">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1]"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, creators, tags..."
            autoFocus
            className="w-full bg-[#201f1f] text-[#e5e2e1] placeholder-[#a38d7a] rounded-full px-4 py-2.5 text-sm outline-none border border-[#2a2a2a] focus:border-[#ff9900]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-[#dbc2ad] hover:text-[#e5e2e1]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Tags */}
      <div className="max-w-md mx-auto w-full sm:max-w-xl py-3">
        <div className="text-[11px] font-['Inter'] font-semibold text-[#a38d7a] uppercase tracking-wider mb-2">
          Trending Searches
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 bg-[#201f1f] hover:bg-[#2a2a2a] text-[#dbc2ad] hover:text-[#ff9900] text-xs rounded-full border border-[#2a2a2a] transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div className="max-w-md mx-auto w-full sm:max-w-xl flex-1 overflow-y-auto no-scrollbar pb-10 space-y-2 mt-2">
        {query.trim() && results.length === 0 && (
          <div className="text-center py-12 text-[#dbc2ad] text-sm">
            No matching streams or videos found for "{query}".
          </div>
        )}

        {results.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              onSelectVideo(video);
              onClose();
            }}
            className="flex items-center gap-3 p-2 bg-[#201f1f] hover:bg-[#2a2a2a] rounded-xl cursor-pointer border border-[#2a2a2a] transition-all group"
          >
            <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e0e]">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0e0e0e]/90 text-[10px] font-bold rounded">
                {video.duration}
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-['Outfit'] text-[13px] font-bold text-[#e5e2e1] truncate group-hover:text-[#ffc082]">
                {video.title}
              </h4>
              <p className="text-[11px] text-[#dbc2ad] mt-0.5">{video.creator}</p>
              <span className="text-[10px] text-[#a38d7a]">{video.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
