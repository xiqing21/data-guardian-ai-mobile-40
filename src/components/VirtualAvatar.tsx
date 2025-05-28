
import React, { useState, useEffect } from 'react';
import { Zap, Power } from 'lucide-react';

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
    let baseStyle = "w-12 h-12 rounded-full flex items-center justify-center relative transition-all duration-500 border-2 ";
    
    if (isAnimating) {
      baseStyle += "animate-pulse scale-110 ";
    }
    
    switch (currentExpression) {
      case 'thinking':
        return baseStyle + "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 border-blue-300 shadow-lg shadow-blue-500/50";
      case 'speaking':
        return baseStyle + "bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 border-green-300 shadow-lg shadow-green-500/50";
      case 'happy':
        return baseStyle + "bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 border-yellow-300 shadow-lg shadow-yellow-500/50";
      default:
        return baseStyle + "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300 shadow-lg shadow-cyan-500/50";
    }
  };

  const renderDigitalHuman = () => {
    return (
      <div className="relative w-full h-full">
        {/* 数字人头部轮廓 */}
        <div className="absolute inset-1 bg-white/20 rounded-full backdrop-blur-sm"></div>
        
        {/* 眼睛 */}
        <div className="absolute top-3 left-3 flex space-x-1">
          <div className={`w-1 h-1 rounded-full bg-white ${currentExpression === 'thinking' ? 'animate-pulse' : ''}`}></div>
          <div className={`w-1 h-1 rounded-full bg-white ${currentExpression === 'thinking' ? 'animate-pulse' : ''}`}></div>
        </div>
        
        {/* 嘴部表情 */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          {currentExpression === 'speaking' ? (
            <div className="w-2 h-1 bg-white rounded-full animate-pulse"></div>
          ) : currentExpression === 'happy' ? (
            <div className="w-3 h-1 bg-white rounded-full"></div>
          ) : (
            <div className="w-1 h-1 bg-white rounded-full"></div>
          )}
        </div>
        
        {/* 电力元素 - 闪电图标 */}
        <div className="absolute -top-1 -right-1">
          {currentExpression === 'speaking' || isAnimating ? (
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Zap className="w-2 h-2 text-yellow-800" />
            </div>
          ) : (
            <div className="w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center">
              <Power className="w-1.5 h-1.5 text-blue-800" />
            </div>
          )}
        </div>
        
        {/* 能量光环效果 */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
        )}
      </div>
    );
  };

  return (
    <div className={getAvatarStyle()}>
      {renderDigitalHuman()}
    </div>
  );
};

export default VirtualAvatar;
