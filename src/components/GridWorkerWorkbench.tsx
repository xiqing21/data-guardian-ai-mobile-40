
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
  List,
  PlayCircle,
  Calendar,
  TrendingUp
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
  const [activeTab, setActiveTab] = useState('overview');

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

  return (
    <div className="space-y-4">
      {/* 统一工作台标题 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            我的工作台
            <Badge className="bg-blue-100 text-blue-700 text-xs">实时更新</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 关键指标概览 */}
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

          {/* 任务分类标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                待办事项
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                进行中
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                已完成
              </TabsTrigger>
            </TabsList>

            {/* 待办任务 */}
            <TabsContent value="overview" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">我的待办 ({pendingTasks.length})</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onViewAllTasks}
                  className="text-xs"
                >
                  <List className="h-3 w-3 mr-1" />
                  查看全部
                </Button>
              </div>
              
              {pendingTasks.length > 0 ? (
                <div className="space-y-2">
                  {pendingTasks.slice(0, 5).map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onTaskClick(task)}
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
                      <div className="text-xs text-gray-600 mb-2">{task.description}</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>负责人: {task.assignee}</span>
                        <span>截止: {task.deadline}</span>
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

            {/* 进行中任务 */}
            <TabsContent value="progress" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">进行中 ({inProgressTasks.length})</h3>
              </div>
              
              {inProgressTasks.length > 0 ? (
                <div className="space-y-2">
                  {inProgressTasks.slice(0, 5).map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onTaskClick(task)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{task.title}</span>
                        <Badge className="bg-orange-100 text-orange-600 text-xs">进行中</Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{task.description}</div>
                      <div className="space-y-2">
                        <Progress value={task.progress} className="h-1" />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>进度: {task.progress}%</span>
                          <span>负责人: {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Clock className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm">暂无进行中的任务</div>
                </div>
              )}
            </TabsContent>

            {/* 已完成任务 */}
            <TabsContent value="completed" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">今日已完成 ({employeeTasks?.completedToday || completedTasks.length})</h3>
              </div>
              
              {completedTasks.length > 0 ? (
                <div className="space-y-2">
                  {completedTasks.slice(0, 5).map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm text-green-700">{task.title}</div>
                        <div className="text-xs text-green-600">{task.description}</div>
                        <div className="text-xs text-green-500 mt-1">完成时间: {task.deadline}</div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm">今日暂无完成任务</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 紧急任务提醒 */}
      {urgentTasks.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-medium text-red-700">紧急任务提醒</div>
                  <div className="text-sm text-red-600">
                    有 {urgentTasks.length} 个紧急任务需要立即处理
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => onTaskClick(urgentTasks[0])}
              >
                立即处理
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI智能助手 */}
      {aiProcessableTasks.length > 0 && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-700">AI智能助手</div>
                  <div className="text-sm text-purple-600">
                    {aiProcessableTasks.length}个任务可自动处理，预计节省80%时间
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={onAIAssistClick}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                启动AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GridWorkerWorkbench;
