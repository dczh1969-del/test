import React from 'react';
import { Video, Creator } from '../types';
import { CREATORS, TRENDING_VIDEOS, FEATURED_HERO_VIDEO } from '../data/mockData';

interface SubscriptionsScreenProps {
  onSelectVideo: (video: Video) => void;
  subscribedCreatorIds: Set<string>;
  onToggleSubscribe: (creator: Creator) => void;
}

export const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = ({
  onSelectVideo,
  subscribedCreatorIds,
  onToggleSubscribe,
}) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#131313] text-[#e5e2e1] pb-24 pt-4 px-3 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      {/* Top Title */}
      <div className="flex items-center justify-between py-2 border-b border-[#201f1f]">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#ff9900] text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            video_library
          </span>
          <h1 className="font-['Outfit'] text-[22px] font-bold text-[#e5e2e1] tracking-tight">
            Subscriptions
          </h1>
        </div>
        <span className="text-[12px] font-['Inter'] text-[#ffc082] font-semibold bg-[#ff9900]/15 px-2.5 py-1 rounded-full">
          {subscribedCreatorIds.size} Following
        </span>
      </div>

      {/* Story-style Live Channels Avatars Bar */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-3 border-b border-[#201f1f]/60 -mx-3 px-3">
        {CREATORS.map((creator) => {
          const isFollowed = subscribedCreatorIds.has(creator.id);
          return (
            <div
              key={creator.id}
              onClick={() => onToggleSubscribe(creator)}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
            >
              <div
                className={`relative w-14 h-14 rounded-full p-0.5 transition-transform group-hover:scale-105 ${
                  creator.isLive
                    ? 'ring-2 ring-red-500 animate-pulse'
                    : isFollowed
                    ? 'ring-2 ring-[#ff9900]'
                    : 'ring-1 ring-[#353534]'
                }`}
              >
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-full h-full rounded-full object-cover"
                />
                {creator.isLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.2 bg-red-600 text-[8px] font-black rounded text-white uppercase tracking-tighter">
                    LIVE
                  </span>
                )}
              </div>
              <span className="text-[11px] font-['Inter'] text-[#e5e2e1] max-w-[60px] truncate text-center mt-1">
                {creator.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Feed Filter */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">
          Recent Uploads
        </span>
        <span className="text-[12px] text-[#dbc2ad]">Today</span>
      </div>

      {/* Stream / Uploads List */}
      <div className="flex flex-col gap-4">
        {[FEATURED_HERO_VIDEO, ...TRENDING_VIDEOS].map((vid) => (
          <article
            key={vid.id}
            onClick={() => onSelectVideo(vid)}
            className="flex flex-col bg-[#201f1f] rounded-xl overflow-hidden border border-[#2a2a2a] cursor-pointer group hover:border-[#ff9900]/50 transition-all"
          >
            <div className="relative aspect-video w-full bg-[#0e0e0e] overflow-hidden">
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#0e0e0e]/90 text-[10px] font-bold rounded">
                {vid.duration}
              </span>
              {vid.isPremiere && (
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#ff9900] text-[#4a2800] text-[10px] font-bold rounded">
                  NEW REPLAY
                </span>
              )}
            </div>

            <div className="p-3 flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-[#ff9900]/30">
                <img
                  src={vid.creatorAvatar}
                  alt={vid.creator}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-['Outfit'] text-[15px] font-bold text-[#e5e2e1] line-clamp-2 leading-snug group-hover:text-[#ffc082] transition-colors">
                  {vid.title}
                </h3>
                <p className="font-['Inter'] text-[12px] text-[#dbc2ad] mt-1">
                  {vid.creator} • {vid.views} • {vid.uploadDate}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
