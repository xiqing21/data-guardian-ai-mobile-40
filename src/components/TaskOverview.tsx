
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertTriangle } from 'lucide-react';

interface TaskOverviewProps {
  overallProgress: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({
  overallProgress,
  completedTasks,
  inProgressTasks,
  pendingTasks
}) => {
  const totalTasks = completedTasks + inProgressTasks + pendingTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="mb-6 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            任务总体进度
          </div>
          <Badge variant="outline" className="text-blue-600">
            {completionRate}% 完成率
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 整体进度条 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">整体完成度</span>
              <span className="text-lg font-bold text-blue-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* 任务统计卡片 */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-gray-600 mt-1">已完成</div>
              <div className="text-xs text-green-600 mt-1">
                ✓ {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-gray-600 mt-1">进行中</div>
              <div className="text-xs text-blue-600 mt-1">
                → {totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}%
              </div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-600">{pendingTasks}</div>
              <div className="text-sm text-gray-600 mt-1">待处理</div>
              <div className="text-xs text-gray-600 mt-1">
                ⏳ {totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* 进度提示 */}
          {overallProgress >= 90 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">进度良好！即将完成所有任务</span>
              </div>
            </div>
          )}
          
          {overallProgress < 50 && pendingTasks > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">建议优先处理待办任务以提升整体进度</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskOverview;
