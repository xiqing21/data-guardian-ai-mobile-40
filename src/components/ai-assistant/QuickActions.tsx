
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const quickActions = [
    { label: '查看任务状态', message: '当前任务状态如何？' },
    { label: '数据质量分析', message: '帮我分析数据质量' },
    { label: 'AI智能分配', message: '启动AI智能任务分配' },
    { label: '异常检测', message: '检查是否有数据异常' }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onActionClick(action.message)}
          className="text-xs h-8"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
