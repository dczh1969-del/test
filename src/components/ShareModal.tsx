import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  onShowToast: (message: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(currentUrl);
    onShowToast('Link copied to clipboard!');
    onClose();
  };

  const shareTargets = [
    { name: 'Copy Link', icon: 'link', action: handleCopy, bg: 'bg-[#ff9900] text-[#4a2800]' },
    {
      name: 'WhatsApp',
      icon: 'chat',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(videoTitle + ' ' + currentUrl)}`);
        onClose();
      },
      bg: 'bg-emerald-600 text-white',
    },
    {
      name: 'X / Twitter',
      icon: 'send',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(videoTitle)}&url=${encodeURIComponent(currentUrl)}`);
        onClose();
      },
      bg: 'bg-neutral-800 text-white',
    },
    {
      name: 'Discord',
      icon: 'forum',
      action: handleCopy,
      bg: 'bg-indigo-600 text-white',
    },
    {
      name: 'Embed',
      icon: 'code',
      action: () => {
        navigator.clipboard?.writeText?.(`<iframe src="${currentUrl}" width="560" height="315"></iframe>`);
        onShowToast('Embed code copied!');
        onClose();
      },
      bg: 'bg-[#353534] text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#201f1f] rounded-t-3xl sm:rounded-2xl border border-[#2a2a2a] p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <span className="font-['Outfit'] text-[17px] font-bold text-[#e5e2e1]">Share Stream</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 py-2">
          {shareTargets.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}>
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              </div>
              <span className="text-[10px] text-[#dbc2ad] text-center font-medium truncate w-full">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 p-2 bg-[#1c1b1b] rounded-xl border border-[#2a2a2a]">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="bg-transparent text-xs text-[#dbc2ad] flex-1 outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#ff9900] text-[#4a2800] rounded-lg text-xs font-bold"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
