
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Bot, 
  Calendar,
  ArrowRight,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { Task } from '../types/Task';
import AnimatedNumber from './AnimatedNumber';

interface GridWorkerWorkbenchProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAIAssistClick: () => void;
  onViewAllTasks: () => void;
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
}

const GridWorkerWorkbench: React.FC<GridWorkerWorkbenchProps> = ({
  tasks,
  onTaskClick,
  onAIAssistClick,
  onViewAllTasks,
  employeeTasks
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'completed' | 'ai'>('overview');

  // 任务统计
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const aiProcessableTasks = tasks.filter(t => t.autoProcessable && t.status === 'pending');

  // 今日完成率
  const todayCompletionRate = employeeTasks ? 
    Math.round((employeeTasks.completedToday / employeeTasks.totalToday) * 100) : 
    Math.round((completedTasks.length / tasks.length) * 100);

  const renderOverview = () => (
    <div className="space-y-4">
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 mb-1">我的待办</div>
                <div className="text-2xl font-bold text-blue-700">
                  <AnimatedNumber value={pendingTasks.length} />
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-2 h-6 text-xs border-blue-300 text-blue-600 hover:bg-blue-50"
              onClick={() => setActiveTab('pending')}
            >
              查看详情
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600 mb-1">今日完成</div>
                <div className="text-2xl font-bold text-green-700">
                  <AnimatedNumber value={employeeTasks?.completedToday || completedTasks.length} />
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-2 h-6 text-xs border-green-300 text-green-600 hover:bg-green-50"
              onClick={() => setActiveTab('completed')}
            >
              查看详情
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 完成率进度 */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">今日完成率</span>
            <span className="text-sm font-bold text-green-600">
              <AnimatedNumber value={todayCompletionRate} suffix="%" />
            </span>
          </div>
          <Progress value={todayCompletionRate} className="h-2" />
          <div className="text-xs text-gray-500 mt-1">
            已完成 {employeeTasks?.completedToday || completedTasks.length} / 
            总计 {employeeTasks?.totalToday || tasks.length} 个任务
          </div>
        </CardContent>
      </Card>

      {/* AI智能助手卡片 */}
      {aiProcessableTasks.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI工作助手</span>
              <Badge className="bg-purple-100 text-purple-600 text-xs">智能处理</Badge>
            </div>
            <div className="text-xs text-purple-600 mb-3">
              {aiProcessableTasks.length}个任务可自动处理，预计节省80%时间
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onAIAssistClick}
                className="flex-1 h-7 text-xs bg-purple-500 hover:bg-purple-600"
              >
                <Bot className="h-3 w-3 mr-1" />
                启动AI助手
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveTab('ai')}
                className="h-7 text-xs border-purple-300 text-purple-600"
              >
                详情
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 紧急任务提醒 */}
      {urgentTasks.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">紧急任务提醒</span>
            </div>
            <div className="text-xs text-orange-600 mb-2">
              有 {urgentTasks.length} 个紧急任务需要处理
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full h-6 text-xs border-orange-300 text-orange-600 hover:bg-orange-50"
              onClick={() => setActiveTab('pending')}
            >
              立即处理
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPendingTasks = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">待办任务 ({pendingTasks.length})</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={onViewAllTasks}
          className="h-6 text-xs"
        >
          查看全部
        </Button>
      </div>
      {pendingTasks.slice(0, 5).map((task) => (
        <Card 
          key={task.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onTaskClick(task)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium truncate">{task.title}</span>
              <Badge variant={task.priority === 'high' ? 'destructive' : 'default'} className="text-xs">
                {task.priority === 'high' ? '紧急' : task.priority === 'medium' ? '普通' : '一般'}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mb-2">{task.description}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">截止: {task.deadline}</span>
              {task.autoProcessable && (
                <Badge className="bg-purple-100 text-purple-600 text-xs">可AI处理</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCompletedTasks = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">已完成任务 ({completedTasks.length})</h3>
        <div className="text-xs text-green-600">
          完成率 <AnimatedNumber value={todayCompletionRate} suffix="%" />
        </div>
      </div>
      {completedTasks.slice(0, 5).map((task) => (
        <Card key={task.id} className="bg-green-50 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-green-700 truncate">{task.title}</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-xs text-green-600 mb-1">{task.description}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-500">完成人: {task.assignee}</span>
              <Badge className="bg-green-100 text-green-600 text-xs">已完成</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-3">
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <Bot className="h-12 w-12 text-purple-500 mx-auto mb-2" />
        <h3 className="text-sm font-medium text-purple-700 mb-1">AI工作助手</h3>
        <p className="text-xs text-purple-600">智能化处理，提升工作效率</p>
      </div>

      <Card>
        <CardContent className="p-3">
          <h4 className="text-sm font-medium mb-2">可自动处理任务</h4>
          <div className="space-y-2">
            {aiProcessableTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 bg-purple-50 rounded">
                <span className="text-sm truncate">{task.title}</span>
                <Button
                  size="sm"
                  onClick={() => onTaskClick(task)}
                  className="h-6 text-xs bg-purple-500 hover:bg-purple-600"
                >
                  AI处理
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-3 bg-purple-500 hover:bg-purple-600"
            onClick={onAIAssistClick}
          >
            启动AI智能助手
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* 标签页导航 */}
      <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'overview', label: '概览', icon: Target },
          { key: 'pending', label: '待办', icon: Clock },
          { key: 'completed', label: '完成', icon: CheckCircle },
          { key: 'ai', label: 'AI助手', icon: Bot }
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(key as any)}
            className={`h-8 text-xs flex items-center gap-1 ${
              activeTab === key ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            <Icon className="h-3 w-3" />
            {label}
          </Button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'pending' && renderPendingTasks()}
        {activeTab === 'completed' && renderCompletedTasks()}
        {activeTab === 'ai' && renderAIAssistant()}
      </div>
    </div>
  );
};

export default GridWorkerWorkbench;
