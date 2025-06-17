
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Bot, 
  User,
  Target,
  PlayCircle,
  ArrowRight,
  Settings,
  Bell,
  BellDot,
  Calendar,
  Zap,
  TrendingUp,
  CheckCircle2
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
  const [activeTab, setActiveTab] = useState('workbench');

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

  // 处理任务点击
  const handleTaskProcess = (task: Task) => {
    console.log('跳转到任务处理页面:', task.id, task.title);
    onTaskClick(task);
  };

  // 快速处理任务
  const handleQuickProcess = (task: Task) => {
    console.log('快速处理任务:', task.id);
    window.dispatchEvent(new CustomEvent('openTaskManagement'));
    setTimeout(() => {
      onTaskClick(task);
    }, 100);
  };

  // 生成提醒数据
  const reminders = [
    {
      id: 1,
      type: 'urgent',
      title: '紧急任务提醒',
      message: `您有 ${urgentTasks.length} 个紧急任务待处理`,
      time: '刚刚',
      priority: 'high',
      actionable: true,
      relatedTask: urgentTasks[0]
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI智能助手',
      message: `${aiProcessableTasks.length} 个任务可使用AI自动处理`,
      time: '5分钟前',
      priority: 'medium',
      actionable: true
    },
    {
      id: 3,
      type: 'deadline',
      title: '截止时间提醒',
      message: '今日有3个任务即将到期',
      time: '1小时前',
      priority: 'medium',
      actionable: false
    },
    {
      id: 4,
      type: 'completion',
      title: '任务完成',
      message: '恭喜！您今日已完成8个任务',
      time: '2小时前',
      priority: 'low',
      actionable: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'ai': return <Bot className="h-4 w-4 text-purple-500" />;
      case 'deadline': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'completion': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            统一工作台
            <Badge className="bg-blue-100 text-blue-700 text-xs">实时更新</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 快速概览指标 */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                <AnimatedNumber value={pendingTasks.length} />
              </div>
              <div className="text-xs text-blue-700">待办任务</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">
                <AnimatedNumber value={inProgressTasks.length} />
              </div>
              <div className="text-xs text-orange-700">进行中</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                <AnimatedNumber value={employeeTasks?.completedToday || completedTasks.length} />
              </div>
              <div className="text-xs text-green-700">今日完成</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">
                <AnimatedNumber value={urgentTasks.length} />
              </div>
              <div className="text-xs text-red-700">紧急任务</div>
            </div>
          </div>

          {/* 完成率进度条 */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4 text-green-600" />
                今日完成率
              </span>
              <span className="font-semibold text-green-600">
                <AnimatedNumber value={todayCompletionRate} suffix="%" />
              </span>
            </div>
            <Progress value={todayCompletionRate} className="h-2" />
            <div className="text-xs text-gray-500 text-center">
              已完成 {employeeTasks?.completedToday || completedTasks.length} / 
              总计 {employeeTasks?.totalToday || tasks.length} 个任务
            </div>
          </div>

          {/* 集成标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workbench" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                工作台
              </TabsTrigger>
              <TabsTrigger value="todos" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                我的待办
              </TabsTrigger>
              <TabsTrigger value="reminders" className="text-xs relative">
                <BellDot className="h-3 w-3 mr-1" />
                我的提醒
                {reminders.filter(r => r.priority === 'high').length > 0 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* 工作台总览 */}
            <TabsContent value="workbench" className="space-y-4 mt-4">
              {/* 紧急任务和AI助手提醒 */}
              {(urgentTasks.length > 0 || aiProcessableTasks.length > 0) && (
                <div className="space-y-3">
                  {urgentTasks.length > 0 && (
                    <div className="p-3 rounded-lg border-l-4 border-l-red-500 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium text-red-700 text-sm">
                              紧急任务提醒 ({urgentTasks.length}个)
                            </div>
                            <div className="text-xs text-red-600">
                              {urgentTasks[0]?.title} 等任务需要立即处理
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleTaskProcess(urgentTasks[0])}
                          className="text-xs"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          立即处理
                        </Button>
                      </div>
                    </div>
                  )}

                  {aiProcessableTasks.length > 0 && (
                    <div className="p-3 rounded-lg border-l-4 border-l-purple-500 bg-purple-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <div>
                            <div className="font-medium text-purple-700 text-sm">
                              AI智能助手 ({aiProcessableTasks.length}个可处理)
                            </div>
                            <div className="text-xs text-purple-600">
                              预计节省80%处理时间，提升工作效率
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={onAIAssistClick}
                          className="bg-purple-600 hover:bg-purple-700 text-xs"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          启动AI
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 今日重点任务 */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  今日重点任务
                </h3>
                {pendingTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{task.title}</span>
                      <div className="flex items-center gap-2">
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">紧急</Badge>
                        )}
                        {task.autoProcessable && (
                          <Badge className="bg-purple-100 text-purple-600 text-xs">AI可处理</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-3">{task.description}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        截止: {task.deadline}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleQuickProcess(task)}
                          className="text-xs h-7"
                        >
                          <PlayCircle className="h-3 w-3 mr-1" />
                          快速处理
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 我的待办 */}
            <TabsContent value="todos" className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">我的待办 ({pendingTasks.length})</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onViewAllTasks}
                  className="text-xs"
                >
                  查看全部
                </Button>
              </div>
              
              {pendingTasks.length > 0 ? (
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{task.title}</span>
                        <div className="flex items-center gap-2">
                          {task.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">紧急</Badge>
                          )}
                          {task.autoProcessable && (
                            <Badge className="bg-purple-100 text-purple-600 text-xs">AI可处理</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">{task.description}</div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          <span>负责人: {task.assignee}</span>
                          <span className="ml-3">截止: {task.deadline}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTaskProcess(task)}
                            className="text-xs h-7"
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            处理
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleQuickProcess(task)}
                            className="text-xs h-7"
                          >
                            <PlayCircle className="h-3 w-3 mr-1" />
                            快速处理
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
                  <div className="text-sm">太棒了！暂无待办任务</div>
                </div>
              )}
            </TabsContent>

            {/* 我的提醒 */}
            <TabsContent value="reminders" className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  我的提醒 ({reminders.length})
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  全部已读
                </Button>
              </div>
              
              <div className="space-y-2">
                {reminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className={`p-3 border rounded-lg ${getPriorityColor(reminder.priority)} transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(reminder.type)}
                        <div>
                          <div className="font-medium text-sm">{reminder.title}</div>
                          <div className="text-xs opacity-80 mt-1">{reminder.message}</div>
                        </div>
                      </div>
                      <div className="text-xs opacity-60">{reminder.time}</div>
                    </div>
                    
                    {reminder.actionable && (
                      <div className="flex gap-2 mt-3">
                        {reminder.type === 'urgent' && reminder.relatedTask && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTaskProcess(reminder.relatedTask)}
                            className="text-xs h-6"
                          >
                            立即处理
                          </Button>
                        )}
                        {reminder.type === 'ai' && (
                          <Button
                            size="sm"
                            onClick={onAIAssistClick}
                            className="text-xs h-6"
                          >
                            启动AI助手
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-6"
                        >
                          忽略
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GridWorkerWorkbench;
