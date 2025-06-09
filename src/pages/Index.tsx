
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  ChartBar, 
  User, 
  Settings, 
  Bell, 
  Search,
  Phone,
  MessageSquare,
  Check,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import AIAssistant from '@/components/AIAssistant';
import AnalyticsReports from '@/components/AnalyticsReports';
import TaskManagement from '@/components/TaskManagement';
import VirtualAvatar from '@/components/VirtualAvatar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [dataQuality, setDataQuality] = useState({
    completeness: 92,
    accuracy: 95,
    consistency: 88,
    timeliness: 90,
    compliance: 94,
    uniqueness: 96
  });

  const [treatmentStats, setTreatmentStats] = useState({
    autoTreatmentRate: 90,
    accuracy: 100,
    abnormalDetectionRate: 92,
    callSuccessRate: 85,
    smsResponseRate: 80
  });

  // 员工任务相关状态
  const [employeeTasks, setEmployeeTasks] = useState({
    pendingTasks: 12,
    urgentTasks: 3,
    completedToday: 8,
    efficiency: 95.2
  });

  const radarData = [
    {
      dimension: '完整性',
      current: dataQuality.completeness,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '准确性',
      current: dataQuality.accuracy,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '一致性',
      current: dataQuality.consistency,
      target: 94,
      fullMark: 100
    },
    {
      dimension: '时效性',
      current: dataQuality.timeliness,
      target: 90,
      fullMark: 100
    },
    {
      dimension: '合规性',
      current: dataQuality.compliance,
      target: 95,
      fullMark: 100
    },
    {
      dimension: '唯一性',
      current: dataQuality.uniqueness,
      target: 95,
      fullMark: 100
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDataQuality(prev => ({
        ...prev,
        completeness: Math.min(95, prev.completeness + Math.random() * 0.5),
        accuracy: Math.min(98, prev.accuracy + Math.random() * 0.3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const overallScore = Math.round(
    (dataQuality.completeness + dataQuality.accuracy + dataQuality.consistency + 
     dataQuality.timeliness + dataQuality.compliance + dataQuality.uniqueness) / 6
  );

  const renderDashboard = () => (
    <div className="space-y-4 p-4 pb-20">
      {/* 员工工作台 - 突出任务处理功能 */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">我的工作台</h2>
              <p className="text-blue-100 text-sm">今日任务处理概览</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{employeeTasks.efficiency}%</div>
              <div className="text-xs text-blue-100">工作效率</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-200">{employeeTasks.pendingTasks}</div>
              <div className="text-xs text-blue-100">待处理</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-200">{employeeTasks.urgentTasks}</div>
              <div className="text-xs text-blue-100">紧急任务</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">{employeeTasks.completedToday}</div>
              <div className="text-xs text-blue-100">今日完成</div>
            </div>
          </div>
          
          <Button 
            onClick={() => setActiveTab('tasks')}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            立即处理任务
          </Button>
        </CardContent>
      </Card>

      {/* 任务快速操作区 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tasks')}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            <div className="font-medium text-sm">待处理任务</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">{employeeTasks.pendingTasks}</div>
            <div className="text-xs text-gray-500 mt-1">需要您的处理</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tasks')}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="font-medium text-sm">紧急任务</div>
            <div className="text-2xl font-bold text-red-600 mt-1">{employeeTasks.urgentTasks}</div>
            <div className="text-xs text-gray-500 mt-1">优先处理</div>
          </CardContent>
        </Card>
      </div>

      {/* 功能快捷入口 - 优化布局 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer"
              onClick={() => setActiveTab('analytics')}>
          <CardContent className="p-4 text-center">
            <ChartBar className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium text-sm">数据分析</div>
            <div className="text-xs text-green-100 mt-1">分析与报告</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 transition-all cursor-pointer"
              onClick={() => setActiveTab('ai-assistant')}>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium text-sm">AI助手</div>
            <div className="text-xs text-purple-100 mt-1">智能咨询</div>
          </CardContent>
        </Card>
      </div>

      {/* 今日已完成任务展示 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            今日完成任务
            <Badge variant="secondary" className="text-xs">
              {employeeTasks.completedToday}个
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">地址信息补全</div>
                  <div className="text-xs text-gray-500">完成时间: 13:45</div>
                </div>
              </div>
              <Badge className="bg-green-500 text-xs">已完成</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">证照有效期检查</div>
                  <div className="text-xs text-gray-500">完成时间: 11:20</div>
                </div>
              </div>
              <Badge className="bg-green-500 text-xs">已完成</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据质量概览 - 简化显示 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-blue-500" />
            数据质量概览
            <Badge variant="secondary" className="text-xs">
              {overallScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {radarData.slice(0, 4).map((item) => {
              const getStatusColor = (current, target) => {
                if (current >= target) return 'text-green-600';
                if (current >= target - 5) return 'text-yellow-600';
                return 'text-red-600';
              };

              return (
                <div key={item.dimension} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                  <span className="font-medium">{item.dimension}</span>
                  <div className="flex items-center gap-1">
                    <span className={`font-semibold ${getStatusColor(item.current, item.target)}`}>
                      {item.current.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">数据治理智能体</h1>
            <p className="text-xs text-gray-500">AI驱动的数据治理平台</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'ai-assistant' && <AIAssistant />}
        {activeTab === 'analytics' && <AnalyticsReports />}
        {activeTab === 'tasks' && <TaskManagement />}
      </div>

      {/* 悬浮数智人助手 */}
      <div className="fixed bottom-24 right-4 z-20">
        <div 
          className="relative cursor-pointer transform transition-transform hover:scale-110"
          onClick={() => setActiveTab('ai-assistant')}
        >
          <VirtualAvatar />
          <div className="absolute -top-8 -left-6 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
            AI助手
          </div>
        </div>
      </div>

      {/* 底部导航栏 - 合并分析和报告 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('dashboard')}
          >
            <Database className="h-4 w-4" />
            <span>工作台</span>
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('analytics')}
          >
            <ChartBar className="h-4 w-4" />
            <span>分析报告</span>
          </Button>
          <Button
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('tasks')}
          >
            <Check className="h-4 w-4" />
            <span>任务处理</span>
          </Button>
          <Button
            variant={activeTab === 'ai-assistant' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('ai-assistant')}
          >
            <MessageSquare className="h-4 w-4" />
            <span>AI助手</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
