import React from 'react';
import { Video } from '../types';

interface MiniPlayerProps {
  video: Video | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExpand: () => void;
  onClose: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  video,
  isPlaying,
  onTogglePlay,
  onExpand,
  onClose,
}) => {
  if (!video) return null;

  return (
    <div
      onClick={onExpand}
      className="fixed bottom-16 inset-x-2 z-40 max-w-md mx-auto sm:max-w-xl md:max-w-2xl bg-[#201f1f] border border-[#2a2a2a] rounded-xl p-2 flex items-center justify-between shadow-2xl backdrop-blur-xl cursor-pointer hover:border-[#ff9900]/40 transition-all"
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="relative w-16 aspect-video rounded-md overflow-hidden bg-[#0e0e0e] shrink-0">
          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#ff9900] rounded-full animate-ping" />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-['Outfit'] text-xs font-bold text-[#e5e2e1] truncate">
            {video.title}
          </span>
          <span className="text-[10px] text-[#dbc2ad] truncate">{video.creator}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#ff9900] hover:bg-[#2a2a2a] active:scale-95"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#2a2a2a]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
