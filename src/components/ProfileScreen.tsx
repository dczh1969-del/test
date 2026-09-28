import React, { useState } from 'react';
import { USER_PROFILE, FEATURED_HERO_VIDEO, TRENDING_VIDEOS } from '../data/mockData';
import { Video } from '../types';

interface ProfileScreenProps {
  onSelectVideo: (video: Video) => void;
  onShowToast: (message: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSelectVideo, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'settings'>('history');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#131313] text-[#e5e2e1] pb-24 pt-4 px-3 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      {/* Profile Header Banner */}
      <div className="p-4 bg-[#201f1f] rounded-2xl border border-[#2a2a2a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff9900]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#ff9900]">
            <img
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] text-[20px] font-bold text-[#e5e2e1]">
                {USER_PROFILE.name}
              </h1>
              <span className="text-[10px] font-black bg-[#ff9900] text-[#4a2800] px-1.5 py-0.2 rounded font-['Inter']">
                {USER_PROFILE.badge}
              </span>
            </div>
            <span className="text-[12px] font-['Inter'] text-[#dbc2ad]">
              {USER_PROFILE.handle}
            </span>
            <span className="text-[11px] text-[#ffc082] mt-0.5 font-medium">
              Member since 2024 • Tier 3 Supporter
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#2a2a2a]">
          <div className="flex flex-col items-center">
            <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">
              {USER_PROFILE.subscribers}
            </span>
            <span className="text-[10px] text-[#dbc2ad]">Subscribers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">
              {USER_PROFILE.following}
            </span>
            <span className="text-[10px] text-[#dbc2ad]">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-['Outfit'] text-[16px] font-bold text-[#ff9900]">
              {USER_PROFILE.watchHistoryCount}
            </span>
            <span className="text-[10px] text-[#dbc2ad]">Watched</span>
          </div>
        </div>
      </div>

      {/* Streamer Studio Quick Action */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#ff9900]/20 to-[#e89701]/10 rounded-xl border border-[#ff9900]/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#ff9900] text-[#4a2800] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">videocam</span>
          </div>
          <div>
            <div className="font-['Outfit'] text-[14px] font-bold text-[#e5e2e1]">
              Streamer Studio
            </div>
            <div className="text-[11px] text-[#dbc2ad]">
              Manage broadcasts & Live chat
            </div>
          </div>
        </div>
        <button
          onClick={() => onShowToast('Broadcasting dashboard ready!')}
          className="px-3 py-1.5 rounded-full bg-[#ff9900] text-[#4a2800] font-['Inter'] text-[11px] font-bold shadow-sm"
        >
          Go Live
        </button>
      </div>

      {/* Profile Segmented Tabs */}
      <div className="flex items-center gap-2 mt-5 border-b border-[#201f1f] pb-2">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-['Inter'] font-semibold transition-colors ${
            activeTab === 'history'
              ? 'bg-[#2a2a2a] text-[#ff9900]'
              : 'text-[#dbc2ad] hover:text-[#e5e2e1]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          History
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-['Inter'] font-semibold transition-colors ${
            activeTab === 'saved'
              ? 'bg-[#2a2a2a] text-[#ff9900]'
              : 'text-[#dbc2ad] hover:text-[#e5e2e1]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">bookmark</span>
          Saved
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-['Inter'] font-semibold transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#2a2a2a] text-[#ff9900]'
              : 'text-[#dbc2ad] hover:text-[#e5e2e1]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-3 flex flex-col gap-2.5">
        {activeTab === 'history' && (
          <>
            <span className="text-[12px] text-[#dbc2ad] font-medium">Recent Watch History</span>
            {[FEATURED_HERO_VIDEO, ...TRENDING_VIDEOS.slice(0, 2)].map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className="flex items-center gap-3 p-2 bg-[#201f1f] rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer border border-[#2a2a2a]"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e0e]">
                  <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0e0e0e]/90 text-[10px] font-bold rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-['Outfit'] text-[13px] font-bold text-[#e5e2e1] truncate">
                    {v.title}
                  </span>
                  <span className="text-[11px] text-[#dbc2ad] mt-0.5">{v.creator}</span>
                  <span className="text-[10px] text-[#a38d7a] mt-1">Watched yesterday</span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'saved' && (
          <>
            <span className="text-[12px] text-[#dbc2ad] font-medium">Watch Later & Favorites</span>
            {[TRENDING_VIDEOS[2], TRENDING_VIDEOS[3]].map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className="flex items-center gap-3 p-2 bg-[#201f1f] rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer border border-[#2a2a2a]"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e0e]">
                  <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0e0e0e]/90 text-[10px] font-bold rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-['Outfit'] text-[13px] font-bold text-[#e5e2e1] truncate">
                    {v.title}
                  </span>
                  <span className="text-[11px] text-[#dbc2ad] mt-0.5">{v.creator}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'settings' && (
          <div className="flex flex-col gap-2 bg-[#201f1f] p-3 rounded-xl border border-[#2a2a2a]">
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <span className="text-[13px] text-[#e5e2e1]">Default Playback Quality</span>
              <span className="text-[12px] text-[#ff9900] font-bold">1080p HD</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <span className="text-[13px] text-[#e5e2e1]">Audio High Fidelity (320kbps)</span>
              <span className="text-[12px] text-[#ff9900] font-bold">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[13px] text-[#e5e2e1]">Stream Notifications</span>
              <span className="text-[12px] text-[#ff9900] font-bold">All</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
