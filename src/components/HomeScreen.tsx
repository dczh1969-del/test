import React, { useState } from 'react';
import { Video, Creator } from '../types';
import {
  FEATURED_HERO_VIDEO,
  TRENDING_VIDEOS,
  CREATORS,
  MOST_VIEWED_TODAY,
} from '../data/mockData';

interface HomeScreenProps {
  onSelectVideo: (video: Video) => void;
  onNavigateTab: (tab: 'home' | 'trending' | 'subscriptions' | 'profile') => void;
  subscribedCreatorIds: Set<string>;
  onToggleSubscribe: (creator: Creator) => void;
  onShowToast: (message: string) => void;
  filterCategory: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectVideo,
  onNavigateTab,
  subscribedCreatorIds,
  onToggleSubscribe,
  onShowToast,
  filterCategory,
}) => {
  const [autoPlayPreview, setAutoPlayPreview] = useState(true);
  const [activeMenuVideoId, setActiveMenuVideoId] = useState<string | null>(null);

  // Filter trending videos based on category if not 'All'
  const filteredTrending = filterCategory === 'All'
    ? TRENDING_VIDEOS
    : TRENDING_VIDEOS.filter(
        (v) =>
          v.category.toLowerCase() === filterCategory.toLowerCase() ||
          filterCategory === 'Trending' ||
          filterCategory === 'Top Rated'
      );

  const handleHeroMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuVideoId(activeMenuVideoId === 'hero' ? null : 'hero');
  };

  return (
    <div className="flex flex-col w-full pb-24 pt-28 max-w-md mx-auto sm:max-w-xl md:max-w-2xl bg-[#131313]">
      <div className="flex flex-col w-full space-y-6">
        
        {/* Live Pulse Alert Strip */}
        <section className="px-3">
          <div
            onClick={() => onSelectVideo(FEATURED_HERO_VIDEO)}
            className="flex items-center justify-between px-3 py-2 bg-[#1c1b1b] hover:bg-[#201f1f] rounded-xl cursor-pointer transition-colors border border-[#2a2a2a]/50"
          >
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9900] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff9900]"></span>
              </span>
              <span className="font-['Inter'] text-[11px] font-bold text-[#e5e2e1] uppercase tracking-wider">
                Live Arena
              </span>
              <span className="text-[#dbc2ad] font-['Inter'] text-[12px] truncate max-w-[170px] sm:max-w-xs">
                • Neon Championship Semi-Finals
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectVideo(FEATURED_HERO_VIDEO);
              }}
              className="flex items-center text-[#ffc082] hover:text-[#ff9900] font-['Inter'] text-[11px] font-semibold active:opacity-70 transition-opacity"
            >
              Watch
              <span className="material-symbols-outlined text-[16px] ml-0.5">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Featured Video Hero Card */}
        <section className="px-3">
          <div
            onClick={() => onSelectVideo(FEATURED_HERO_VIDEO)}
            className="group relative flex flex-col bg-[#201f1f] rounded-xl overflow-hidden shadow-lg transition-transform active:scale-[0.99] cursor-pointer border border-[#2a2a2a]"
          >
            {/* 16:9 Thumbnail Box */}
            <div className="relative w-full aspect-video bg-[#0e0e0e] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={FEATURED_HERO_VIDEO.title}
                src={FEATURED_HERO_VIDEO.thumbnailUrl}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/30"></div>

              {/* Top Media Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-[#0e0e0e]/90 backdrop-blur-md rounded text-[#ff9900] font-['Inter'] text-[10px] font-black uppercase tracking-wider">
                  HD
                </span>
                <span className="px-1.5 py-0.5 bg-[#ff9900]/95 backdrop-blur-md rounded text-[#4a2800] font-['Inter'] text-[10px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_fire_department
                  </span>
                  PREMIERE
                </span>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-[#0e0e0e]/90 backdrop-blur-md rounded text-[#e5e2e1] font-['Inter'] text-[10px] tracking-wider font-bold">
                {FEATURED_HERO_VIDEO.duration}
              </div>
            </div>

            {/* Hero Video Details */}
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2 relative">
                <h2 className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1] line-clamp-2 leading-tight group-hover:text-[#ffc082] transition-colors">
                  {FEATURED_HERO_VIDEO.title}
                </h2>
                <button
                  onClick={handleHeroMore}
                  aria-label="More options"
                  className="shrink-0 p-1 text-[#dbc2ad] hover:text-[#e5e2e1] rounded-full active:bg-[#353534] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>

                {/* Dropdown Menu */}
                {activeMenuVideoId === 'hero' && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-8 z-30 w-48 bg-[#2a2a2a] border border-[#353534] rounded-xl shadow-xl py-1 text-xs"
                  >
                    <button
                      onClick={() => {
                        onShowToast('Saved to Watch Later');
                        setActiveMenuVideoId(null);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#353534] text-left text-[#e5e2e1]"
                    >
                      <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                      Save to Watch Later
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText?.(window.location.href);
                        onShowToast('Link copied to clipboard!');
                        setActiveMenuVideoId(null);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#353534] text-left text-[#e5e2e1]"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                      Share Video
                    </button>
                    <button
                      onClick={() => {
                        onShowToast('Recommendation marked as not interested');
                        setActiveMenuVideoId(null);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#353534] text-left text-[#dbc2ad]"
                    >
                      <span className="material-symbols-outlined text-[16px]">do_not_disturb</span>
                      Not Interested
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-0.5">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#353534] ring-1 ring-[#ff9900]/30">
                    <img
                      className="w-full h-full object-cover"
                      alt={FEATURED_HERO_VIDEO.creator}
                      src={FEATURED_HERO_VIDEO.creatorAvatar}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-['Inter'] text-[12px] text-[#e5e2e1] font-medium">
                      {FEATURED_HERO_VIDEO.creator}
                    </span>
                    <span
                      className="material-symbols-outlined text-[#ff9900] text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[#dbc2ad] font-['Inter'] text-[12px]">
                  <span>{FEATURED_HERO_VIDEO.views}</span>
                  <span>•</span>
                  <span className="inline-flex items-center text-[#ff9900] font-medium">
                    <span
                      className="material-symbols-outlined text-[13px] mr-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      thumb_up
                    </span>
                    {FEATURED_HERO_VIDEO.ratingPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="flex flex-col space-y-3">
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#ff9900] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                trending_up
              </span>
              <h3 className="font-['Outfit'] text-[18px] text-[#e5e2e1] font-bold tracking-tight">
                Trending Now
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('trending')}
              className="flex items-center text-[#ffc082] hover:text-[#ff9900] font-['Inter'] text-[12px] font-medium active:opacity-75 transition-opacity"
            >
              See All
              <span className="material-symbols-outlined text-[16px] ml-0.5">chevron_right</span>
            </button>
          </div>

          {/* 2-Column Video Grid */}
          <div className="grid grid-cols-2 gap-3 px-3">
            {filteredTrending.map((video) => (
              <article
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="flex flex-col bg-[#201f1f] rounded-lg overflow-hidden group active:scale-[0.98] transition-transform cursor-pointer border border-[#2a2a2a]/60 hover:border-[#ff9900]/40"
              >
                <div className="relative aspect-video w-full bg-[#0e0e0e] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={video.title}
                    src={video.thumbnailUrl}
                    loading="lazy"
                  />
                  {video.badge && (
                    <span className="absolute top-1.5 left-1.5 px-1 py-0.2 bg-[#0e0e0e]/90 backdrop-blur-sm rounded text-[#ff9900] font-['Inter'] text-[10px] font-extrabold uppercase">
                      {video.badge}
                    </span>
                  )}
                  <span className="absolute bottom-1.5 right-1.5 px-1 py-0.2 bg-[#0e0e0e]/90 backdrop-blur-sm rounded text-[#e5e2e1] font-['Inter'] text-[10px] font-semibold">
                    {video.duration}
                  </span>
                </div>
                <div className="p-2 flex flex-col justify-between flex-1">
                  <h4 className="font-['Inter'] text-[13px] font-semibold text-[#e5e2e1] line-clamp-2 leading-snug group-hover:text-[#ffc082] transition-colors">
                    {video.title}
                  </h4>
                  <div className="mt-2 pt-1 border-t border-[#2a2a2a]/40">
                    <p className="font-['Inter'] text-[12px] text-[#dbc2ad] truncate font-medium">
                      {video.creator}
                    </p>
                    <div className="flex items-center justify-between mt-0.5 text-[#dbc2ad] font-['Inter'] text-[10px]">
                      <span>{video.views}</span>
                      <span className="text-[#ff9900] font-bold">
                        {video.ratingPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recommended Creators Carousel */}
        <section className="flex flex-col space-y-3">
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#ffc082] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <h3 className="font-['Outfit'] text-[18px] text-[#e5e2e1] font-bold tracking-tight">
                Recommended Creators
              </h3>
            </div>
            <span className="text-[#dbc2ad] font-['Inter'] text-[12px]">Curated for you</span>
          </div>

          {/* Horizontal Scroll Row */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-3 pb-1 -mx-0">
            {CREATORS.map((creator) => {
              const isSubscribed = subscribedCreatorIds.has(creator.id);
              return (
                <div
                  key={creator.id}
                  className="shrink-0 w-36 p-3 bg-[#201f1f] rounded-xl flex flex-col items-center text-center shadow-sm border border-[#2a2a2a]"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#ff9900] to-[#e89701]">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt={creator.name}
                      src={creator.avatarUrl}
                    />
                    {creator.isLive && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#131313]" title="Live Now" />
                    )}
                  </div>
                  <span className="font-['Inter'] text-[12px] text-[#e5e2e1] font-semibold truncate w-full mt-2">
                    {creator.name}
                  </span>
                  <span className="font-['Inter'] text-[10px] text-[#dbc2ad]">
                    {creator.subscribers}
                  </span>
                  <button
                    onClick={() => onToggleSubscribe(creator)}
                    className={`mt-3 w-full py-1.5 px-2 active:scale-95 font-['Inter'] text-[11px] rounded-full transition-all ${
                      isSubscribed
                        ? 'bg-[#353534] text-[#dbc2ad] font-semibold'
                        : 'bg-[#ff9900] hover:bg-[#e89701] text-[#4a2800] font-bold shadow-sm shadow-[#ff9900]/20'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Most Viewed Today (Ranked List) */}
        <section className="flex flex-col space-y-3 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#ff9900] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                leaderboard
              </span>
              <h3 className="font-['Outfit'] text-[18px] text-[#e5e2e1] font-bold tracking-tight">
                Most Viewed Today
              </h3>
            </div>
            <span className="font-['Inter'] text-[10px] text-[#dbc2ad] uppercase tracking-widest bg-[#2a2a2a] px-2 py-0.5 rounded font-bold">
              REALTIME
            </span>
          </div>

          <div className="flex flex-col space-y-2.5">
            {MOST_VIEWED_TODAY.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => onSelectVideo(item)}
                className="flex items-center gap-3 p-2 bg-[#201f1f] rounded-xl active:bg-[#2a2a2a] hover:bg-[#201f1f]/80 transition-colors cursor-pointer border border-[#2a2a2a]/60 group"
              >
                <span
                  className={`font-['Outfit'] text-[36px] font-black w-8 text-center shrink-0 italic leading-none ${
                    idx === 0
                      ? 'text-[#ff9900]'
                      : idx === 1
                      ? 'text-[#dbc2ad] opacity-80'
                      : 'text-[#dbc2ad] opacity-50'
                  }`}
                >
                  {item.rank}
                </span>

                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e0e]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.title}
                    src={item.thumbnailUrl}
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0e0e0e]/90 rounded text-[#e5e2e1] font-['Inter'] text-[10px] font-semibold">
                    {item.duration}
                  </span>
                </div>

                <div className="flex flex-col justify-center min-w-0 flex-1 pr-1">
                  <h4 className="font-['Inter'] text-[13px] text-[#e5e2e1] font-semibold truncate leading-tight group-hover:text-[#ffc082] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-['Inter'] text-[12px] text-[#dbc2ad] mt-0.5">
                    {item.creator}
                  </p>
                  <div className="flex items-center gap-2 mt-1 font-['Inter'] text-[10px] text-[#dbc2ad]">
                    <span>{item.views}</span>
                    <span>•</span>
                    <span className="text-[#ff9900] font-bold">
                      {item.ratingPercentage}%
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Feed Bottom Micro-Bar: Auto-Play Preview */}
        <section className="px-3 pt-2">
          <div className="p-3 bg-[#1c1b1b] rounded-2xl flex items-center justify-between border border-[#2a2a2a]/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#ff9900]/20 flex items-center justify-center text-[#ffc082]">
                <span className="material-symbols-outlined text-[22px]">smart_display</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[12px] text-[#e5e2e1] font-bold">
                  Auto-Play Preview
                </span>
                <span className="font-['Inter'] text-[12px] text-[#dbc2ad]">
                  {autoPlayPreview ? 'Muted over Wi-Fi' : 'Disabled'}
                </span>
              </div>
            </div>

            <button
              aria-label="Toggle preview auto-play"
              onClick={() => {
                const nextState = !autoPlayPreview;
                setAutoPlayPreview(nextState);
                onShowToast(nextState ? 'Auto-play preview enabled' : 'Auto-play preview disabled');
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                autoPlayPreview ? 'bg-[#ff9900]' : 'bg-[#353534]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full shadow-sm transform transition-transform ${
                  autoPlayPreview
                    ? 'translate-x-5 bg-[#4a2800]'
                    : 'translate-x-0 bg-[#dbc2ad]'
                }`}
              />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
