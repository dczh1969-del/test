import React, { useState } from 'react';
import { CommentItem } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: CommentItem[];
  onAddComment: (comment: CommentItem) => void;
  onLikeComment: (id: string) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newText, setNewText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: USER_PROFILE.name,
      avatar: USER_PROFILE.avatarUrl,
      timeAgo: 'Just now',
      text: newText.trim(),
      likes: 0,
      isLiked: false,
    };
    onAddComment(newComment);
    setNewText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-md bg-[#1c1b1b] rounded-t-3xl border-t border-x border-[#2a2a2a] max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-[#353534] rounded-full mx-auto my-2" />

        {/* Drawer Header */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] text-[17px] font-bold text-[#e5e2e1]">Comments</span>
            <span className="text-xs bg-[#2a2a2a] text-[#dbc2ad] px-2 py-0.5 rounded-full font-semibold">
              {comments.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#2a2a2a]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-[#ff9900]/30">
                <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#e5e2e1] truncate">{c.author}</span>
                  <span className="text-[10px] text-[#a38d7a]">{c.timeAgo}</span>
                  {c.isPinned && (
                    <span className="text-[9px] bg-[#ff9900]/20 text-[#ff9900] px-1.5 py-0.2 rounded font-bold">
                      PINNED
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#dbc2ad] mt-1 leading-relaxed">{c.text}</p>

                <div className="flex items-center gap-4 mt-2 text-[11px] text-[#a38d7a]">
                  <button
                    onClick={() => onLikeComment(c.id)}
                    className="flex items-center gap-1 hover:text-[#ff9900] transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        c.isLiked ? 'text-[#ff9900]' : ''
                      }`}
                      style={c.isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      thumb_up
                    </span>
                    <span>{c.likes}</span>
                  </button>

                  <button className="hover:text-[#e5e2e1] transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Comment Bar */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-[#2a2a2a] bg-[#131313] flex items-center gap-2">
          <img
            src={USER_PROFILE.avatarUrl}
            alt="My Profile"
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Add a public comment..."
            className="flex-1 bg-[#201f1f] text-xs text-[#e5e2e1] placeholder-[#a38d7a] px-3.5 py-2 rounded-full border border-[#2a2a2a] outline-none focus:border-[#ff9900]"
          />
          <button
            type="submit"
            disabled={!newText.trim()}
            className="w-8 h-8 rounded-full bg-[#ff9900] text-[#4a2800] disabled:opacity-40 flex items-center justify-center font-bold shrink-0 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
};
