
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Calendar } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
  aiResult?: any;
  confirmationData?: any;
}

interface TaskCardProps {
  task: Task;
  onTaskSelect: (task: Task) => void;
  onAIProcess: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskSelect, onAIProcess }) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: '待处理', variant: 'secondary' },
      'in-progress': { label: '进行中', variant: 'default' },
      'completed': { label: '已完成', variant: 'default', className: 'bg-green-500' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      'high': { label: '高', className: 'bg-red-500 text-white' },
      'medium': { label: '中', className: 'bg-yellow-500 text-white' },
      'low': { label: '低', className: 'bg-gray-500 text-white' }
    };
    return priorityMap[priority] || priorityMap.medium;
  };

  const statusBadge = getStatusBadge(task.status);
  const priorityBadge = getPriorityBadge(task.priority);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              {task.autoProcessable && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600">
                  🤖 AI可处理
                </Badge>
              )}
              {task.aiResult && (
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600">
                  ✨ AI已处理
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge {...statusBadge} className={statusBadge.className}>
              {statusBadge.label}
            </Badge>
            <Badge className={priorityBadge.className}>
              {priorityBadge.label}优先级
            </Badge>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">进度</span>
            <span className="text-sm font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        {/* AI处理结果预览 */}
        {task.aiResult && (
          <div className="mb-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs">
                AI处理结果
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold">{task.aiResult.auto_resolved || task.aiResult.auto_completed || task.aiResult.auto_verified || 0}</div>
                <div className="text-gray-600">自动处理</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{task.aiResult.accuracy || task.aiResult.completion_rate || 0}%</div>
                <div className="text-gray-600">准确率</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{task.aiResult.processing_time || '未知'}</div>
                <div className="text-gray-600">处理时间</div>
              </div>
            </div>
          </div>
        )}

        {/* 任务详情 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{task.assignee}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{task.deadline}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {task.status !== 'completed' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onTaskSelect(task)}
                >
                  网格员处理
                </Button>
                {task.autoProcessable && (
                  <Button 
                    size="sm" 
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => onAIProcess(task)}
                  >
                    AI智能处理
                  </Button>
                )}
              </>
            )}
            {task.status === 'completed' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onTaskSelect(task)}
              >
                查看详情
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
