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
  ComposedChart,
  FunnelChart,
  Funnel,
  LabelList,
  Treemap
} from 'recharts';

const AnalyticsReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  // 分析数据
  const analyticsData = {
    qualityTrends: [
      { date: '01-01', completeness: 88, accuracy: 92, consistency: 85, volume: 120000, processed: 115000, errors: 5000 },
      { date: '01-08', completeness: 90, accuracy: 93, consistency: 87, volume: 135000, processed: 130000, errors: 5000 },
      { date: '01-15', completeness: 92, accuracy: 94, consistency: 89, volume: 142000, processed: 138000, errors: 4000 },
      { date: '01-22', completeness: 94, accuracy: 95, consistency: 91, volume: 158000, processed: 155000, errors: 3000 },
      { date: '01-29', completeness: 95, accuracy: 96, consistency: 92, volume: 165000, processed: 163000, errors: 2000 },
      { date: '02-05', completeness: 96, accuracy: 97, consistency: 93, volume: 172000, processed: 170000, errors: 2000 },
      { date: '02-12', completeness: 97, accuracy: 98, consistency: 94, volume: 185000, processed: 183000, errors: 2000 }
    ],
    volumeTrends: [
      { month: '1月', total: 850000, processed: 820000, pending: 30000, failed: 5000 },
      { month: '2月', total: 920000, processed: 895000, pending: 25000, failed: 4000 },
      { month: '3月', total: 1050000, processed: 1020000, pending: 30000, failed: 3500 },
      { month: '4月', total: 1180000, processed: 1155000, pending: 25000, failed: 3000 },
      { month: '5月', total: 1250000, processed: 1230000, pending: 20000, failed: 2500 },
      { month: '6月', total: 1320000, processed: 1300000, pending: 20000, failed: 2000 }
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
      { time: '00:00', cpu: 45, memory: 60, network: 30, throughput: 1200 },
      { time: '04:00', cpu: 35, memory: 55, network: 25, throughput: 800 },
      { time: '08:00', cpu: 75, memory: 80, network: 60, throughput: 2500 },
      { time: '12:00', cpu: 85, memory: 85, network: 70, throughput: 3200 },
      { time: '16:00', cpu: 90, memory: 90, network: 80, throughput: 3800 },
      { time: '20:00', cpu: 60, memory: 70, network: 45, throughput: 1800 },
    ],
    correlationData: [
      { accuracy: 95, efficiency: 98, volume: 150 },
      { accuracy: 92, efficiency: 94, volume: 140 },
      { accuracy: 89, efficiency: 90, volume: 130 },
      { accuracy: 96, efficiency: 99, volume: 160 },
      { accuracy: 88, efficiency: 87, volume: 125 },
      { accuracy: 94, efficiency: 96, volume: 145 },
    ],
    funnelData: [
      { name: '数据接收', value: 100000, fill: '#3b82f6' },
      { name: '初步筛选', value: 85000, fill: '#22c55e' },
      { name: '质量检测', value: 72000, fill: '#f59e0b' },
      { name: '自动处理', value: 68000, fill: '#8b5cf6' },
      { name: '人工审核', value: 65000, fill: '#ef4444' },
      { name: '最终完成', value: 63000, fill: '#06b6d4' }
    ],
    treeMapData: [
      { name: '手机号处理', size: 45000, children: [
        { name: '格式化', size: 25000 },
        { name: '验证', size: 15000 },
        { name: '去重', size: 5000 }
      ]},
      { name: '地址处理', size: 35000, children: [
        { name: '标准化', size: 20000 },
        { name: '补全', size: 10000 },
        { name: '纠错', size: 5000 }
      ]},
      { name: '合同处理', size: 20000, children: [
        { name: '识别', size: 12000 },
        { name: '校验', size: 8000 }
      ]}
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
              {/* 导出功能 */}
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

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">数据趋势</TabsTrigger>
          <TabsTrigger value="analytics">实时分析</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
          <TabsTrigger value="correlation">关联分析</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          {/* 数据量变化趋势 - 多维度堆叠柱状图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                数据量变化趋势分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={analyticsData.volumeTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="processed" stackId="a" fill="#22c55e" name="已处理" />
                  <Bar yAxisId="left" dataKey="pending" stackId="a" fill="#f59e0b" name="待处理" />
                  <Bar yAxisId="left" dataKey="failed" stackId="a" fill="#ef4444" name="失败" />
                  <Line yAxisId="right" type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="总量" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 处理流程漏斗图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据处理流程分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <FunnelChart>
                  <Tooltip />
                  <Funnel
                    dataKey="value"
                    data={analyticsData.funnelData}
                    isAnimationActive
                  >
                    <LabelList position="center" fill="#fff" stroke="none" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 数据质量趋势 - 改进的面积图 */}
          <Card>
            <CardHeader>
              <CardTitle>数据质量变化趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.qualityTrends}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7c7c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff7c7c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="volume" stackId="1" stroke="#8884d8" fillOpacity={1} fill="url(#colorVolume)" name="数据总量" />
                  <Area type="monotone" dataKey="processed" stackId="2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProcessed)" name="处理成功" />
                  <Area type="monotone" dataKey="errors" stackId="3" stroke="#ff7c7c" fillOpacity={1} fill="url(#colorErrors)" name="错误数据" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 处理类别树状图 */}
          <Card>
            <CardHeader>
              <CardTitle>处理类别分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <Treemap
                  data={analyticsData.treeMapData}
                  dataKey="size"
                  ratio={4/3}
                  stroke="#fff"
                  fill="#8884d8"
                >
                  <Tooltip />
                </Treemap>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

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
                <ComposedChart data={analyticsData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="cpu" fill="#ef4444" fillOpacity={0.6} name="CPU使用率%" />
                  <Area yAxisId="left" type="monotone" dataKey="memory" fill="#3b82f6" fillOpacity={0.6} name="内存使用率%" />
                  <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#22c55e" strokeWidth={3} name="吞吐量" />
                </ComposedChart>
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
