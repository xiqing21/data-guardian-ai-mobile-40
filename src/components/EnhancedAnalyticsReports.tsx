
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Building2,
  Filter,
  FileText,
  PieChart,
  LineChart,
  Database,
  Target,
  AlertTriangle,
  ChevronDown,
  Search,
  Users,
  Activity
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
  LineChart as RechartsLineChart,
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
  Area
} from 'recharts';
import AnimatedNumber from './AnimatedNumber';

const EnhancedAnalyticsReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // 时间范围选项
  const timeRanges = [
    { key: 'week', label: '近一周', desc: '最近7天数据' },
    { key: 'month', label: '近一月', desc: '最近30天数据' },
    { key: 'quarter', label: '近一季', desc: '最近90天数据' },
    { key: 'year', label: '近一年', desc: '最近365天数据' }
  ];

  // 单位选项
  const unitOptions = [
    { key: 'all', label: '全部单位', count: 156 },
    { key: 'province', label: '省级单位', count: 1 },
    { key: 'city', label: '市级单位', count: 11 },
    { key: 'county', label: '县级单位', count: 144 }
  ];

  // 模拟数据
  const overviewData = {
    totalDataVolume: 8657000,
    processedVolume: 8483860,
    qualityScore: 95.8,
    governanceRate: 94.7,
    issuesCount: 201,
    completionRate: 98.0,
    trend: '+2.3%'
  };

  const chartData = {
    qualityTrends: [
      { date: '12-01', quality: 92, governance: 89, completion: 87 },
      { date: '12-08', quality: 93, governance: 91, completion: 89 },
      { date: '12-15', quality: 94, governance: 92, completion: 91 },
      { date: '12-22', quality: 95, governance: 94, completion: 93 },
      { date: '12-29', quality: 96, governance: 95, completion: 95 }
    ],
    unitRanking: [
      { unit: '太原供电', score: 96.5, volume: 1567, issues: 12 },
      { unit: '大同供电', score: 94.2, volume: 1234, issues: 18 },
      { unit: '运城供电', score: 92.8, volume: 1089, issues: 25 },
      { unit: '临汾供电', score: 91.5, volume: 987, issues: 31 }
    ],
    dataDistribution: [
      { name: '已处理', value: 78, color: '#22c55e' },
      { name: '处理中', value: 15, color: '#3b82f6' },
      { name: '待处理', value: 5, color: '#f59e0b' },
      { name: '异常', value: 2, color: '#ef4444' }
    ],
    qualityDimensions: [
      { dimension: '完整性', score: 96.5, target: 98 },
      { dimension: '准确性', score: 94.2, target: 96 },
      { dimension: '一致性', score: 91.8, target: 95 },
      { dimension: '时效性', score: 93.6, target: 97 },
      { dimension: '有效性', score: 89.4, target: 93 },
      { dimension: '唯一性', score: 97.8, target: 99 }
    ]
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* 核心指标 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-5 w-5 text-blue-600" />
              <Badge variant="outline" className="text-xs">{overviewData.trend}</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              <AnimatedNumber value={overviewData.totalDataVolume / 10000} suffix="万" />
            </div>
            <div className="text-xs text-blue-600">数据总量</div>
            <div className="text-xs text-gray-500 mt-1">
              已处理 {(overviewData.processedVolume / 10000).toFixed(1)}万
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <Badge variant="outline" className="text-xs">优秀</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">
              <AnimatedNumber value={overviewData.qualityScore} suffix="%" />
            </div>
            <div className="text-xs text-green-600">质量得分</div>
            <div className="text-xs text-gray-500 mt-1">
              治理率 {overviewData.governanceRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 处理进度 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            数据处理进度
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>整体完成率</span>
                <span className="font-medium">{overviewData.completionRate}%</span>
              </div>
              <Progress value={overviewData.completionRate} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-green-50 rounded">
                <div className="text-sm font-bold text-green-600">
                  {(overviewData.processedVolume / 10000).toFixed(1)}万
                </div>
                <div className="text-xs text-gray-600">已完成</div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <div className="text-sm font-bold text-blue-600">
                  {((overviewData.totalDataVolume - overviewData.processedVolume) / 10000).toFixed(1)}万
                </div>
                <div className="text-xs text-gray-600">处理中</div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <div className="text-sm font-bold text-orange-600">{overviewData.issuesCount}</div>
                <div className="text-xs text-gray-600">待解决</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 趋势图表 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">质量趋势</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={chartData.qualityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '6px',
                  fontSize: '12px'
                }} 
              />
              <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} name="质量分数" />
              <Line type="monotone" dataKey="governance" stroke="#22c55e" strokeWidth={2} name="治理进度" />
              <Line type="monotone" dataKey="completion" stroke="#8b5cf6" strokeWidth={2} name="完成率" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderUnitAnalysis = () => (
    <div className="space-y-4">
      {/* 单位排名 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            单位排名
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {chartData.unitRanking.map((unit, index) => (
              <div key={unit.unit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{unit.unit}</div>
                    <div className="text-xs text-gray-500">{unit.volume}万条数据</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">{unit.score}%</div>
                  <div className="text-xs text-gray-500">{unit.issues}个问题</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 数据分布 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">数据处理分布</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={180}>
            <RechartsPieChart>
              <Pie
                data={chartData.dataDistribution}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={10}
              >
                {chartData.dataDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderQualityAnalysis = () => (
    <div className="space-y-4">
      {/* 质量维度雷达图 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">6维度质量分析</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={chartData.qualityDimensions}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
              <Radar name="当前得分" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="目标值" dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 质量维度详情 */}
      <div className="space-y-2">
        {chartData.qualityDimensions.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.dimension}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">目标{item.target}%</span>
                  <Badge variant={item.score >= item.target ? 'default' : 'secondary'} className="text-xs">
                    {item.score}%
                  </Badge>
                </div>
              </div>
              <Progress value={item.score} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>当前: {item.score}%</span>
                <span className={item.score >= item.target ? 'text-green-600' : 'text-orange-600'}>
                  {item.score >= item.target ? '达标' : `差${item.target - item.score}%`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部筛选区 */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">智能分析报表</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 px-3"
            >
              <Filter className="h-3 w-3 mr-1" />
              筛选
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* 筛选器 */}
          {showFilters && (
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-600 mb-2">时间范围</div>
                <div className="grid grid-cols-2 gap-2">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.key}
                      variant={selectedTimeRange === range.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeRange(range.key)}
                      className="justify-start text-xs h-auto p-2"
                    >
                      <div>
                        <div>{range.label}</div>
                        <div className="text-xs opacity-70">{range.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-2">统计单位</div>
                <div className="grid grid-cols-2 gap-2">
                  {unitOptions.map((unit) => (
                    <Button
                      key={unit.key}
                      variant={selectedUnit === unit.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedUnit(unit.key)}
                      className="justify-between text-xs h-auto p-2"
                    >
                      <span>{unit.label}</span>
                      <Badge variant="secondary" className="text-xs">{unit.count}</Badge>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  生成报表
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-3">
                  <Download className="h-3 w-3 mr-1" />
                  导出
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 标签页内容 */}
      <div className="p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="text-xs">概览</TabsTrigger>
            <TabsTrigger value="units" className="text-xs">单位分析</TabsTrigger>
            <TabsTrigger value="quality" className="text-xs">质量分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="units" className="mt-0">
            {renderUnitAnalysis()}
          </TabsContent>

          <TabsContent value="quality" className="mt-0">
            {renderQualityAnalysis()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsReports;
