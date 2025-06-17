
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Users,
  Activity
} from 'lucide-react';
import { Role } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface Unit {
  id: number;
  name: string;
  type: string;
  governanceProgress: number;
  dataQuality: number;
  taskCompletion: number;
  totalTasks: number;
  completedTasks: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  region: string;
  employees: number;
}

interface UnitsDetailProps {
  currentRole: Role;
  onBack: () => void;
}

const UnitsDetail: React.FC<UnitsDetailProps> = ({ currentRole, onBack }) => {
  const [sortBy, setSortBy] = useState<'governance' | 'quality' | 'completion'>('governance');

  // 模拟数据 - 根据角色层级生成不同的管辖单位
  const generateUnits = (): Unit[] => {
    if (currentRole.level === 'province') {
      return [
        {
          id: 1,
          name: '太原供电公司',
          type: '地市公司',
          governanceProgress: 94.2,
          dataQuality: 96.1,
          taskCompletion: 92.5,
          totalTasks: 1245,
          completedTasks: 1152,
          trend: 'up',
          trendValue: 2.3,
          region: '太原市',
          employees: 2850
        },
        {
          id: 2,
          name: '大同供电公司',
          type: '地市公司',
          governanceProgress: 91.8,
          dataQuality: 93.4,
          taskCompletion: 89.2,
          totalTasks: 1156,
          completedTasks: 1031,
          trend: 'up',
          trendValue: 1.8,
          region: '大同市',
          employees: 2340
        },
        {
          id: 3,
          name: '运城供电公司',
          type: '地市公司',
          governanceProgress: 88.5,
          dataQuality: 90.2,
          taskCompletion: 86.7,
          totalTasks: 1089,
          completedTasks: 944,
          trend: 'stable',
          trendValue: 0.2,
          region: '运城市',
          employees: 2180
        },
        {
          id: 4,
          name: '晋中供电公司',
          type: '地市公司',
          governanceProgress: 87.2,
          dataQuality: 89.1,
          taskCompletion: 85.3,
          totalTasks: 987,
          completedTasks: 842,
          trend: 'down',
          trendValue: -0.8,
          region: '晋中市',
          employees: 1950
        },
        {
          id: 5,
          name: '临汾供电公司',
          type: '地市公司',
          governanceProgress: 85.9,
          dataQuality: 87.8,
          taskCompletion: 83.1,
          totalTasks: 912,
          completedTasks: 758,
          trend: 'up',
          trendValue: 1.2,
          region: '临汾市',
          employees: 1820
        }
      ];
    } else if (currentRole.level === 'city') {
      return [
        {
          id: 1,
          name: '迎泽区供电所',
          type: '区县供电所',
          governanceProgress: 93.1,
          dataQuality: 94.2,
          taskCompletion: 91.8,
          totalTasks: 156,
          completedTasks: 143,
          trend: 'up',
          trendValue: 3.2,
          region: '迎泽区',
          employees: 45
        },
        {
          id: 2,
          name: '小店区供电所',
          type: '区县供电所',
          governanceProgress: 89.7,
          dataQuality: 91.5,
          taskCompletion: 88.2,
          totalTasks: 134,
          completedTasks: 118,
          trend: 'up',
          trendValue: 1.9,
          region: '小店区',
          employees: 38
        },
        {
          id: 3,
          name: '杏花岭区供电所',
          type: '区县供电所',
          governanceProgress: 86.3,
          dataQuality: 88.1,
          taskCompletion: 84.6,
          totalTasks: 128,
          completedTasks: 108,
          trend: 'stable',
          trendValue: 0.1,
          region: '杏花岭区',
          employees: 42
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: '网格A区域',
          type: '网格区域',
          governanceProgress: 91.2,
          dataQuality: 92.8,
          taskCompletion: 89.5,
          totalTasks: 28,
          completedTasks: 25,
          trend: 'up',
          trendValue: 2.1,
          region: '城南片区',
          employees: 8
        },
        {
          id: 2,
          name: '网格B区域',
          type: '网格区域',
          governanceProgress: 87.6,
          dataQuality: 89.3,
          taskCompletion: 85.2,
          totalTasks: 31,
          completedTasks: 26,
          trend: 'stable',
          trendValue: -0.3,
          region: '城北片区',
          employees: 6
        }
      ];
    }
  };

  const units = generateUnits();

  const sortedUnits = [...units].sort((a, b) => {
    switch (sortBy) {
      case 'governance':
        return b.governanceProgress - a.governanceProgress;
      case 'quality':
        return b.dataQuality - a.dataQuality;
      case 'completion':
        return b.taskCompletion - a.taskCompletion;
      default:
        return b.governanceProgress - a.governanceProgress;
    }
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">管辖单位详情</h1>
          <p className="text-sm text-gray-600">{currentRole.name} - 按治理进度排名</p>
        </div>
      </div>

      {/* 排序选择 */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={sortBy === 'governance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('governance')}
        >
          治理进度
        </Button>
        <Button
          variant={sortBy === 'quality' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('quality')}
        >
          数据质量
        </Button>
        <Button
          variant={sortBy === 'completion' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('completion')}
        >
          任务完成率
        </Button>
      </div>

      {/* 单位列表 */}
      <div className="space-y-3">
        {sortedUnits.map((unit, index) => (
          <Card key={unit.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{unit.region}</span>
                      <Badge variant="outline" className="text-xs">
                        {unit.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-blue-600">
                      <AnimatedNumber value={unit.governanceProgress} suffix="%" />
                    </span>
                    {getTrendIcon(unit.trend)}
                  </div>
                  <div className={`text-xs ${getTrendColor(unit.trend)}`}>
                    {unit.trend === 'up' ? '+' : unit.trend === 'down' ? '' : '±'}
                    <AnimatedNumber value={Math.abs(unit.trendValue)} suffix="%" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    <AnimatedNumber value={unit.dataQuality} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">数据质量</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    <AnimatedNumber value={unit.taskCompletion} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">任务完成率</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" />
                    <AnimatedNumber value={unit.employees} />
                  </div>
                  <div className="text-xs text-gray-600">员工数</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">治理进度</span>
                  <span className="font-medium">
                    <AnimatedNumber value={unit.governanceProgress} suffix="%" />
                  </span>
                </div>
                <Progress value={unit.governanceProgress} className="h-2" />
              </div>

              <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <span>任务进度: {unit.completedTasks}/{unit.totalTasks}</span>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>活跃度: 高</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnitsDetail;
