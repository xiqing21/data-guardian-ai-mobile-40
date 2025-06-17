
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  MapPin,
  Target,
  Bot,
  Activity
} from 'lucide-react';
import { Role, RoleContent } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface AIWorkbenchProps {
  currentRole: Role;
  roleContent: RoleContent;
  roleTasks: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
  integratedAIStatus: {
    activeAgents: number;
    processingTasks: number;
    completionRate: number;
    pendingAutoTasks: number;
    aiProcessingTasks: number;
  };
  onTabChange: (tab: string) => void;
}

const AIWorkbench: React.FC<AIWorkbenchProps> = ({
  currentRole,
  roleContent,
  roleTasks,
  integratedAIStatus,
  onTabChange
}) => {
  // 只有供电所和网格员显示完整的AI工作台
  const isOperationalLevel = currentRole.level === 'substation' || currentRole.level === 'grid';
  
  // 计算任务完成进度
  const totalTasks = roleTasks.completedToday + roleTasks.inProgressTasks + roleTasks.pendingTasks;
  const completionRate = totalTasks > 0 ? Math.round((roleTasks.completedToday / totalTasks) * 100) : 0;

  if (!isOperationalLevel) {
    // 省市县级别只显示简化的AI助手入口
    return (
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
        <CardContent className="p-4 relative z-10">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI数据治理智能体</h3>
                <div className="flex items-center gap-2 text-indigo-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{currentRole.name}</span>
                  <Badge className="bg-white/20 text-xs px-2 py-0">管理智能体</Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => onTabChange('ai-assistant')}
              className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-sm backdrop-blur-sm"
            >
              <Bot className="h-4 w-4 mr-1" />
              AI助手
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
      <CardContent className="p-5 relative z-10">
        {/* 背景装饰元素 */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>
        
        {/* 头部区域 - AI助手信息与任务进度整合 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI智能工作台</h2>
              <div className="flex items-center gap-2 text-indigo-100 text-sm">
                <MapPin className="h-3 w-3" />
                <span>{currentRole.name}</span>
                <Badge className="bg-white/20 text-xs px-2 py-0">作业智能体</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              <AnimatedNumber value={completionRate} suffix="%" />
            </div>
            <div className="text-xs text-indigo-100">完成率</div>
          </div>
        </div>

        {/* 任务进度条 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-indigo-100">今日任务进度</span>
            <span className="text-sm font-medium">
              <AnimatedNumber value={roleTasks.completedToday} />/{totalTasks}
            </span>
          </div>
          <Progress 
            value={completionRate} 
            className="h-2 bg-white/20" 
          />
        </div>
        
        {/* 任务状态统一展示 */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
            <div className="text-lg font-bold text-orange-200">
              <AnimatedNumber value={roleTasks.pendingTasks} />
            </div>
            <div className="text-xs text-indigo-100">待处理</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
            <div className="text-lg font-bold text-blue-200">
              <AnimatedNumber value={roleTasks.inProgressTasks} />
            </div>
            <div className="text-xs text-indigo-100">进行中</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
            <div className="text-lg font-bold text-red-200">
              <AnimatedNumber value={roleTasks.urgentTasks} />
            </div>
            <div className="text-xs text-indigo-100">紧急</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
            <div className="text-lg font-bold text-cyan-200">
              <AnimatedNumber value={integratedAIStatus.activeAgents} />
            </div>
            <div className="text-xs text-indigo-100">AI协作</div>
          </div>
        </div>

        {/* AI智能体实时状态 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="h-4 w-4 text-purple-200" />
            <span className="text-sm font-medium">AI作业智能体运行状态</span>
            <Badge className="bg-green-500 text-xs px-2 py-1">运行中</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="text-base font-bold text-yellow-200">
                <AnimatedNumber value={integratedAIStatus.aiProcessingTasks} />
              </div>
              <div className="text-purple-100">AI处理中</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-orange-200">
                <AnimatedNumber value={integratedAIStatus.pendingAutoTasks} />
              </div>
              <div className="text-purple-100">待自动化</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-cyan-200">
                <AnimatedNumber value={integratedAIStatus.completionRate} suffix="%" />
              </div>
              <div className="text-purple-100">智能化率</div>
            </div>
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="grid grid-cols-2 gap-2">
          {roleContent.showTasks && (
            <Button 
              onClick={() => onTabChange('tasks')}
              className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-xs backdrop-blur-sm transition-all duration-200"
            >
              <Target className="h-3 w-3 mr-1" />
              处理任务
            </Button>
          )}
          <Button 
            onClick={() => onTabChange('ai-assistant')}
            className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-xs backdrop-blur-sm transition-all duration-200"
          >
            <Bot className="h-3 w-3 mr-1" />
            AI智能体
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkbench;
