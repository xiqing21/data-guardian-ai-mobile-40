
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

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
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          任务总体进度
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">整体完成度</span>
            <span className="text-lg font-bold text-blue-600">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-gray-600">已完成</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-gray-600">进行中</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-600">{pendingTasks}</div>
              <div className="text-sm text-gray-600">待处理</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskOverview;
