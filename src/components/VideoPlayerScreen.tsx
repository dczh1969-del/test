import React, { useState, useEffect, useRef } from 'react';
import { Video, Creator } from '../types';
import { StreamHubLogo } from './StreamHubLogo';
import { NEXT_UP_VIDEOS, USER_PROFILE } from '../data/mockData';

interface VideoPlayerScreenProps {
  video: Video;
  onBack: () => void;
  onSelectVideo: (video: Video) => void;
  subscribedCreatorIds: Set<string>;
  onToggleSubscribe: (creator: Creator) => void;
  onShowToast: (message: string) => void;
  onOpenSuperChat: () => void;
  onOpenComments: () => void;
  onOpenShare: () => void;
  onOpenQuality: () => void;
  currentQuality: string;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  video,
  onBack,
  onSelectVideo,
  subscribedCreatorIds,
  onToggleSubscribe,
  onShowToast,
  onOpenSuperChat,
  onOpenComments,
  onOpenShare,
  onOpenQuality,
  currentQuality,
}) => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(860); // 14:20 default
  const totalDurationSec = video.durationSeconds || 1725;
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [bellActive, setBellActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrubTrackRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Playback timer ticker when active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return totalDurationSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalDurationSec]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTimeSec / totalDurationSec) * 100));

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubTrackRef.current) return;
    const rect = scrubTrackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newPercent = clickX / rect.width;
    const newSec = Math.floor(newPercent * totalDurationSec);
    setCurrentTimeSec(newSec);
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleSeekToChapter = (seconds: number) => {
    setCurrentTimeSec(seconds);
    setIsPlaying(true);
    onShowToast(`Jumped to ${formatTime(seconds)}`);
  };

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      onShowToast('Removed like');
    } else {
      setIsLiked(true);
      setIsDisliked(false);
      onShowToast('Liked video');
    }
  };

  const handleToggleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
      onShowToast('Disliked video');
    }
  };

  const isSubscribed = subscribedCreatorIds.has(video.id) || subscribedCreatorIds.has('neon-gamer');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#131313] text-[#e5e2e1] pb-16 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#131313]/95 backdrop-blur-xl border-b border-[#201f1f]/60 pt-safe">
        <div className="h-16 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#e5e2e1] active:bg-[#201f1f] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={onBack}>
              <StreamHubLogo size="sm" />
              <h1 className="font-['Outfit'] text-[16px] text-[#e5e2e1] font-bold tracking-tight truncate max-w-[150px] sm:max-w-[200px]">
                Video Player
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenShare}
              aria-label="Share"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#201f1f] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
            <button
              aria-label="User profile"
              className="w-11 h-11 flex items-center justify-center rounded-full active:scale-95 transition-all p-0.5"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#ff9900]/40"
                src={USER_PROFILE.avatarUrl}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Video Player */}
      <div
        ref={playerContainerRef}
        className="relative w-full aspect-video bg-[#0e0e0e] overflow-hidden select-none group"
        onClick={() => setShowControls(!showControls)}
      >
        {/* Video Backing Scene */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: `url('${
              video.thumbnailUrl ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBH5OY1cGuGrAFDko8gTq0XLkFgjLZCfFw9Q8yEDZCXNKCjlipYKYL1w2ZjkwYOXL-wZEKZVXqkbjax1bSrVSDD3SrL4sszwE2Bc1P-Z02DiMF7wXzpbYg1CWH4hP_PcwKtSgvKtA_jhqnC3qmoIMsMrY-RNSyYF3PnOb_kHeScJ2bDDxKjC6021ywZugHaCvWmt7J_qukP288PuNlk026LUAidAJR2OvIRQiaaYBm2NS3_tfj1PFHSgA'
            }')`,
          }}
        >
          {/* Subtle animated ambient overlay when playing */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff9900]/5 to-transparent pointer-events-none animate-pulse" />
          )}
        </div>

        {/* Gradient Scrim for Top & Bottom Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/70 pointer-events-none" />

        {/* Closed Captions Preview */}
        {showCaptions && isPlaying && (
          <div className="absolute bottom-14 inset-x-4 text-center pointer-events-none z-10">
            <span className="bg-black/85 text-[#e5e2e1] px-2.5 py-1 rounded text-xs font-['Inter'] shadow-md">
              [Music playing: Cyberpunk 2077 - Rebel Path]
            </span>
          </div>
        )}

        {/* Top Player Controls Bar */}
        <div className="absolute top-0 inset-x-0 p-2 flex items-center justify-between text-[#e5e2e1] z-20">
          <div className="flex items-center gap-1.5 bg-[#0e0e0e]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-[15px] text-[#ff9900] animate-pulse">
              radio_button_checked
            </span>
            <span className="font-['Inter'] text-[10px] text-[#e5e2e1] uppercase tracking-wider font-bold">
              LIVE REPLAY
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quality selector pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuality();
              }}
              aria-label="Resolution selector"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md active:scale-95 transition-all text-[#e5e2e1] border border-white/10"
            >
              <span className="font-['Inter'] text-[10px] font-bold text-[#ffc082]">
                {currentQuality}
              </span>
              <span className="font-['Inter'] text-[9px] px-1 rounded bg-[#ff9900] text-[#4a2800] font-black">
                HD
              </span>
            </button>

            {/* Mute toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
                onShowToast(isMuted ? 'Audio Unmuted' : 'Audio Muted');
              }}
              aria-label="Audio settings"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0e0e0e]/70 backdrop-blur-md active:scale-95 transition-all text-[#e5e2e1] border border-white/10"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            {/* Captions toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCaptions(!showCaptions);
                onShowToast(showCaptions ? 'Captions Turned Off' : 'Captions Turned On');
              }}
              aria-label="Captions"
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md active:scale-95 transition-all border border-white/10 ${
                showCaptions ? 'bg-[#ff9900] text-[#4a2800]' : 'bg-[#0e0e0e]/70 text-[#e5e2e1]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">closed_caption</span>
            </button>
          </div>
        </div>

        {/* Center Play/Pause Micro-interaction Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-14 h-14 rounded-full bg-[#0e0e0e]/80 text-[#ffc082] hover:text-[#ff9900] flex items-center justify-center shadow-xl backdrop-blur-md active:scale-90 transition-transform cursor-pointer border border-[#ff9900]/30 hover:border-[#ff9900]"
          >
            <span
              className="material-symbols-outlined text-[36px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Bottom Scrubber & Time Bar */}
        <div className="absolute bottom-0 inset-x-0 px-3 pb-2 pt-3 z-20 flex flex-col gap-1.5 bg-gradient-to-t from-black/80 to-transparent">
          {/* Scrubber track container */}
          <div
            ref={scrubTrackRef}
            onClick={handleScrub}
            className="relative w-full h-3 flex items-center cursor-pointer group/scrub py-1"
          >
            {/* Track Background */}
            <div className="w-full h-1 bg-[#353534] rounded-full overflow-hidden relative">
              {/* Loaded Buffer (approx 78%) */}
              <div className="absolute left-0 top-0 bottom-0 w-[78%] bg-[#554434]/60 rounded-full" />
              {/* Played Progress Bar */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#ff9900] rounded-full transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* Scrubber Thumb */}
            <div
              className="absolute -translate-x-1/2 w-3.5 h-3.5 bg-[#ff9900] rounded-full shadow-[0_0_8px_rgba(255,153,0,0.8)] scale-100 group-hover/scrub:scale-125 transition-transform pointer-events-none"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Time and Quick Controls */}
          <div className="flex items-center justify-between text-[#e5e2e1] text-[11px] font-['Inter']">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-[#e5e2e1] font-semibold">{formatTime(currentTimeSec)}</span>
              <span className="text-[#a38d7a]">/</span>
              <span className="text-[#dbc2ad]">{formatTime(totalDurationSec)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast('Picture-in-Picture enabled');
                }}
                aria-label="Picture in picture"
                className="flex items-center text-[#dbc2ad] hover:text-[#e5e2e1] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">picture_in_picture_alt</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFullscreen();
                }}
                aria-label="Fullscreen"
                className="flex items-center text-[#ffc082] hover:text-[#ff9900] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Details & Engagement Content Body */}
      <div className="flex flex-col px-3 pt-3 gap-3">
        {/* Title and Metadata Section */}
        <div className="flex flex-col gap-1">
          <h2 className="font-['Outfit'] text-[18px] font-bold text-[#e5e2e1] tracking-tight leading-snug">
            {video.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-1.5 text-[#dbc2ad] font-['Inter'] text-[12px]">
            <span className="text-[#e5e2e1] font-medium">{video.views}</span>
            <span>•</span>
            <span>{video.uploadDate || 'Streamed 2 days ago'}</span>
            <span>•</span>
            <span className="font-['Inter'] text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e89701]/20 text-[#ffb95a]">
              #1 on Trending
            </span>
          </div>
        </div>

        {/* Action Row (Horizontal Scrollable Smooth Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-3 px-3">
          {/* Like/Dislike Dual Pill */}
          <div className="flex items-center bg-[#201f1f] border border-[#2a2a2a] rounded-full shrink-0">
            <button
              onClick={handleToggleLike}
              className="flex items-center gap-1.5 px-3 py-2 rounded-l-full text-[#e5e2e1] hover:text-[#ffc082] active:scale-95 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isLiked ? 'text-[#ff9900]' : 'text-[#dbc2ad]'
                }`}
                style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                thumb_up
              </span>
              <span className="font-['Inter'] text-[12px] font-semibold">
                {isLiked ? '98% (42K)' : '97% (41K)'}
              </span>
            </button>
            <span className="w-[1px] h-4 bg-[#353534]"></span>
            <button
              onClick={handleToggleDislike}
              aria-label="Dislike video"
              className="px-2.5 py-2 rounded-r-full text-[#dbc2ad] hover:text-[#e5e2e1] active:scale-95 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isDisliked ? 'text-[#ff9900]' : 'text-[#dbc2ad]'
                }`}
                style={isDisliked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                thumb_down
              </span>
            </button>
          </div>

          {/* Share Pill */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] border border-[#2a2a2a] active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span className="font-['Inter'] text-[12px] font-medium">Share</span>
          </button>

          {/* Tip / SuperChat Pill (High Energy Amber Tint) */}
          <button
            onClick={onOpenSuperChat}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#e89701]/25 hover:bg-[#e89701]/35 text-[#ffb95a] border border-[#e89701]/40 active:scale-95 transition-all shrink-0"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monetization_on
            </span>
            <span className="font-['Inter'] text-[12px] font-bold">SuperChat</span>
          </button>

          {/* Download Pill */}
          <button
            onClick={() => {
              setIsDownloaded(!isDownloaded);
              onShowToast(isDownloaded ? 'Removed from downloads' : 'Downloading in 1080p...');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] border border-[#2a2a2a] active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDownloaded ? 'download_done' : 'download'}
            </span>
            <span className="font-['Inter'] text-[12px] font-medium">
              {isDownloaded ? 'Downloaded' : 'Download'}
            </span>
          </button>

          {/* Save to Playlist */}
          <button
            onClick={() => {
              setIsSaved(!isSaved);
              onShowToast(isSaved ? 'Removed from Playlist' : 'Saved to Watch Later playlist');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] border border-[#2a2a2a] active:scale-95 transition-all shrink-0"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isSaved ? 'text-[#ff9900]' : 'text-[#e5e2e1]'
              }`}
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              bookmark_add
            </span>
            <span className="font-['Inter'] text-[12px] font-medium">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>
        </div>

        {/* Creator Channel Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden ring-2 ring-[#ff9900]/30">
              <img
                alt={video.creator}
                className="w-full h-full object-cover"
                src={video.creatorAvatar}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[14px] font-bold text-[#e5e2e1] truncate">
                  {video.creator}
                </span>
                <span
                  className="material-symbols-outlined text-[16px] text-[#ffc082]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Verified Creator"
                >
                  verified
                </span>
              </div>
              <span className="font-['Inter'] text-[12px] text-[#dbc2ad] truncate">
                {video.creatorSubscribers || '1.2M subscribers'}
              </span>
            </div>
          </div>

          {/* Dynamic Subscribe Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                const creatorObj: Creator = {
                  id: video.id,
                  name: video.creator,
                  subscribers: video.creatorSubscribers,
                  avatarUrl: video.creatorAvatar,
                };
                onToggleSubscribe(creatorObj);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-['Inter'] text-[12px] font-bold shadow-md active:scale-95 transition-all ${
                isSubscribed
                  ? 'bg-[#353534] text-[#dbc2ad]'
                  : 'bg-[#ff9900] hover:bg-[#ffb86f] text-[#4a2800] shadow-[#ff9900]/20'
              }`}
            >
              <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>
            <button
              onClick={() => {
                setBellActive(!bellActive);
                onShowToast(bellActive ? 'Notifications turned off' : 'All notifications enabled');
              }}
              aria-label="Notification settings"
              className={`w-9 h-9 rounded-full bg-[#201f1f] flex items-center justify-center hover:text-[#e5e2e1] active:scale-95 transition-all border border-[#2a2a2a] ${
                bellActive ? 'text-[#ff9900]' : 'text-[#dbc2ad]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={bellActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                notifications
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Description Box */}
        <div
          onClick={() => setIsDescExpanded(!isDescExpanded)}
          className="flex flex-col p-3 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] cursor-pointer transition-colors hover:bg-[#201f1f]"
        >
          <div className="flex items-center justify-between text-[#a38d7a] font-['Inter'] text-[11px] mb-1">
            <span className="font-semibold text-[#dbc2ad] uppercase tracking-wider">
              Show Notes & Timestamps
            </span>
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                isDescExpanded ? 'rotate-180 text-[#ff9900]' : ''
              }`}
            >
              expand_more
            </span>
          </div>

          <p
            className={`font-['Inter'] text-[12px] text-[#e5e2e1] leading-relaxed ${
              isDescExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {video.description ||
              "Exploring every secret hidden in Dogtown! From Kurt Hansen's classified terminals to Songbird's matrix beacons and rogue AI relics lurking beyond the Blackwall. We uncover all 42 unseen endings, character interactions, and audio logs."}
          </p>

          {/* Tags */}
          <div
            className={`flex flex-wrap gap-1.5 mt-2 pt-1 border-t border-[#2a2a2a]/60 ${
              isDescExpanded ? 'flex' : 'hidden'
            }`}
          >
            {(video.tags || ['Cyberpunk2077', 'PhantomLiberty', 'LoreAnalysis']).map((tag) => (
              <span
                key={tag}
                className="font-['Inter'] text-[10px] px-2 py-0.5 rounded-full bg-[#353534] text-[#ffc082] font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Chapters List */}
          {isDescExpanded && video.chapters && video.chapters.length > 0 && (
            <div className="mt-3 pt-2 border-t border-[#2a2a2a]/60 flex flex-col gap-1.5">
              <span className="font-['Inter'] text-[11px] text-[#ff9900] font-bold">
                TIMESTAMPS (TAP TO SEEK):
              </span>
              {video.chapters.map((ch) => (
                <div
                  key={ch.time}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeekToChapter(ch.seconds);
                  }}
                  className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-[#2a2a2a] text-[#dbc2ad] hover:text-[#e5e2e1] text-[12px] cursor-pointer"
                >
                  <span className="font-mono text-[#ff9900] font-bold">{ch.time}</span>
                  <span className="truncate">{ch.title}</span>
                </div>
              ))}
            </div>
          )}

          <span className="font-['Inter'] text-[11px] text-[#ffc082] font-semibold mt-1">
            {isDescExpanded ? 'Show less' : 'Show more'}
          </span>
        </div>

        {/* Comments Teaser Section */}
        <div
          onClick={onOpenComments}
          className="flex flex-col p-3 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] gap-2 cursor-pointer hover:bg-[#201f1f] transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">
                Comments
              </span>
              <span className="font-['Inter'] text-[11px] text-[#dbc2ad] bg-[#201f1f] px-2 py-0.5 rounded-full font-semibold border border-[#2a2a2a]">
                {video.commentsCount || 3842}
              </span>
            </div>
            <button
              aria-label="Sort comments"
              className="material-symbols-outlined text-[#a38d7a] hover:text-[#e5e2e1] text-[20px]"
            >
              unfold_more
            </button>
          </div>

          {/* Highlighted Featured Comment */}
          <div className="flex items-start gap-2 pt-1">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 bg-[#2a2a2a] ring-1 ring-[#ff9900]/30">
              <img
                className="w-full h-full object-cover"
                alt="Commenter avatar"
                src={
                  video.featuredComment?.avatar ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFlB9Mke4ISOP8xN5H7ZnvU5ozG0YTyLPGmCiRoHNq6XM2VLMX1adiNvfEiQv0Osqiknd_E9wSzckwqP0koNDZzDJDlXhe4y96uGYsVpawN1BbP2PVA0IqL7O-R0tlBWczs_v_biM4XTgpkxLw2MOCgEpltdezMFJah0zseuToV-la6UvSO8Di65RadWkb1q1ickHzGGgCNINnX5v8OgDawj2aV92tlUCdb5eDKpPFBD_QJFcQTnGD5g'
                }
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-['Inter'] text-[11px] font-bold text-[#e5e2e1] truncate">
                  {video.featuredComment?.author || 'V_Afterlife_King'}
                </span>
                <span className="font-['Inter'] text-[10px] text-[#a38d7a]">
                  {video.featuredComment?.timeAgo || '1d ago'}
                </span>
              </div>
              <p className="font-['Inter'] text-[12px] text-[#dbc2ad] line-clamp-2 mt-0.5">
                {video.featuredComment?.text ||
                  'That breakdown of the Hansen audio log at 18:40 blew my mind. I completely missed that conversation in my second playthrough!'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Videos Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">Next Up</span>
          <div className="flex items-center gap-1.5">
            <span className="font-['Inter'] text-[11px] text-[#dbc2ad]">Autoplay</span>
            <button
              onClick={() => {
                setAutoplayNext(!autoplayNext);
                onShowToast(autoplayNext ? 'Autoplay disabled' : 'Autoplay enabled');
              }}
              aria-label="Autoplay switcher"
              className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                autoplayNext ? 'bg-[#ff9900] justify-end' : 'bg-[#353534] justify-start'
              }`}
            >
              <span className="w-4 h-4 bg-[#4a2800] rounded-full shadow-sm block" />
            </button>
          </div>
        </div>

        {/* Related Videos Vertical Stack */}
        <div className="flex flex-col gap-3 pb-8">
          {NEXT_UP_VIDEOS.map((nextVid) => (
            <div
              key={nextVid.id}
              onClick={() => onSelectVideo(nextVid)}
              className="flex gap-2.5 items-start group cursor-pointer active:opacity-80 transition-opacity bg-[#1c1b1b]/50 p-2 rounded-xl border border-[#2a2a2a]/40 hover:border-[#ff9900]/40"
            >
              <div className="relative w-36 aspect-video shrink-0 rounded-lg overflow-hidden bg-[#2a2a2a]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={nextVid.title}
                  src={nextVid.thumbnailUrl}
                  loading="lazy"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#0e0e0e]/90 backdrop-blur-xs font-['Inter'] text-[10px] font-bold text-[#e5e2e1]">
                  {nextVid.duration}
                </div>
                {nextVid.badge && (
                  <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-[#ff9900]/95 font-['Inter'] text-[9px] font-extrabold text-[#4a2800]">
                    {nextVid.badge === '4K' ? '99%' : nextVid.badge}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1 justify-between self-stretch py-0.5">
                <div className="flex flex-col">
                  <h3 className="font-['Outfit'] text-[14px] text-[#e5e2e1] font-semibold line-clamp-2 leading-tight group-hover:text-[#ffc082] transition-colors">
                    {nextVid.title}
                  </h3>
                  <p className="font-['Inter'] text-[12px] text-[#dbc2ad] mt-1 truncate">
                    {nextVid.creator}
                  </p>
                </div>
                <p className="font-['Inter'] text-[11px] text-[#a38d7a] truncate">
                  {nextVid.views} • {nextVid.uploadDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
