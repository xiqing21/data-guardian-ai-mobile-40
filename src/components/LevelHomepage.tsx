
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  MapPin, 
  Zap, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  AlertTriangle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Role } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';
import PowerSupplyRanking from './PowerSupplyRanking';
import GridWorkerRanking from './GridWorkerRanking';

interface LevelHomepageProps {
  currentRole: Role;
  statistics: any;
  tasks: any;
  onTaskDetailClick?: (type: 'completed' | 'pending') => void;
}

const LevelHomepage: React.FC<LevelHomepageProps> = ({ 
  currentRole, 
  statistics, 
  tasks, 
  onTaskDetailClick 
}) => {
  const getLevelIcon = () => {
    switch (currentRole.level) {
      case 'province': return <Building2 className="h-6 w-6 text-blue-600" />;
      case 'city': return <Users className="h-6 w-6 text-green-600" />;
      case 'county': return <MapPin className="h-6 w-6 text-orange-600" />;
      case 'substation': return <Zap className="h-6 w-6 text-purple-600" />;
      case 'grid': return <Activity className="h-6 w-6 text-red-600" />;
      default: return <Building2 className="h-6 w-6" />;
    }
  };

  const getLevelColor = () => {
    switch (currentRole.level) {
      case 'province': return 'from-blue-500 to-blue-700';
      case 'city': return 'from-green-500 to-green-700';
      case 'county': return 'from-orange-500 to-orange-700';
      case 'substation': return 'from-purple-500 to-purple-700';
      case 'grid': return 'from-red-500 to-red-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const renderProvinceView = () => (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getLevelIcon()}
              <div>
                <h2 className="text-xl font-bold">{currentRole.name}</h2>
                <p className="text-blue-100">省级电力数据治理中心</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              省级管理
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                <AnimatedNumber value={statistics.totalUnits} />
              </div>
              <div className="text-xs text-blue-100">管辖单位</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                <AnimatedNumber value={statistics.totalTasks} />
              </div>
              <div className="text-xs text-blue-100">总任务数</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                <AnimatedNumber value={statistics.taskCompletion} suffix="%" />
              </div>
              <div className="text-xs text-blue-100">完成率</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                <AnimatedNumber value={statistics.dataQuality} suffix="%" />
              </div>
              <div className="text-xs text-blue-100">数据质量</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            全省任务完成进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">整体完成进度</span>
              <span className="text-sm font-medium">
                <AnimatedNumber value={statistics.taskCompletion} suffix="%" />
              </span>
            </div>
            <Progress value={statistics.taskCompletion} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div 
                className="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => onTaskDetailClick?.('completed')}
              >
                <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                  <AnimatedNumber value={statistics.completedTasks} />
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-600">已完成任务</div>
              </div>
              <div 
                className="text-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => onTaskDetailClick?.('pending')}
              >
                <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-1">
                  <AnimatedNumber value={statistics.totalTasks - statistics.completedTasks} />
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-600">待完成任务</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PowerSupplyRanking currentRole={currentRole} />
    </div>
  );

  const renderSubstationView = () => (
    <div className="space-y-4">
      <Card className={`border-0 shadow-lg bg-gradient-to-r ${getLevelColor()} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getLevelIcon()}
              <div>
                <h2 className="text-xl font-bold">{currentRole.name}</h2>
                <p className="text-purple-100">供电所作业中心</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              作业单位
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-orange-200">
                <AnimatedNumber value={tasks.pendingTasks} />
              </div>
              <div className="text-xs text-purple-100">待处理</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-blue-200">
                <AnimatedNumber value={tasks.inProgressTasks} />
              </div>
              <div className="text-xs text-purple-100">进行中</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-green-200">
                <AnimatedNumber value={tasks.completedToday} />
              </div>
              <div className="text-xs text-purple-100">今日完成</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-red-200">
                <AnimatedNumber value={tasks.urgentTasks} />
              </div>
              <div className="text-xs text-purple-100">紧急任务</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            今日任务完成情况
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">今日完成进度</span>
              <span className="text-sm font-medium">
                <AnimatedNumber value={Math.round((tasks.completedToday / tasks.totalToday) * 100)} suffix="%" />
              </span>
            </div>
            <Progress value={(tasks.completedToday / tasks.totalToday) * 100} className="h-2" />
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold text-blue-600">
                  <AnimatedNumber value={tasks.inProgressTasks} />
                </div>
                <div className="text-xs text-gray-600">进行中</div>
              </div>
              <div 
                className="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => onTaskDetailClick?.('completed')}
              >
                <div className="text-sm font-bold text-green-600 flex items-center justify-center gap-1">
                  <AnimatedNumber value={tasks.completedToday} />
                  <ArrowRight className="h-3 w-3" />
                </div>
                <div className="text-xs text-gray-600">已完成</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-sm font-bold text-red-600">
                  <AnimatedNumber value={tasks.urgentTasks} />
                </div>
                <div className="text-xs text-gray-600">紧急</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <GridWorkerRanking currentRole={currentRole} />
    </div>
  );

  const renderGridView = () => (
    <div className="space-y-4">
      <Card className={`border-0 shadow-lg bg-gradient-to-r ${getLevelColor()} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getLevelIcon()}
              <div>
                <h2 className="text-xl font-bold">{currentRole.name}</h2>
                <p className="text-red-100">网格作业员</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              一线作业
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-4">
              <div className="text-xl font-bold text-orange-200">
                <AnimatedNumber value={tasks.pendingTasks} />
              </div>
              <div className="text-xs text-red-100">我的待办</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-4">
              <div className="text-xl font-bold text-green-200">
                <AnimatedNumber value={tasks.completedToday} />
              </div>
              <div className="text-xs text-red-100">今日完成</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            我的工作进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">今日完成率</span>
              <span className="text-sm font-medium">
                <AnimatedNumber 
                  value={Math.round((tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100)} 
                  suffix="%" 
                />
              </span>
            </div>
            <Progress value={(tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100} className="h-2" />
            
            <div className="space-y-2">
              {tasks.urgentTasks > 0 && (
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700">紧急任务</span>
                  </div>
                  <Badge className="bg-red-500 text-xs">
                    <AnimatedNumber value={tasks.urgentTasks} />
                  </Badge>
                </div>
              )}
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-700">进行中任务</span>
                </div>
                <Badge className="bg-blue-500 text-xs">
                  <AnimatedNumber value={tasks.inProgressTasks} />
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <GridWorkerRanking currentRole={currentRole} />
    </div>
  );

  const renderDefaultView = () => {
    if (currentRole.level === 'province') return renderProvinceView();
    if (currentRole.level === 'substation') return renderSubstationView();
    if (currentRole.level === 'grid') return renderGridView();
    
    // 城市和县级的默认视图
    return (
      <div className="space-y-4">
        <Card className={`border-0 shadow-lg bg-gradient-to-r ${getLevelColor()} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getLevelIcon()}
                <div>
                  <h2 className="text-xl font-bold">{currentRole.name}</h2>
                  <p className="opacity-90">{currentRole.level === 'city' ? '地市级管理中心' : '区县级管理中心'}</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                {currentRole.level === 'city' ? '地市管理' : '区县管理'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold">
                  <AnimatedNumber value={statistics.totalUnits} />
                </div>
                <div className="text-xs opacity-90">管辖单位</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold">
                  <AnimatedNumber value={statistics.taskCompletion} suffix="%" />
                </div>
                <div className="text-xs opacity-90">完成率</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold">
                  <AnimatedNumber value={statistics.dataQuality} suffix="%" />
                </div>
                <div className="text-xs opacity-90">数据质量</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              任务完成进度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">整体完成进度</span>
                <span className="text-sm font-medium">
                  <AnimatedNumber value={statistics.taskCompletion} suffix="%" />
                </span>
              </div>
              <Progress value={statistics.taskCompletion} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div 
                  className="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => onTaskDetailClick?.('completed')}
                >
                  <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                    <AnimatedNumber value={statistics.completedTasks} />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-gray-600">已完成</div>
                </div>
                <div 
                  className="text-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => onTaskDetailClick?.('pending')}
                >
                  <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-1">
                    <AnimatedNumber value={statistics.totalTasks - statistics.completedTasks} />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-gray-600">待完成</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <PowerSupplyRanking currentRole={currentRole} />
      </div>
    );
  };

  return renderDefaultView();
};

export default LevelHomepage;
