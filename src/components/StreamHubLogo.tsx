import React from 'react';

interface StreamHubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StreamHubLogo: React.FC<StreamHubLogoProps> = ({ className = '', size = 'md' }) => {
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const badgePadding = size === 'sm' ? 'px-1.5 py-0.2 text-xs' : size === 'lg' ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <div className={`flex items-center select-none font-sans font-black tracking-tight ${className}`}>
      <span className={`${textSize} text-[#ffffff] font-extrabold tracking-tighter mr-1 font-['Outfit']`}>
        Stream
      </span>
      <span className={`${badgePadding} bg-[#ff9900] text-[#000000] font-black rounded-[5px] uppercase tracking-wider font-['Outfit'] shadow-sm`}>
        HUB
      </span>
    </div>
  );
};
