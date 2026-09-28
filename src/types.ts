export interface Video {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  creatorSubscribers: string;
  isVerified?: boolean;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  views: string;
  ratingPercentage: number;
  uploadDate: string;
  category: 'Gaming' | 'Vlogs' | 'Podcasts' | 'Tech' | 'IRL' | 'Esports' | 'Music';
  badge?: 'HD' | '4K' | 'NEW' | 'PREMIERE';
  isPremiere?: boolean;
  rank?: number;
  description?: string;
  streamUrl?: string;
  tags?: string[];
  commentsCount?: number;
  chapters?: { time: string; seconds: number; title: string }[];
  featuredComment?: {
    id: string;
    author: string;
    avatar: string;
    timeAgo: string;
    text: string;
    likes: number;
  };
}

export interface Creator {
  id: string;
  name: string;
  subscribers: string;
  avatarUrl: string;
  isSubscribed?: boolean;
  verified?: boolean;
  tagline?: string;
  isLive?: boolean;
  liveTitle?: string;
}

export interface SuperChatMessage {
  id: string;
  sender: string;
  avatar: string;
  amount: number;
  currency: string;
  message: string;
  timestamp: string;
  tierColor: string;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  isLiked?: boolean;
  isPinned?: boolean;
  replies?: CommentItem[];
}
