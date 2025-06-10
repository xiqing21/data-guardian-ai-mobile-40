
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts';

const AnalyticsReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  // 分析数据
  const analyticsData = {
    qualityTrends: [
      { date: '01-01', completeness: 88, accuracy: 92, consistency: 85, volume: 120000 },
      { date: '01-08', completeness: 90, accuracy: 93, consistency: 87, volume: 135000 },
      { date: '01-15', completeness: 92, accuracy: 94, consistency: 89, volume: 142000 },
      { date: '01-22', completeness: 94, accuracy: 95, consistency: 91, volume: 158000 },
      { date: '01-29', completeness: 95, accuracy: 96, consistency: 92, volume: 165000 }
    ],
    categoryAnalysis: [
      { category: '手机号', processed: 12470, success: 11223, rate: 90.0, efficiency: 95 },
      { category: '地址', processed: 8950, success: 8507, rate: 95.1, efficiency: 98 },
      { category: '合同', processed: 3420, success: 2993, rate: 87.5, efficiency: 89 },
      { category: '证照', processed: 1680, success: 1428, rate: 85.0, efficiency: 92 },
    ],
    dataDistribution: [
      { name: '正常数据', value: 78, color: '#22c55e' },
      { name: '待处理', value: 12, color: '#f59e0b' },
      { name: '异常数据', value: 8, color: '#ef4444' },
      { name: '已修复', value: 2, color: '#8b5cf6' }
    ],
    performanceMetrics: [
      { time: '00:00', cpu: 45, memory: 60, network: 30 },
      { time: '04:00', cpu: 35, memory: 55, network: 25 },
      { time: '08:00', cpu: 75, memory: 80, network: 60 },
      { time: '12:00', cpu: 85, memory: 85, network: 70 },
      { time: '16:00', cpu: 90, memory: 90, network: 80 },
      { time: '20:00', cpu: 60, memory: 70, network: 45 },
    ],
    correlationData: [
      { accuracy: 95, efficiency: 98, volume: 150 },
      { accuracy: 92, efficiency: 94, volume: 140 },
      { accuracy: 89, efficiency: 90, volume: 130 },
      { accuracy: 96, efficiency: 99, volume: 160 },
      { accuracy: 88, efficiency: 87, volume: 125 },
      { accuracy: 94, efficiency: 96, volume: 145 },
    ]
  };

  // 报告数据
  const reportData = {
    summary: {
      totalDataVolume: 8657000,
      qualityScore: 92.1,
      governanceRate: 90.2,
      issuesResolved: 4267,
      efficiency: 95.8
    },
    trends: [
      { month: '1月', quality: 88, governance: 85, efficiency: 90 },
      { month: '2月', quality: 89, governance: 87, efficiency: 92 },
      { month: '3月', quality: 90, governance: 88, efficiency: 93 },
      { month: '4月', quality: 91, governance: 89, efficiency: 94 },
      { month: '5月', quality: 92, governance: 90, efficiency: 95 },
      { month: '6月', quality: 92.1, governance: 90.2, efficiency: 95.8 }
    ]
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleExportReport = () => {
    // 模拟导出功能
    console.log('导出报告...');
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部信息与导出功能 */}
      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">数据分析与报告</h1>
              <p className="text-blue-100">
                统一的数据治理分析与报告生成平台
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-3xl font-bold">{reportData.summary.qualityScore}%</div>
                <div className="text-sm text-blue-100">综合治理得分</div>
              </div>
              {/* 导出功能提升到顶部 */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      生成中...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      生成报告
                    </div>
                  )}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleExportReport}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  导出PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">实时分析</TabsTrigger>
          <TabsTrigger value="trends">趋势监控</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
          <TabsTrigger value="correlation">关联分析</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          {/* 关键指标概览 */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(reportData.summary.totalDataVolume / 10000).toFixed(0)}万
                </div>
                <div className="text-sm text-gray-600 mt-1">数据总量</div>
                <div className="text-xs text-blue-600 mt-1">↗ 今日新增 2.3%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {reportData.summary.governanceRate}%
                </div>
                <div className="text-sm text-gray-600 mt-1">治理覆盖率</div>
                <div className="text-xs text-green-600 mt-1">↗ 实时提升中</div>
              </CardContent>
            </Card>
          </div>

          {/* 数据分布分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                数据质量分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={analyticsData.dataDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 分类处理成效 - 组合图表 */}
          <Card>
            <CardHeader>
              <CardTitle>分类处理统计</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={analyticsData.categoryAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="success" fill="#22c55e" name="成功处理" />
                  <Bar yAxisId="left" dataKey="processed" fill="#94a3b8" name="总数" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#8b5cf6" name="效率%" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* 数据质量趋势 - 面积图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据质量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.qualityTrends}>
                  <defs>
                    <linearGradient id="colorCompleteness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="completeness" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCompleteness)" name="完整性" />
                  <Area type="monotone" dataKey="accuracy" stackId="2" stroke="#22c55e" fillOpacity={1} fill="url(#colorAccuracy)" name="准确性" />
                  <Line type="monotone" dataKey="consistency" stroke="#8b5cf6" name="一致性" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 数据量变化趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                数据量变化趋势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analyticsData.qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="volume" stroke="#f59e0b" strokeWidth={3} name="数据量" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* 系统性能监控 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                系统性能监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.performanceMetrics}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cpu" stroke="#ef4444" fillOpacity={1} fill="url(#colorCpu)" name="CPU使用率%" />
                  <Area type="monotone" dataKey="memory" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMemory)" name="内存使用率%" />
                  <Area type="monotone" dataKey="network" stroke="#22c55e" fillOpacity={1} fill="url(#colorNetwork)" name="网络使用率%" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 实时状态指标 */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">1.2ms</div>
                <div className="text-sm text-gray-600">平均响应时间</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Database className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">系统可用性</div>
                <Progress value={99.9} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">2,450</div>
                <div className="text-sm text-gray-600">今日处理量</div>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          {/* 关联分析散点图 */}
          <Card>
            <CardHeader>
              <CardTitle>准确率与效率关联分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={analyticsData.correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="accuracy" name="准确率" unit="%" />
                  <YAxis dataKey="efficiency" name="效率" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="数据点" dataKey="volume" fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 本月治理亮点 */}
          <Card>
            <CardHeader>
              <CardTitle>本月治理亮点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">AI自动修复率突破90%</div>
                    <div className="text-sm text-gray-600">较上月提升5.2个百分点</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">数据完整性达到历史新高</div>
                    <div className="text-sm text-gray-600">完整性指标提升至96.5%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">平均处理时间缩短至1.2秒</div>
                    <div className="text-sm text-gray-600">处理效率提升23%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReports;
