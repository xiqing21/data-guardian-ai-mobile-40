
import React from 'react';
import { Role } from '../types/Role';
import GridWorkerWorkbench from './GridWorkerWorkbench';
import GridWorkerRanking from './GridWorkerRanking';
import PowerSupplyRanking from './PowerSupplyRanking';
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
  Zap
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

  // 管理层级界面（省市县）
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

      {/* 整体绩效指标 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            整体绩效指标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>任务完成率</span>
                <span className="font-medium">
                  <AnimatedNumber value={statistics.overallCompletion} suffix="%" />
                </span>
              </div>
              <Progress value={statistics.overallCompletion} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>数据治理覆盖率</span>
                <span className="font-medium">
                  <AnimatedNumber value={statistics.coverageRate} suffix="%" />
                </span>
              </div>
              <Progress value={statistics.coverageRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>智能化应用率</span>
                <span className="font-medium">
                  <AnimatedNumber value={statistics.aiAdoptionRate} suffix="%" />
                </span>
              </div>
              <Progress value={statistics.aiAdoptionRate} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-orange-600">
              <AnimatedNumber value={tasks.urgentTasks} />
            </div>
            <div className="text-xs text-gray-500">紧急任务</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-blue-600">
              <AnimatedNumber value={tasks.inProgressTasks} />
            </div>
            <div className="text-xs text-gray-500">进行中</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-green-600">
              <AnimatedNumber value={tasks.completedToday} />
            </div>
            <div className="text-xs text-gray-500">今日完成</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LevelHomepage;
