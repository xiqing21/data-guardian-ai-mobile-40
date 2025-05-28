
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AISmartAssignment: React.FC = () => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">🤖 AI智能任务分配</h3>
            <p className="text-purple-100 text-sm">基于工作负载和技能匹配自动分配</p>
          </div>
          <Button variant="secondary" size="sm">
            重新分配
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISmartAssignment;
