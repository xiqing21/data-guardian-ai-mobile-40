
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
  ArrowRight,
  Brain,
  Target,
  BarChart3,
  FileText,
  Shield,
  Cpu
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

  const handleUnitsClick = () => {
    console.log('查看管理单位详情');
    // 这里可以添加跳转到管理单位详情页面的逻辑
  };

  const handleTotalTasksClick = () => {
    console.log('查看总任务详情');
    // 这里可以添加跳转到任务总览页面的逻辑
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
            <div 
              className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={handleUnitsClick}
            >
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <AnimatedNumber value={statistics.totalUnits} />
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-xs text-blue-100">管辖单位</div>
            </div>
            <div 
              className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={handleTotalTasksClick}
            >
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <AnimatedNumber value={statistics.totalTasks} />
                <ArrowRight className="h-4 w-4" />
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

      {/* AI智能体功能展示 */}
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
        <CardContent className="p-5 relative z-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI数据治理智能体</h2>
                <div className="flex items-center gap-2 text-indigo-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{currentRole.name}</span>
                  <Badge className="bg-white/20 text-xs px-2 py-0">省级管理</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <BarChart3 className="h-4 w-4 text-cyan-200" />
              </div>
              <div className="text-xs text-indigo-100">智能分析</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-green-200" />
              </div>
              <div className="text-xs text-indigo-100">任务分配</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Shield className="h-4 w-4 text-yellow-200" />
              </div>
              <div className="text-xs text-indigo-100">质量监控</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Cpu className="h-4 w-4 text-purple-200" />
              </div>
              <div className="text-xs text-indigo-100">决策支持</div>
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

      {/* 整合的AI智能工作台和任务完成情况 */}
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
        <CardContent className="p-5 relative z-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI智能作业中心</h2>
                <div className="flex items-center gap-2 text-indigo-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{currentRole.name}</span>
                  <Badge className="bg-white/20 text-xs px-2 py-0">作业智能体</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                <AnimatedNumber value={Math.round((tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100)} suffix="%" />
              </div>
              <div className="text-xs text-indigo-100">完成率</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-indigo-100">今日作业进度</span>
              <span className="text-sm font-medium">
                <AnimatedNumber value={tasks.completedToday} />/{tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks}
              </span>
            </div>
            <Progress 
              value={(tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100} 
              className="h-2 bg-white/20" 
            />
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="h-4 w-4 text-purple-200" />
              <span className="text-sm font-medium">AI作业智能体运行状态</span>
              <Badge className="bg-green-500 text-xs px-2 py-1">运行中</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center">
                <div className="text-base font-bold text-yellow-200">
                  <AnimatedNumber value={8} />
                </div>
                <div className="text-purple-100">AI处理中</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-orange-200">
                  <AnimatedNumber value={5} />
                </div>
                <div className="text-purple-100">待自动化</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-cyan-200">
                  <AnimatedNumber value={92.5} suffix="%" />
                </div>
                <div className="text-purple-100">智能化率</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div 
              className="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => onTaskDetailClick?.('completed')}
            >
              <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                <AnimatedNumber value={tasks.completedToday} />
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-xs text-gray-600">已完成</div>
            </div>
            <div 
              className="text-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={() => onTaskDetailClick?.('pending')}
            >
              <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-1">
                <AnimatedNumber value={tasks.pendingTasks + tasks.inProgressTasks} />
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-xs text-gray-600">待完成</div>
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

      {/* 整合的AI智能工作台 */}
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
        <CardContent className="p-5 relative z-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">我的AI工作助手</h2>
                <div className="flex items-center gap-2 text-indigo-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{currentRole.name}</span>
                  <Badge className="bg-white/20 text-xs px-2 py-0">个人助手</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                <AnimatedNumber 
                  value={Math.round((tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100)} 
                  suffix="%" 
                />
              </div>
              <div className="text-xs text-indigo-100">完成率</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-indigo-100">我的工作进度</span>
              <span className="text-sm font-medium">
                <AnimatedNumber value={tasks.completedToday} />/{tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks}
              </span>
            </div>
            <Progress 
              value={(tasks.completedToday / (tasks.completedToday + tasks.pendingTasks + tasks.inProgressTasks)) * 100} 
              className="h-2 bg-white/20" 
            />
          </div>

          <div className="space-y-2 mb-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div 
              className="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => onTaskDetailClick?.('completed')}
            >
              <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                <AnimatedNumber value={tasks.completedToday} />
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-xs text-gray-600">已完成</div>
            </div>
            <div 
              className="text-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={() => onTaskDetailClick?.('pending')}
            >
              <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-1">
                <AnimatedNumber value={tasks.pendingTasks + tasks.inProgressTasks} />
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-xs text-gray-600">待完成</div>
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
              <div 
                className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={handleUnitsClick}
              >
                <div className="text-lg font-bold flex items-center justify-center gap-1">
                  <AnimatedNumber value={statistics.totalUnits} />
                  <ArrowRight className="h-4 w-4" />
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

        {/* AI智能体功能展示 */}
        <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
          <CardContent className="p-5 relative z-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI数据治理智能体</h2>
                  <div className="flex items-center gap-2 text-indigo-100 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{currentRole.name}</span>
                    <Badge className="bg-white/20 text-xs px-2 py-0">
                      {currentRole.level === 'city' ? '地市管理' : '区县管理'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <BarChart3 className="h-4 w-4 text-cyan-200" />
                </div>
                <div className="text-xs text-indigo-100">智能分析</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Target className="h-4 w-4 text-green-200" />
                </div>
                <div className="text-xs text-indigo-100">任务调度</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Shield className="h-4 w-4 text-yellow-200" />
                </div>
                <div className="text-xs text-indigo-100">质量监控</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <FileText className="h-4 w-4 text-purple-200" />
                </div>
                <div className="text-xs text-indigo-100">报告生成</div>
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
