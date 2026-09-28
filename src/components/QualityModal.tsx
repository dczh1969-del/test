import React from 'react';

interface QualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuality: string;
  onSelectQuality: (q: string) => void;
}

export const QualityModal: React.FC<QualityModalProps> = ({
  isOpen,
  onClose,
  currentQuality,
  onSelectQuality,
}) => {
  if (!isOpen) return null;

  const qualities = [
    { label: '2160p (4K Ultra HD)', value: '2160p', badge: 'PRO' },
    { label: '1440p (QHD 60fps)', value: '1440p', badge: 'HD' },
    { label: '1080p (FHD 60fps)', value: '1080p', badge: 'RECOMMENDED' },
    { label: '720p (HD)', value: '720p', badge: '' },
    { label: '480p (Standard)', value: '480p', badge: '' },
    { label: 'Auto (Network Adaptive)', value: 'Auto', badge: '' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#201f1f] rounded-t-3xl sm:rounded-2xl border border-[#2a2a2a] p-4 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff9900] text-[20px]">high_quality</span>
            <span className="font-['Outfit'] text-[16px] font-bold text-[#e5e2e1]">
              Stream Playback Quality
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {qualities.map((item) => {
            const isSelected = currentQuality.toLowerCase().includes(item.value.toLowerCase());
            return (
              <button
                key={item.value}
                onClick={() => {
                  onSelectQuality(item.value);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors text-left ${
                  isSelected ? 'bg-[#ff9900]/15 text-[#ffc082]' : 'hover:bg-[#2a2a2a] text-[#e5e2e1]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isSelected ? 'text-[#ff9900]' : 'text-transparent'
                    }`}
                  >
                    check
                  </span>
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] bg-[#353534] text-[#ff9900] px-2 py-0.5 rounded font-black tracking-wider uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
