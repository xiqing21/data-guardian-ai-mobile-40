
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Users,
  Database,
  Activity,
  Target,
  Clock,
  AlertTriangle
} from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface ReportData {
  unitName: string;
  period: string;
  dataQuality: number;
  governanceProgress: number;
  taskCompletion: number;
  dataVolume: number;
  processedVolume: number;
  issues: number;
  trend: number;
}

const EnhancedAnalyticsReports: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<'unit' | 'time'>('unit');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedUnit, setSelectedUnit] = useState<'all' | 'province' | 'city' | 'county'>('all');
  const [reportType, setReportType] = useState<'overview' | 'quality' | 'governance' | 'performance'>('overview');

  // 模拟报表数据
  const generateReportData = (): ReportData[] => {
    if (selectedDimension === 'unit') {
      return [
        {
          unitName: '太原供电公司',
          period: '2024年12月',
          dataQuality: 96.1,
          governanceProgress: 94.2,
          taskCompletion: 92.5,
          dataVolume: 15680,
          processedVolume: 14579,
          issues: 45,
          trend: 2.3
        },
        {
          unitName: '大同供电公司',
          period: '2024年12月',
          dataQuality: 93.4,
          governanceProgress: 91.8,
          taskCompletion: 89.2,
          dataVolume: 12340,
          processedVolume: 11015,
          issues: 67,
          trend: 1.8
        },
        {
          unitName: '运城供电公司',
          period: '2024年12月',
          dataQuality: 90.2,
          governanceProgress: 88.5,
          taskCompletion: 86.7,
          dataVolume: 10890,
          processedVolume: 9442,
          issues: 89,
          trend: 0.2
        }
      ];
    } else {
      return [
        {
          unitName: '全省汇总',
          period: '2024年9月',
          dataQuality: 89.5,
          governanceProgress: 87.2,
          taskCompletion: 85.1,
          dataVolume: 145600,
          processedVolume: 127800,
          issues: 356,
          trend: -1.2
        },
        {
          unitName: '全省汇总',
          period: '2024年10月',
          dataQuality: 91.8,
          governanceProgress: 89.6,
          taskCompletion: 87.8,
          dataVolume: 148900,
          processedVolume: 132400,
          issues: 298,
          trend: 2.3
        },
        {
          unitName: '全省汇总',
          period: '2024年11月',
          dataQuality: 94.2,
          governanceProgress: 92.1,
          taskCompletion: 90.5,
          dataVolume: 152300,
          processedVolume: 138200,
          issues: 245,
          trend: 2.4
        },
        {
          unitName: '全省汇总',
          period: '2024年12月',
          dataQuality: 95.8,
          governanceProgress: 94.7,
          taskCompletion: 93.2,
          dataVolume: 156800,
          processedVolume: 142560,
          issues: 201,
          trend: 1.6
        }
      ];
    }
  };

  const reportData = generateReportData();

  const handleGenerateReport = () => {
    console.log('生成报表:', {
      dimension: selectedDimension,
      period: selectedPeriod,
      unit: selectedUnit,
      type: reportType
    });
    alert(`正在生成${selectedDimension === 'unit' ? '按单位' : '按时间'}维度的${reportType}报表...`);
  };

  const handleExportReport = () => {
    console.log('导出报表');
    alert('报表导出功能启动中...');
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'overview': return <BarChart3 className="h-4 w-4" />;
      case 'quality': return <Target className="h-4 w-4" />;
      case 'governance': return <Database className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getReportTitle = (type: string) => {
    switch (type) {
      case 'overview': return '综合概览报表';
      case 'quality': return '数据质量分析报表';
      case 'governance': return '数据治理进度报表';
      case 'performance': return '绩效分析报表';
      default: return '分析报表';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 pb-20">
      {/* 报表配置区 */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5" />
            智能分析报表
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* 维度选择 */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-2">分析维度</div>
            <div className="flex gap-2">
              <Button
                variant={selectedDimension === 'unit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDimension('unit')}
                className="text-xs px-3 py-1.5 h-auto"
              >
                <Building2 className="h-3 w-3 mr-1" />
                按单位
              </Button>
              <Button
                variant={selectedDimension === 'time' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDimension('time')}
                className="text-xs px-3 py-1.5 h-auto"
              >
                <Calendar className="h-3 w-3 mr-1" />
                按时间
              </Button>
            </div>
          </div>

          {/* 报表类型选择 */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-2">报表类型</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['overview', 'quality', 'governance', 'performance'].map((type) => (
                <Button
                  key={type}
                  variant={reportType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setReportType(type as any)}
                  className="text-xs px-2 py-1.5 h-auto justify-start"
                >
                  {getReportIcon(type)}
                  <span className="ml-1">{getReportTitle(type).replace('报表', '')}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 时间周期选择 */}
          {selectedDimension === 'time' && (
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-2">时间周期</div>
              <div className="flex gap-1.5">
                {[
                  { key: 'week', label: '周' },
                  { key: 'month', label: '月' },
                  { key: 'quarter', label: '季' },
                  { key: 'year', label: '年' }
                ].map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={selectedPeriod === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(key as any)}
                    className="text-xs px-3 py-1.5 h-auto"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button 
              onClick={handleGenerateReport}
              className="flex-1 text-xs py-2 h-auto"
            >
              <Filter className="h-3 w-3 mr-1" />
              生成报表
            </Button>
            <Button 
              variant="outline"
              onClick={handleExportReport}
              className="text-xs px-3 py-2 h-auto"
            >
              <Download className="h-3 w-3 mr-1" />
              导出
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 报表展示区 */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              {getReportIcon(reportType)}
              {getReportTitle(reportType)}
            </div>
            <Badge variant="outline" className="text-xs">
              {selectedDimension === 'unit' ? '按单位' : '按时间'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {reportData.map((data, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{data.unitName}</h4>
                      <p className="text-xs text-gray-600">{data.period}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`h-3 w-3 ${data.trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-xs font-medium ${data.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.trend >= 0 ? '+' : ''}<AnimatedNumber value={data.trend} suffix="%" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 关键指标网格 */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-sm font-bold text-blue-600">
                        <AnimatedNumber value={data.dataQuality} suffix="%" />
                      </div>
                      <div className="text-xs text-gray-600">数据质量</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-sm font-bold text-green-600">
                        <AnimatedNumber value={data.governanceProgress} suffix="%" />
                      </div>
                      <div className="text-xs text-gray-600">治理进度</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-sm font-bold text-purple-600">
                        <AnimatedNumber value={data.taskCompletion} suffix="%" />
                      </div>
                      <div className="text-xs text-gray-600">任务完成率</div>
                    </div>
                  </div>

                  {/* 数据量统计 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">数据处理进度</span>
                      <span className="font-medium">
                        <AnimatedNumber value={(data.processedVolume / data.dataVolume) * 100} suffix="%" />
                      </span>
                    </div>
                    <Progress value={(data.processedVolume / data.dataVolume) * 100} className="h-1.5" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>已处理: {data.processedVolume}GB</span>
                      <span>总量: {data.dataVolume}GB</span>
                    </div>
                  </div>

                  {/* 问题统计 */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-gray-600">待解决问题</span>
                    </div>
                    <Badge variant={data.issues > 100 ? 'destructive' : data.issues > 50 ? 'secondary' : 'default'} className="text-xs">
                      {data.issues}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速操作区 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">快速操作</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="justify-start text-xs py-3 h-auto"
              onClick={() => alert('生成周报功能启动中...')}
            >
              <FileText className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>生成周报</div>
                <div className="text-xs text-gray-500">自动汇总周度数据</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-xs py-3 h-auto"
              onClick={() => alert('生成月报功能启动中...')}
            >
              <PieChart className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>生成月报</div>
                <div className="text-xs text-gray-500">详细月度分析</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-xs py-3 h-auto"
              onClick={() => alert('趋势分析功能启动中...')}
            >
              <LineChart className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>趋势分析</div>
                <div className="text-xs text-gray-500">多维度趋势对比</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-xs py-3 h-auto"
              onClick={() => alert('预警报告功能启动中...')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>预警报告</div>
                <div className="text-xs text-gray-500">风险识别与预警</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAnalyticsReports;
