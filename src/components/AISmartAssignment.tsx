
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Zap, Users, TrendingUp } from 'lucide-react';

const AISmartAssignment: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiEfficiency, setAiEfficiency] = useState(92);

  const handleReassignment = () => {
    setIsProcessing(true);
    // 模拟AI重新分配过程
    setTimeout(() => {
      setIsProcessing(false);
      setAiEfficiency(Math.min(98, aiEfficiency + Math.random() * 3));
    }, 2000);
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white overflow-hidden">
      <CardContent className="p-4 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  AI智能任务分配
                  <Badge variant="secondary" className="text-purple-700 bg-white/90">
                    v2.0
                  </Badge>
                </h3>
                <p className="text-purple-100 text-sm">基于工作负载和技能匹配自动分配</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleReassignment}
              disabled={isProcessing}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  分配中...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  重新分配
                </div>
              )}
            </Button>
          </div>

          {/* AI效率指标 */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">{aiEfficiency}%</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" />
                分配效率
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">1.2s</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" />
                平均用时
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">156</div>
              <div className="text-xs text-purple-100 flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                今日分配
              </div>
            </div>
          </div>

          {/* 效率进度条 */}
          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI分析中...</span>
                <span>分配效率优化</span>
              </div>
              <Progress value={75} className="h-2 bg-white/20" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AISmartAssignment;
