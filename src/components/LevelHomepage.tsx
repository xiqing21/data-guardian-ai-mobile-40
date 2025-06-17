
import React from 'react';
import { Role } from '../types/Role';
import GridWorkerWorkbench from './GridWorkerWorkbench';
import GridWorkerRanking from './GridWorkerRanking';
import PowerSupplyRanking from './PowerSupplyRanking';
import TaskOverview from './TaskOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedNumber from './AnimatedNumber';
import { 
  Building2, 
  Users, 
  BarChart3, 
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Database,
  Activity
} from 'lucide-react';

interface LevelHomepageProps {
  currentRole: Role;
  statistics: any;
  tasks: any;
  onTaskDetailClick: (type: 'completed' | 'pending') => void;
  onUnitsDetailClick: () => void;
}

const LevelHomepage: React.FC<LevelHomepageProps> = ({
  currentRole,
  statistics,
  tasks,
  onTaskDetailClick,
  onUnitsDetailClick
}) => {
  // 网格员专用工作台
  if (currentRole.level === 'grid') {
    return (
      <div className="space-y-3">
        <GridWorkerWorkbench
          tasks={[
            // 使用来自 useTaskManagement 的任务数据
            {
              id: 1,
              title: '手机号异常检测',
              description: '检测并处理1,247个异常手机号',
              category: 'phone',
              priority: 'high',
              status: 'pending',
              progress: 0,
              assignee: '网格员001',
              deadline: '2024-01-15',
              autoProcessable: true
            },
            {
              id: 2,
              title: '地址信息补全',
              description: '补全2,156条不完整地址信息',
              category: 'address',
              priority: 'medium',
              status: 'completed',
              progress: 100,
              assignee: 'AI智能体',
              deadline: '2024-01-14',
              autoProcessable: true
            },
            {
              id: 3,
              title: '用电户档案完善',
              description: '完善1,852户用电户基础档案信息',
              category: 'archive',
              priority: 'medium',
              status: 'in-progress',
              progress: 45,
              assignee: '网格员002',
              deadline: '2024-01-18',
              autoProcessable: false
            },
            {
              id: 4,
              title: '用电安全检查',
              description: '对234户进行用电安全隐患排查',
              category: 'safety',
              priority: 'high',
              status: 'pending',
              progress: 0,
              assignee: '网格员003',
              deadline: '2024-01-17',
              autoProcessable: false
            },
            {
              id: 5,
              title: '缴费通知发送',
              description: '向1,672户发送电费缴费通知',
              category: 'payment',
              priority: 'medium',
              status: 'in-progress',
              progress: 80,
              assignee: 'AI外呼系统',
              deadline: '2024-01-15',
              autoProcessable: true
            }
          ]}
          onTaskClick={(task) => {
            // 根据任务状态跳转到相应页面
            if (task.status === 'completed') {
              onTaskDetailClick('completed');
            } else {
              onTaskDetailClick('pending');
            }
          }}
          onAIAssistClick={() => {
            // 通过父组件触发AI助手界面
            const event = new CustomEvent('openAIAssistant');
            window.dispatchEvent(event);
          }}
          onViewAllTasks={() => {
            // 通过父组件触发任务管理界面
            const event = new CustomEvent('openTaskManagement');
            window.dispatchEvent(event);
          }}
          employeeTasks={tasks}
        />
        
        {/* 网格员排名 */}
        <GridWorkerRanking currentRole={currentRole} />
      </div>
    );
  }

  // 供电所专用界面
  if (currentRole.level === 'substation') {
    return (
      <div className="space-y-3">
        {/* 供电所概览卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 mb-1">管辖网格员</div>
                  <div className="text-2xl font-bold text-blue-700">
                    <AnimatedNumber value={statistics.totalGridWorkers} />
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-600 mb-1">任务完成率</div>
                  <div className="text-2xl font-bold text-green-700">
                    <AnimatedNumber value={statistics.completionRate} suffix="%" />
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 供电所排名 */}
        <PowerSupplyRanking currentRole={currentRole} />
      </div>
    );
  }

  // 管理层级界面（省市县）- 整合任务进度和数据量统计
  return (
    <div className="space-y-3">
      {/* 管理层概览 */}
      <div className="grid grid-cols-2 gap-3">
        <Card 
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={onUnitsDetailClick}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 mb-1">管辖单位</div>
                <div className="text-2xl font-bold text-blue-700">
                  <AnimatedNumber value={statistics.totalUnits} />
                </div>
                <div className="text-xs text-blue-500">点击查看详情</div>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600 mb-1">数据质量</div>
                <div className="text-2xl font-bold text-green-700">
                  <AnimatedNumber value={statistics.dataQuality} suffix="%" />
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 整合的任务进度与数据量统计 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-5 w-5" />
            任务进度与数据量统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 整体进度展示 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">总体任务完成度</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  <AnimatedNumber value={statistics.overallCompletion} suffix="%" />
                </div>
              </div>
              <Progress value={statistics.overallCompletion} className="h-3 mb-2" />
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    <AnimatedNumber value={tasks.completedToday} />
                  </div>
                  <div className="text-xs text-gray-600">已完成</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    <AnimatedNumber value={tasks.inProgressTasks} />
                  </div>
                  <div className="text-xs text-gray-600">进行中</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">
                    <AnimatedNumber value={tasks.urgentTasks} />
                  </div>
                  <div className="text-xs text-gray-600">待处理</div>
                </div>
              </div>
            </div>

            {/* AI处理统计 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">AI智能处理统计</span>
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  <AnimatedNumber value={statistics.aiProcessingRate} suffix="%" />
                </div>
              </div>
              <Progress value={statistics.aiProcessingRate} className="h-3 mb-2" />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    <AnimatedNumber value={tasks.aiProcessed} />
                  </div>
                  <div className="text-xs text-gray-600">AI处理量</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    <AnimatedNumber value={statistics.dataProcessingProgress} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">处理进度</div>
                </div>
              </div>
            </div>

            {/* 数据量统计矩阵 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-800">数据处理量统计</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                  <div className="p-2 bg-blue-500 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-700">
                      <AnimatedNumber value={tasks.totalProcessed} />
                    </div>
                    <div className="text-xs text-blue-600">已处理总量</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                  <div className="p-2 bg-green-500 rounded-full">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-700">
                      <AnimatedNumber value={tasks.aiProcessed} />
                    </div>
                    <div className="text-xs text-green-600">AI智能处理</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                  <div className="p-2 bg-orange-500 rounded-full">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-700">
                      <AnimatedNumber value={tasks.pendingData} />
                    </div>
                    <div className="text-xs text-orange-600">待处理数据</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                  <div className="p-2 bg-red-500 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-700">
                      <AnimatedNumber value={tasks.errorData} />
                    </div>
                    <div className="text-xs text-red-600">异常数据量</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 关键指标趋势 */}
            <div className="grid grid-cols-3 gap-2">
              <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-3">
                  <div className="text-lg font-bold text-green-600">
                    <AnimatedNumber value={Math.round((tasks.completedToday / tasks.totalToday) * 100)} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">完成率</div>
                  <div className="text-xs text-green-600 mt-1">↗ +2.3%</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-3">
                  <div className="text-lg font-bold text-blue-600">
                    <AnimatedNumber value={Math.round((tasks.aiProcessed / tasks.totalProcessed) * 100)} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">AI处理率</div>
                  <div className="text-xs text-blue-600 mt-1">↗ +5.1%</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-3">
                  <div className="text-lg font-bold text-purple-600">
                    <AnimatedNumber value={Math.round(((tasks.totalProcessed - tasks.errorData) / tasks.totalProcessed) * 100)} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500">质量率</div>
                  <div className="text-xs text-purple-600 mt-1">↗ +1.8%</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LevelHomepage;
