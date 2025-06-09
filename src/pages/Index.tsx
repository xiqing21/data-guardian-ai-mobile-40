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
  TrendingUp
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
import DataAnalytics from '@/components/DataAnalytics';
import TaskManagement from '@/components/TaskManagement';
import VirtualAvatar from '@/components/VirtualAvatar';
import DataGovernanceReport from '@/components/DataGovernanceReport';
import ReportEffectiveness from '@/components/ReportEffectiveness';

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
      {/* 数据治理功能快捷入口 - 简化设计 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer border-0 shadow-sm"
              onClick={() => setActiveTab('report')}>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium text-sm">工作报告</div>
            <div className="text-xs text-green-100 mt-1">生成治理报告</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 transition-all cursor-pointer border-0 shadow-sm"
              onClick={() => setActiveTab('effectiveness')}>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium text-sm">治理成效</div>
            <div className="text-xs text-purple-100 mt-1">成效分析评估</div>
          </CardContent>
        </Card>
      </div>

      {/* 数据质量雷达图总览 - 简化样式 */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-blue-500" />
            数据质量总览
            <Badge variant="secondary" className="ml-2 text-xs">
              {overallScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" className="text-xs" />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={false}
                />
                <Radar
                  name="当前值"
                  dataKey="current"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="目标值"
                  dataKey="target"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {radarData.map((item) => {
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
                    <span className="text-gray-500">
                      ({item.target}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI治理成效 - 简化布局 */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <ChartBar className="h-4 w-4 text-green-500" />
            AI治理成效
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {treatmentStats.autoTreatmentRate}%
              </div>
              <div className="text-xs text-gray-600 mt-1">自动化整改率</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                {treatmentStats.accuracy}%
              </div>
              <div className="text-xs text-gray-600 mt-1">准确性</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">
                {treatmentStats.abnormalDetectionRate}%
              </div>
              <div className="text-xs text-gray-600 mt-1">异常研判准确率</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">
                {treatmentStats.callSuccessRate}%
              </div>
              <div className="text-xs text-gray-600 mt-1">外呼成功率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实时任务状态 - 简化设计 */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              今日任务
            </div>
            <Badge variant="outline" className="text-xs">3个活跃</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">手机号</Badge>
                <div>
                  <div className="text-sm font-medium">核查异常手机号</div>
                  <div className="text-xs text-gray-500">预计完成: 14:30</div>
                </div>
              </div>
              <Badge className="bg-orange-500 text-xs">待处理</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">地址</Badge>
                <div>
                  <div className="text-sm font-medium">地址信息补全</div>
                  <div className="text-xs text-gray-500">完成: 13:45</div>
                </div>
              </div>
              <Badge className="bg-green-500 text-xs">已完成</Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-3 text-sm"
            onClick={() => setActiveTab('tasks')}
          >
            查看全部任务
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 - 简化样式 */}
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
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'ai-assistant' && <AIAssistant />}
        {activeTab === 'analytics' && <DataAnalytics />}
        {activeTab === 'tasks' && <TaskManagement />}
        {activeTab === 'report' && <DataGovernanceReport />}
        {activeTab === 'effectiveness' && <ReportEffectiveness />}
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

      {/* 底部导航栏 - 简化设计 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('dashboard')}
          >
            <Database className="h-4 w-4" />
            <span>概览</span>
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('analytics')}
          >
            <ChartBar className="h-4 w-4" />
            <span>分析</span>
          </Button>
          <Button
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('tasks')}
          >
            <Check className="h-4 w-4" />
            <span>任务</span>
          </Button>
          <Button
            variant={activeTab === 'report' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
            onClick={() => setActiveTab('report')}
          >
            <FileText className="h-4 w-4" />
            <span>报告</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
