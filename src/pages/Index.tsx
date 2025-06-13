
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
  ArrowRight,
  Plus,
  Bot,
  Zap,
  Brain,
  Target,
  Activity,
  MapPin,
  Building2,
  ChevronDown
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
  const [selectedUnit, setSelectedUnit] = useState('浙江省电力公司');
  
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
    inProgressTasks: 7,
    completedToday: 8,
    totalToday: 28
  });

  // AI智能体状态 - 整合后的状态
  const [integratedAIStatus, setIntegratedAIStatus] = useState({
    activeAgents: 5,
    processingTasks: 23,
    completionRate: 96.8,
    pendingAutoTasks: 8,
    aiProcessingTasks: 15
  });

  // 供电所单位列表
  const powerUnits = [
    '浙江省电力公司',
    '杭州市电力公司',
    '西湖区供电公司',
    '文一路供电所',
    '转塘供电所'
  ];

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
      
      // 更新整合后的AI状态
      setIntegratedAIStatus(prev => ({
        ...prev,
        processingTasks: Math.max(15, prev.processingTasks + Math.floor(Math.random() * 10 - 5)),
        aiProcessingTasks: Math.max(10, prev.aiProcessingTasks + Math.floor(Math.random() * 6 - 3))
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
      {/* 整合后的AI智能工作台 - 支持单位切换 */}
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
        <CardContent className="p-5 relative z-10">
          {/* 背景装饰元素 */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>
          
          {/* 头部区域 - 单位切换 */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI智能工作台</h2>
                <div className="flex items-center gap-2 text-indigo-100 text-sm">
                  <MapPin className="h-3 w-3" />
                  <select 
                    value={selectedUnit} 
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border-0 rounded px-2 py-1 text-white text-sm outline-none"
                  >
                    {powerUnits.map(unit => (
                      <option key={unit} value={unit} className="text-gray-900">{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{integratedAIStatus.completionRate}%</div>
              <div className="text-xs text-indigo-100">完成率</div>
            </div>
          </div>
          
          {/* 整合后的任务状态统一展示 */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-orange-200">{employeeTasks.pendingTasks}</div>
              <div className="text-xs text-indigo-100">待处理</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-blue-200">{employeeTasks.inProgressTasks}</div>
              <div className="text-xs text-indigo-100">进行中</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-red-200">{employeeTasks.urgentTasks}</div>
              <div className="text-xs text-indigo-100">紧急</div>
            </div>
            <div className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3">
              <div className="text-lg font-bold text-cyan-200">{integratedAIStatus.activeAgents}</div>
              <div className="text-xs text-indigo-100">AI协作</div>
            </div>
          </div>

          {/* 整合后的AI智能体实时状态 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="h-4 w-4 text-purple-200" />
              <span className="text-sm font-medium">AI智能体实时处理状态</span>
              <Badge className="bg-green-500 text-xs px-2 py-1">运行中</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center">
                <div className="text-base font-bold text-yellow-200">{integratedAIStatus.aiProcessingTasks}</div>
                <div className="text-purple-100">AI处理中</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-orange-200">{integratedAIStatus.pendingAutoTasks}</div>
                <div className="text-purple-100">待自动化</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-cyan-200">{integratedAIStatus.completionRate}%</div>
                <div className="text-purple-100">完成率</div>
              </div>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={() => setActiveTab('tasks')}
              className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-xs backdrop-blur-sm transition-all duration-200"
            >
              <Target className="h-3 w-3 mr-1" />
              处理任务
            </Button>
            <Button 
              onClick={() => setActiveTab('tasks')}
              className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-xs backdrop-blur-sm transition-all duration-200"
            >
              <Plus className="h-3 w-3 mr-1" />
              新建任务
            </Button>
            <Button 
              onClick={() => setActiveTab('analytics')}
              className="bg-white/20 hover:bg-white/25 text-white border-white/30 text-xs backdrop-blur-sm transition-all duration-200"
            >
              <ChartBar className="h-3 w-3 mr-1" />
              分析报告
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 今日任务概览 - 改为包含所有状态 */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-blue-500" />
            今日任务概览
            <Badge variant="secondary" className="text-xs">
              {employeeTasks.totalToday}个
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{employeeTasks.completedToday}</div>
              <div className="text-xs text-gray-500">已完成</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{employeeTasks.inProgressTasks}</div>
              <div className="text-xs text-gray-500">进行中</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{employeeTasks.pendingTasks}</div>
              <div className="text-xs text-gray-500">待处理</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{employeeTasks.urgentTasks}</div>
              <div className="text-xs text-gray-500">紧急</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">地址信息补全</div>
                  <div className="text-xs text-gray-500">13:45完成</div>
                </div>
              </div>
              <Badge className="bg-green-500 text-xs">已完成</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">手机号异常检测</div>
                  <div className="text-xs text-gray-500">进行中 75%</div>
                </div>
              </div>
              <Badge className="bg-blue-500 text-xs">进行中</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 网格区域数据质量六边形雷达评价图 */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-blue-500" />
            网格区域数据质量评价
            <Badge variant="secondary" className="text-xs">
              {overallScore}分
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10 }}
                  tickCount={6}
                />
                <Radar
                  name="当前值"
                  dataKey="current"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="目标值"
                  dataKey="target"
                  stroke="#10b981"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`, 
                    name === 'current' ? '当前值' : '目标值'
                  ]}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* 质量指标快速概览 */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-sm font-medium text-green-700">优秀</div>
              <div className="text-xs text-gray-500">准确性 唯一性</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="text-sm font-medium text-yellow-700">良好</div>
              <div className="text-xs text-gray-500">完整性 合规性</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <div className="text-sm font-medium text-orange-700">待改进</div>
              <div className="text-xs text-gray-500">一致性 时效性</div>
            </div>
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
            AI数智人
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
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
