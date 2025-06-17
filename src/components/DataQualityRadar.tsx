
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, TrendingUp } from 'lucide-react';
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
import { Role, RoleContent } from '../types/Role';

interface DataQualityRadarProps {
  currentRole: Role;
  roleContent: RoleContent;
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
    compliance: number;
    uniqueness: number;
  };
  dimensionDetails: {
    completeness: { issues: number; trend: string; level: string };
    accuracy: { issues: number; trend: string; level: string };
    consistency: { issues: number; trend: string; level: string };
    timeliness: { issues: number; trend: string; level: string };
    compliance: { issues: number; trend: string; level: string };
    uniqueness: { issues: number; trend: string; level: string };
  };
}

const DataQualityRadar: React.FC<DataQualityRadarProps> = ({
  currentRole,
  roleContent,
  dataQuality,
  dimensionDetails
}) => {
  const radarData = [
    {
      dimension: '完整性',
      current: dataQuality.completeness,
      target: 95,
      fullMark: 100,
      issues: dimensionDetails.completeness.issues,
      trend: dimensionDetails.completeness.trend
    },
    {
      dimension: '准确性',
      current: dataQuality.accuracy,
      target: 95,
      fullMark: 100,
      issues: dimensionDetails.accuracy.issues,
      trend: dimensionDetails.accuracy.trend
    },
    {
      dimension: '一致性',
      current: dataQuality.consistency,
      target: 94,
      fullMark: 100,
      issues: dimensionDetails.consistency.issues,
      trend: dimensionDetails.consistency.trend
    },
    {
      dimension: '时效性',
      current: dataQuality.timeliness,
      target: 90,
      fullMark: 100,
      issues: dimensionDetails.timeliness.issues,
      trend: dimensionDetails.timeliness.trend
    },
    {
      dimension: '合规性',
      current: dataQuality.compliance,
      target: 95,
      fullMark: 100,
      issues: dimensionDetails.compliance.issues,
      trend: dimensionDetails.compliance.trend
    },
    {
      dimension: '唯一性',
      current: dataQuality.uniqueness,
      target: 95,
      fullMark: 100,
      issues: dimensionDetails.uniqueness.issues,
      trend: dimensionDetails.uniqueness.trend
    }
  ];

  const overallScore = Math.round(
    (dataQuality.completeness + dataQuality.accuracy + dataQuality.consistency + 
     dataQuality.timeliness + dataQuality.compliance + dataQuality.uniqueness) / 6
  );

  if (!roleContent.showStatistics) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Database className="h-4 w-4 text-blue-500" />
          {currentRole.name}数据质量6维度评价
          <Badge variant="secondary" className="text-xs">
            综合得分: {overallScore}分
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 mb-4">
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
        
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700 mb-3">各维度详细数据</div>
          <div className="grid grid-cols-1 gap-2">
            {radarData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium">{item.dimension}</div>
                    <div className="text-xs text-gray-500">
                      问题数量: {item.issues}个 | 趋势: {item.trend}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{item.current}%</div>
                  <div className="text-xs text-gray-500">目标: {item.target}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="text-sm font-medium text-green-700">优秀 (95%+)</div>
            <div className="text-xs text-gray-500">准确性、合规性、唯一性</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <div className="text-sm font-medium text-yellow-700">良好 (90-95%)</div>
            <div className="text-xs text-gray-500">完整性、时效性</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <div className="text-sm font-medium text-orange-700">待改进 (&lt;90%)</div>
            <div className="text-xs text-gray-500">一致性</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">本月质量趋势</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">整体提升:</span>
              <span className="font-medium text-green-600">+2.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">问题解决:</span>
              <span className="font-medium text-blue-600">1,247个</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">自动修复率:</span>
              <span className="font-medium text-purple-600">86.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">预计达标:</span>
              <span className="font-medium text-orange-600">15天</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataQualityRadar;
