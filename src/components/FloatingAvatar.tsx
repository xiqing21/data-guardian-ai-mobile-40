
import React from 'react';
import VirtualAvatar from './VirtualAvatar';

interface FloatingAvatarProps {
  onAvatarClick: () => void;
}

const FloatingAvatar: React.FC<FloatingAvatarProps> = ({ onAvatarClick }) => {
  return (
    <div className="fixed bottom-24 right-4 z-20">
      <div 
        className="relative cursor-pointer transform transition-transform hover:scale-110"
        onClick={onAvatarClick}
      >
        <VirtualAvatar />
        <div className="absolute -top-8 -left-6 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          AI数智助手
        </div>
      </div>
    </div>
  );
};

export default FloatingAvatar;
