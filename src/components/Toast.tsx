import React from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <div
      onClick={onClear}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2a2a2a]/95 text-[#e5e2e1] px-4 py-2 rounded-full border border-[#ff9900]/40 shadow-xl flex items-center gap-2 backdrop-blur-md cursor-pointer animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse" />
      <span className="font-['Inter'] text-xs font-semibold">{message}</span>
    </div>
  );
};
