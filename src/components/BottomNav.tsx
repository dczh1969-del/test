import React from 'react';

export type TabType = 'home' | 'trending' | 'subscriptions' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: 'subscriptions',
    },
    {
      id: 'trending' as TabType,
      label: 'Trending',
      icon: 'local_fire_department',
    },
    {
      id: 'subscriptions' as TabType,
      label: 'Subscriptions',
      icon: 'video_library',
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: 'person',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#131313]/90 backdrop-blur-xl border-t border-[#201f1f]">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-all select-none active:scale-95 ${
                isActive
                  ? 'text-[#ff9900] font-bold'
                  : 'text-[#dbc2ad] hover:text-[#e5e2e1]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="font-['Inter'] text-[10px] tracking-wide font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
