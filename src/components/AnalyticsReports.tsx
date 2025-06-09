
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
  PieChart
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
  Radar
} from 'recharts';

const AnalyticsReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [isGenerating, setIsGenerating] = useState(false);

  // 分析数据
  const analyticsData = {
    qualityTrends: [
      { date: '01-01', completeness: 88, accuracy: 92, consistency: 85 },
      { date: '01-08', completeness: 90, accuracy: 93, consistency: 87 },
      { date: '01-15', completeness: 92, accuracy: 94, consistency: 89 },
      { date: '01-22', completeness: 94, accuracy: 95, consistency: 91 },
      { date: '01-29', completeness: 95, accuracy: 96, consistency: 92 }
    ],
    categoryAnalysis: [
      { category: '手机号', processed: 12470, success: 11223, rate: 90.0 },
      { category: '地址', processed: 8950, success: 8507, rate: 95.1 },
      { category: '合同', processed: 3420, success: 2993, rate: 87.5 },
      { category: '证照', processed: 1680, success: 1428, rate: 85.0 },
    ],
    dataDistribution: [
      { name: '正常数据', value: 78, color: '#22c55e' },
      { name: '待处理', value: 12, color: '#f59e0b' },
      { name: '异常数据', value: 8, color: '#ef4444' },
      { name: '已修复', value: 2, color: '#8b5cf6' }
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

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* 头部信息 */}
      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">数据分析与报告</h1>
              <p className="text-blue-100">
                统一的数据治理分析与报告生成平台
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{reportData.summary.qualityScore}%</div>
              <div className="text-sm text-blue-100">综合治理得分</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">实时分析</TabsTrigger>
          <TabsTrigger value="trends">趋势监控</TabsTrigger>
          <TabsTrigger value="reports">工作报告</TabsTrigger>
          <TabsTrigger value="effectiveness">治理成效</TabsTrigger>
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

          {/* 分类处理成效 */}
          <Card>
            <CardHeader>
              <CardTitle>分类处理统计</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.categoryAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="success" fill="#22c55e" name="成功处理" />
                  <Bar dataKey="processed" fill="#94a3b8" name="总数" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>数据质量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completeness" stroke="#3b82f6" name="完整性" strokeWidth={2} />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" name="准确性" strokeWidth={2} />
                  <Line type="monotone" dataKey="consistency" stroke="#8b5cf6" name="一致性" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* 报告生成控制 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                报告生成
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium">报告周期</label>
                    <select 
                      value={reportPeriod}
                      onChange={(e) => setReportPeriod(e.target.value)}
                      className="ml-2 border rounded px-3 py-1 text-sm"
                    >
                      <option value="weekly">周报</option>
                      <option value="monthly">月报</option>
                      <option value="quarterly">季报</option>
                      <option value="yearly">年报</option>
                    </select>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    2024年6月
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        生成中...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        生成报告
                      </div>
                    )}
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Download className="h-4 w-4 mr-1" />
                    导出PDF
                  </Button>
                </div>
              </div>
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

        <TabsContent value="effectiveness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>治理效果趋势分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quality" stroke="#3b82f6" name="数据质量" strokeWidth={2} />
                  <Line type="monotone" dataKey="governance" stroke="#22c55e" name="治理覆盖" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" name="处理效率" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReports;
