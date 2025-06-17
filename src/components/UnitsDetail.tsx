
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
  Activity,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Target
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
  totalDataVolume: number; // GB
  processedDataVolume: number; // GB
  responsiblePerson: string;
  urgentTasks: number;
  overdueRate: number;
}

interface UnitsDetailProps {
  currentRole: Role;
  onBack: () => void;
}

const UnitsDetail: React.FC<UnitsDetailProps> = ({ currentRole, onBack }) => {
  const [sortBy, setSortBy] = useState<'governance' | 'quality' | 'completion'>('governance');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

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
          employees: 2850,
          totalDataVolume: 15680,
          processedDataVolume: 14579,
          responsiblePerson: '张明华',
          urgentTasks: 12,
          overdueRate: 3.2
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
          employees: 2340,
          totalDataVolume: 12340,
          processedDataVolume: 11015,
          responsiblePerson: '李建国',
          urgentTasks: 18,
          overdueRate: 5.1
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
          employees: 2180,
          totalDataVolume: 10890,
          processedDataVolume: 9442,
          responsiblePerson: '王德华',
          urgentTasks: 25,
          overdueRate: 7.3
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
          employees: 1950,
          totalDataVolume: 9870,
          processedDataVolume: 8420,
          responsiblePerson: '赵志强',
          urgentTasks: 31,
          overdueRate: 8.9
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
          employees: 1820,
          totalDataVolume: 9120,
          processedDataVolume: 7580,
          responsiblePerson: '陈建军',
          urgentTasks: 28,
          overdueRate: 9.8
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
          employees: 45,
          totalDataVolume: 1560,
          processedDataVolume: 1433,
          responsiblePerson: '刘敏',
          urgentTasks: 3,
          overdueRate: 2.1
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
          employees: 38,
          totalDataVolume: 1340,
          processedDataVolume: 1182,
          responsiblePerson: '孙伟',
          urgentTasks: 5,
          overdueRate: 4.2
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
          employees: 42,
          totalDataVolume: 1280,
          processedDataVolume: 1083,
          responsiblePerson: '马晓东',
          urgentTasks: 7,
          overdueRate: 6.3
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
          employees: 8,
          totalDataVolume: 280,
          processedDataVolume: 251,
          responsiblePerson: '周磊',
          urgentTasks: 1,
          overdueRate: 3.6
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
          employees: 6,
          totalDataVolume: 310,
          processedDataVolume: 264,
          responsiblePerson: '钱文静',
          urgentTasks: 2,
          overdueRate: 6.5
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

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleBackToList = () => {
    setSelectedUnit(null);
  };

  if (selectedUnit) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{selectedUnit.name}</h1>
            <p className="text-sm text-gray-600">详细信息</p>
          </div>
        </div>

        {/* 详细信息卡片 */}
        <div className="space-y-4">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">单位类型</span>
                    <Badge variant="outline">{selectedUnit.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">所在区域</span>
                    <span className="font-medium">{selectedUnit.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">责任主体</span>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{selectedUnit.responsiblePerson}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">员工数量</span>
                    <span className="font-medium">{selectedUnit.employees}人</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">总数据量</span>
                    <span className="font-medium">{selectedUnit.totalDataVolume}GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">已处理数据量</span>
                    <span className="font-medium text-green-600">{selectedUnit.processedDataVolume}GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数据治理详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                数据治理详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">治理进度</span>
                    <span className="font-bold text-blue-600">
                      <AnimatedNumber value={selectedUnit.governanceProgress} suffix="%" />
                    </span>
                  </div>
                  <Progress value={selectedUnit.governanceProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">数据质量</span>
                    <span className="font-bold text-green-600">
                      <AnimatedNumber value={selectedUnit.dataQuality} suffix="%" />
                    </span>
                  </div>
                  <Progress value={selectedUnit.dataQuality} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">数据处理率</span>
                    <span className="font-bold text-purple-600">
                      <AnimatedNumber value={(selectedUnit.processedDataVolume / selectedUnit.totalDataVolume) * 100} suffix="%" />
                    </span>
                  </div>
                  <Progress value={(selectedUnit.processedDataVolume / selectedUnit.totalDataVolume) * 100} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 任务完成情况 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                任务完成情况
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    <AnimatedNumber value={selectedUnit.completedTasks} />
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    已完成任务
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    责任主体: {selectedUnit.responsiblePerson}
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    <AnimatedNumber value={selectedUnit.totalTasks - selectedUnit.completedTasks} />
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                    待完成任务
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    责任主体: {selectedUnit.responsiblePerson}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">任务完成率</span>
                  <span className="font-bold text-blue-600">
                    <AnimatedNumber value={selectedUnit.taskCompletion} suffix="%" />
                  </span>
                </div>
                <Progress value={selectedUnit.taskCompletion} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      <AnimatedNumber value={selectedUnit.urgentTasks} />
                    </div>
                    <div className="text-xs text-gray-600">紧急任务</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      <AnimatedNumber value={selectedUnit.overdueRate} suffix="%" />
                    </div>
                    <div className="text-xs text-gray-600">逾期率</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <Card 
            key={unit.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleUnitClick(unit)}
          >
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
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <User className="h-3 w-3" />
                      <span>责任主体: {unit.responsiblePerson}</span>
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

              <div className="grid grid-cols-4 gap-3 mb-3">
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
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    <AnimatedNumber value={unit.totalDataVolume} />GB
                  </div>
                  <div className="text-xs text-gray-600">数据量</div>
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
                <div className="flex items-center gap-3">
                  {unit.urgentTasks > 0 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>紧急: {unit.urgentTasks}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>活跃度: 高</span>
                  </div>
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
