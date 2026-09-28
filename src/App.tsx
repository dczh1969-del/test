import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { VideoPlayerScreen } from './components/VideoPlayerScreen';
import { TrendingScreen } from './components/TrendingScreen';
import { SubscriptionsScreen } from './components/SubscriptionsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SearchModal } from './components/SearchModal';
import { SuperChatModal } from './components/SuperChatModal';
import { CommentsDrawer } from './components/CommentsDrawer';
import { ShareModal } from './components/ShareModal';
import { QualityModal } from './components/QualityModal';
import { MiniPlayer } from './components/MiniPlayer';
import { Toast } from './components/Toast';
import { Video, Creator, CommentItem, SuperChatMessage } from './types';
import {
  FEATURED_HERO_VIDEO,
  INITIAL_COMMENTS,
  INITIAL_SUPERCHATS,
} from './data/mockData';

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<'feed' | 'player'>('feed');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Video player state
  const [activeVideo, setActiveVideo] = useState<Video>(FEATURED_HERO_VIDEO);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentQuality, setCurrentQuality] = useState<string>('1080p');

  // Subscriptions state
  const [subscribedCreatorIds, setSubscribedCreatorIds] = useState<Set<string>>(
    new Set(['creator-1'])
  );

  // Social & Engagement state
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [, setSuperChats] = useState<SuperChatMessage[]>(INITIAL_SUPERCHATS);

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuperChatOpen, setIsSuperChatOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleSelectVideo = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setCurrentScreen('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPlayer = () => {
    setCurrentScreen('feed');
  };

  const handleToggleSubscribe = (creator: Creator) => {
    setSubscribedCreatorIds((prev) => {
      const next = new Set(prev);
      if (next.has(creator.id)) {
        next.delete(creator.id);
        showToast(`Unsubscribed from ${creator.name}`);
      } else {
        next.add(creator.id);
        showToast(`Subscribed to ${creator.name}!`);
      }
      return next;
    });
  };

  const handleAddComment = (comment: CommentItem) => {
    setComments((prev) => [comment, ...prev]);
    showToast('Comment posted!');
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextLiked = !c.isLiked;
          return {
            ...c,
            isLiked: nextLiked,
            likes: nextLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
          };
        }
        return c;
      })
    );
  };

  const handleSendSuperChat = (chat: SuperChatMessage) => {
    setSuperChats((prev) => [chat, ...prev]);
    showToast(`SuperChat of $${chat.amount} sent to ${activeVideo.creator}! 🎉`);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentScreen('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col items-center selection:bg-[#ff9900] selection:text-[#4a2800]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />

      {/* Main App Container */}
      <div className="w-full relative min-h-screen flex flex-col">
        {currentScreen === 'player' ? (
          <VideoPlayerScreen
            video={activeVideo}
            onBack={handleBackFromPlayer}
            onSelectVideo={handleSelectVideo}
            subscribedCreatorIds={subscribedCreatorIds}
            onToggleSubscribe={handleToggleSubscribe}
            onShowToast={showToast}
            onOpenSuperChat={() => setIsSuperChatOpen(true)}
            onOpenComments={() => setIsCommentsOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
            onOpenQuality={() => setIsQualityOpen(true)}
            currentQuality={currentQuality}
          />
        ) : (
          <>
            {/* Top Navigation Header for Feed */}
            {activeTab === 'home' && (
              <Header
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenProfile={() => handleTabChange('profile')}
              />
            )}

            {/* Tab Views */}
            <main className="flex-1 w-full flex flex-col">
              {activeTab === 'home' && (
                <HomeScreen
                  onSelectVideo={handleSelectVideo}
                  onNavigateTab={handleTabChange}
                  subscribedCreatorIds={subscribedCreatorIds}
                  onToggleSubscribe={handleToggleSubscribe}
                  onShowToast={showToast}
                  filterCategory={selectedCategory}
                />
              )}

              {activeTab === 'trending' && (
                <TrendingScreen
                  onSelectVideo={handleSelectVideo}
                  onOpenSearch={() => setIsSearchOpen(true)}
                />
              )}

              {activeTab === 'subscriptions' && (
                <SubscriptionsScreen
                  onSelectVideo={handleSelectVideo}
                  subscribedCreatorIds={subscribedCreatorIds}
                  onToggleSubscribe={handleToggleSubscribe}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileScreen
                  onSelectVideo={handleSelectVideo}
                  onShowToast={showToast}
                />
              )}
            </main>

            {/* Bottom Floating Mini-Player when in Feed and active video is loaded */}
            {activeVideo && currentScreen === 'feed' && (
              <MiniPlayer
                video={activeVideo}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onExpand={() => setCurrentScreen('player')}
                onClose={() => setActiveVideo(null as unknown as Video)}
              />
            )}

            {/* Fixed Bottom Tab Navigation */}
            <BottomNav activeTab={activeTab} onChangeTab={handleTabChange} />
          </>
        )}
      </div>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVideo={handleSelectVideo}
      />

      <SuperChatModal
        isOpen={isSuperChatOpen}
        onClose={() => setIsSuperChatOpen(false)}
        creatorName={activeVideo.creator}
        onSendSuperChat={handleSendSuperChat}
      />

      <CommentsDrawer
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        videoTitle={activeVideo.title}
        onShowToast={showToast}
      />

      <QualityModal
        isOpen={isQualityOpen}
        onClose={() => setIsQualityOpen(false)}
        currentQuality={currentQuality}
        onSelectQuality={(q) => {
          setCurrentQuality(q);
          showToast(`Resolution switched to ${q}`);
        }}
      />
    </div>
  );
}
