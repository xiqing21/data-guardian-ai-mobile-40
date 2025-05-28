
import React, { useState, useEffect } from 'react';

const VirtualAvatar = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentExpression, setCurrentExpression] = useState('normal');

  useEffect(() => {
    // 模拟AI虚拟形象的动画状态
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
      
      // 随机切换表情
      const expressions = ['normal', 'thinking', 'speaking', 'happy'];
      setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAvatarStyle = () => {
    let baseStyle = "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ";
    
    if (isAnimating) {
      baseStyle += "animate-pulse scale-110 ";
    }
    
    switch (currentExpression) {
      case 'thinking':
        return baseStyle + "bg-gradient-to-r from-purple-500 to-purple-700";
      case 'speaking':
        return baseStyle + "bg-gradient-to-r from-green-500 to-green-700";
      case 'happy':
        return baseStyle + "bg-gradient-to-r from-yellow-500 to-orange-500";
      default:
        return baseStyle + "bg-gradient-to-r from-blue-500 to-blue-700";
    }
  };

  const getAvatarEmoji = () => {
    switch (currentExpression) {
      case 'thinking':
        return '🤔';
      case 'speaking':
        return '🗣️';
      case 'happy':
        return '😊';
      default:
        return '🤖';
    }
  };

  return (
    <div className={getAvatarStyle()}>
      <span className="text-lg">
        {getAvatarEmoji()}
      </span>
    </div>
  );
};

export default VirtualAvatar;
