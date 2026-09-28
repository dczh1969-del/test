import React, { useState } from 'react';
import { SuperChatMessage } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface SuperChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  onSendSuperChat: (message: SuperChatMessage) => void;
}

export const SuperChatModal: React.FC<SuperChatModalProps> = ({
  isOpen,
  onClose,
  creatorName,
  onSendSuperChat,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [messageText, setMessageText] = useState('');

  if (!isOpen) return null;

  const tiers = [
    { amount: 2, color: '#3b82f6', label: 'Supporter' },
    { amount: 5, color: '#06b6d4', label: 'Fan' },
    { amount: 10, color: '#eab308', label: 'Champion' },
    { amount: 20, color: '#f97316', label: 'VIP Hero' },
    { amount: 50, color: '#ff9900', label: 'Mega Super' },
    { amount: 100, color: '#ef4444', label: 'Apex Legend' },
  ];

  const currentTier = tiers.find((t) => t.amount === selectedAmount) || tiers[2];

  const handleSend = () => {
    const newChat: SuperChatMessage = {
      id: `sc-${Date.now()}`,
      sender: USER_PROFILE.name,
      avatar: USER_PROFILE.avatarUrl,
      amount: selectedAmount,
      currency: '$',
      message: messageText.trim() || `Donated $${selectedAmount} to support the stream!`,
      timestamp: 'Just now',
      tierColor: currentTier.color,
    };
    onSendSuperChat(newChat);
    setMessageText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#201f1f] rounded-t-3xl sm:rounded-2xl border border-[#2a2a2a] p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ff9900] text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monetization_on
            </span>
            <span className="font-['Outfit'] text-[17px] font-bold text-[#e5e2e1]">
              Send SuperChat to {creatorName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#dbc2ad] hover:text-[#e5e2e1] hover:bg-[#2a2a2a]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tier Selector Chips */}
        <div>
          <span className="text-xs text-[#dbc2ad] font-medium mb-1.5 block">Select Amount:</span>
          <div className="grid grid-cols-6 gap-1.5">
            {tiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                style={{
                  borderColor: selectedAmount === tier.amount ? tier.color : '#2a2a2a',
                  backgroundColor: selectedAmount === tier.amount ? `${tier.color}25` : '#1c1b1b',
                  color: selectedAmount === tier.amount ? tier.color : '#dbc2ad',
                }}
                className="py-2 rounded-xl flex flex-col items-center border font-bold text-xs transition-all active:scale-95"
              >
                <span>${tier.amount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SuperChat Live Preview Card */}
        <div
          style={{ borderColor: currentTier.color }}
          className="rounded-xl p-3 border-2 bg-[#1c1b1b] flex flex-col gap-2 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={USER_PROFILE.avatarUrl}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-['Inter'] text-xs font-bold text-[#e5e2e1]">
                {USER_PROFILE.name}
              </span>
            </div>
            <span
              style={{ backgroundColor: currentTier.color }}
              className="px-2 py-0.5 rounded-full text-black font-extrabold text-xs"
            >
              ${selectedAmount}.00
            </span>
          </div>
          <p className="text-xs text-[#e5e2e1] italic min-h-[1.25rem]">
            {messageText || 'Enter your custom shoutout message below...'}
          </p>
        </div>

        {/* Message Input */}
        <div>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            maxLength={180}
            rows={2}
            placeholder="Type your message to pin on stream..."
            className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-2.5 text-xs text-[#e5e2e1] outline-none focus:border-[#ff9900] resize-none"
          />
          <div className="text-right text-[10px] text-[#a38d7a] mt-0.5">
            {messageText.length}/180
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSend}
          className="w-full py-3 rounded-full bg-[#ff9900] hover:bg-[#ffb86f] text-[#4a2800] font-['Inter'] font-black text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          Buy & Send ${selectedAmount}.00 SuperChat
        </button>
      </div>
    </div>
  );
};
