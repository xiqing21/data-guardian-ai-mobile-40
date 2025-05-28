
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
  Calendar
} from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';
import DataAnalytics from '@/components/DataAnalytics';
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

  useEffect(() => {
    // 模拟实时数据更新
    const interval = setInterval(() => {
      setDataQuality(prev => ({
        ...prev,
        completeness: Math.min(95, prev.completeness + Math.random() * 0.5),
        accuracy: Math.min(98, prev.accuracy + Math.random() * 0.3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6 p-4 pb-20">
      {/* AI 虚拟助手卡片 */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <VirtualAvatar />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">AI数据治理助手</h3>
              <p className="text-blue-100 text-sm">智能分析 • 实时监控 • 自动治理</p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2"
                onClick={() => setActiveTab('ai-assistant')}
              >
                开始对话
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据质量概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            数据质量总览
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(dataQuality).map(([key, value]) => {
            const labels = {
              completeness: '完整性',
              accuracy: '准确性', 
              consistency: '一致性',
              timeliness: '时效性',
              compliance: '合规性',
              uniqueness: '唯一性'
            };
            
            const getColor = (val) => {
              if (val >= 95) return 'text-green-600';
              if (val >= 85) return 'text-yellow-600';
              return 'text-red-600';
            };

            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{labels[key]}</span>
                  <span className={`text-sm font-bold ${getColor(value)}`}>
                    {value.toFixed(1)}%
                  </span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* AI治理成效 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-green-500" />
            AI治理成效
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {treatmentStats.autoTreatmentRate}%
              </div>
              <div className="text-sm text-gray-600">自动化整改率</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {treatmentStats.accuracy}%
              </div>
              <div className="text-sm text-gray-600">准确性</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {treatmentStats.abnormalDetectionRate}%
              </div>
              <div className="text-sm text-gray-600">异常研判准确率</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {treatmentStats.callSuccessRate}%
              </div>
              <div className="text-sm text-gray-600">外呼成功率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实时任务状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            今日任务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">手机号</Badge>
                <span className="text-sm">核查异常手机号</span>
              </div>
              <Badge variant="default">待处理</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">地址</Badge>
                <span className="text-sm">地址信息补全</span>
              </div>
              <Badge variant="default" className="bg-green-500">已完成</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">合同</Badge>
                <span className="text-sm">合同信息校验</span>
              </div>
              <Badge variant="default" className="bg-yellow-500">进行中</Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
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
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">数据治理智能体</h1>
            <p className="text-sm text-gray-500">AI驱动的数据治理平台</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
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
      </div>

      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab('dashboard')}
          >
            <Database className="h-5 w-5" />
            <span className="text-xs">概览</span>
          </Button>
          <Button
            variant={activeTab === 'ai-assistant' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab('ai-assistant')}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">AI助手</span>
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab('analytics')}
          >
            <ChartBar className="h-5 w-5" />
            <span className="text-xs">分析</span>
          </Button>
          <Button
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab('tasks')}
          >
            <Check className="h-5 w-5" />
            <span className="text-xs">任务</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
