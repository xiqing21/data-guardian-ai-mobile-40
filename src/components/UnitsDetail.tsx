import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Users,
  Activity,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Target,
  List,
  PlayCircle,
  Settings,
  FileText,
  Zap
} from 'lucide-react';
import { Role } from '../types/Role';
import AnimatedNumber from './AnimatedNumber';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
}

interface Unit {
  id: number;
  name: string;
  type: string;
  governanceProgress: number;
  dataQuality: number;
  taskCompletion: number;
  totalTasks: number;
  completedTasks: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  region: string;
  employees: number;
  totalDataVolume: number; // GB
  processedDataVolume: number; // GB
  responsiblePerson: string;
  urgentTasks: number;
  overdueRate: number;
  tasks?: Task[]; // 添加任务列表
}

interface UnitsDetailProps {
  currentRole: Role;
  onBack: () => void;
}

const UnitsDetail: React.FC<UnitsDetailProps> = ({ currentRole, onBack }) => {
  const [sortBy, setSortBy] = useState<'governance' | 'quality' | 'completion'>('governance');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // 生成任务数据
  const generateTasksForUnit = (unitId: number): Task[] => {
    const taskTemplates = [
      {
        title: '手机号异常检测',
        description: '检测并处理异常手机号码',
        category: 'phone',
        autoProcessable: true
      },
      {
        title: '地址信息补全',
        description: '补全不完整的地址信息',
        category: 'address',
        autoProcessable: true
      },
      {
        title: '用电户档案完善',
        description: '完善用电户基础档案信息',
        category: 'archive',
        autoProcessable: false
      },
      {
        title: '用电安全检查',
        description: '进行用电安全隐患排查',
        category: 'safety',
        autoProcessable: false
      },
      {
        title: '缴费通知发送',
        description: '发送电费缴费通知',
        category: 'payment',
        autoProcessable: true
      },
      {
        title: '数据质量核查',
        description: '核查数据质量问题',
        category: 'data',
        autoProcessable: true
      },
      {
        title: '设备维护记录',
        description: '更新设备维护记录',
        category: 'maintenance',
        autoProcessable: false
      }
    ];

    const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    const statuses: ('pending' | 'in-progress' | 'completed')[] = ['pending', 'in-progress', 'completed'];
    const assignees = ['网格员001', '网格员002', '网格员003', 'AI智能体', 'AI外呼系统'];

    return taskTemplates.map((template, index) => ({
      id: unitId * 100 + index + 1,
      title: template.title,
      description: template.description,
      category: template.category,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100),
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      deadline: `2024-01-${15 + Math.floor(Math.random() * 15)}`,
      autoProcessable: template.autoProcessable
    }));
  };

  // 模拟数据 - 根据角色层级生成不同的管辖单位
  const generateUnits = (): Unit[] => {
    if (currentRole.level === 'province') {
      return [
        {
          id: 1,
          name: '太原供电公司',
          type: '地市公司',
          governanceProgress: 94.2,
          dataQuality: 96.1,
          taskCompletion: 92.5,
          totalTasks: 1245,
          completedTasks: 1152,
          trend: 'up',
          trendValue: 2.3,
          region: '太原市',
          employees: 2850,
          totalDataVolume: 15680,
          processedDataVolume: 14579,
          responsiblePerson: '张明华',
          urgentTasks: 12,
          overdueRate: 3.2,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '大同供电公司',
          type: '地市公司',
          governanceProgress: 91.8,
          dataQuality: 93.4,
          taskCompletion: 89.2,
          totalTasks: 1156,
          completedTasks: 1031,
          trend: 'up',
          trendValue: 1.8,
          region: '大同市',
          employees: 2340,
          totalDataVolume: 12340,
          processedDataVolume: 11015,
          responsiblePerson: '李建国',
          urgentTasks: 18,
          overdueRate: 5.1,
          tasks: generateTasksForUnit(2)
        },
        {
          id: 3,
          name: '运城供电公司',
          type: '地市公司',
          governanceProgress: 88.5,
          dataQuality: 90.2,
          taskCompletion: 86.7,
          totalTasks: 1089,
          completedTasks: 944,
          trend: 'stable',
          trendValue: 0.2,
          region: '运城市',
          employees: 2180,
          totalDataVolume: 10890,
          processedDataVolume: 9442,
          responsiblePerson: '王德华',
          urgentTasks: 25,
          overdueRate: 7.3,
          tasks: generateTasksForUnit(3)
        },
        {
          id: 4,
          name: '晋中供电公司',
          type: '地市公司',
          governanceProgress: 87.2,
          dataQuality: 89.1,
          taskCompletion: 85.3,
          totalTasks: 987,
          completedTasks: 842,
          trend: 'down',
          trendValue: -0.8,
          region: '晋中市',
          employees: 1950,
          totalDataVolume: 9870,
          processedDataVolume: 8420,
          responsiblePerson: '赵志强',
          urgentTasks: 31,
          overdueRate: 8.9,
          tasks: generateTasksForUnit(4)
        },
        {
          id: 5,
          name: '临汾供电公司',
          type: '地市公司',
          governanceProgress: 85.9,
          dataQuality: 87.8,
          taskCompletion: 83.1,
          totalTasks: 912,
          completedTasks: 758,
          trend: 'up',
          trendValue: 1.2,
          region: '临汾市',
          employees: 1820,
          totalDataVolume: 9120,
          processedDataVolume: 7580,
          responsiblePerson: '陈建军',
          urgentTasks: 28,
          overdueRate: 9.8,
          tasks: generateTasksForUnit(5)
        }
      ];
    } else if (currentRole.level === 'city') {
      return [
        {
          id: 1,
          name: '迎泽区供电所',
          type: '区县供电所',
          governanceProgress: 93.1,
          dataQuality: 94.2,
          taskCompletion: 91.8,
          totalTasks: 156,
          completedTasks: 143,
          trend: 'up',
          trendValue: 3.2,
          region: '迎泽区',
          employees: 45,
          totalDataVolume: 1560,
          processedDataVolume: 1433,
          responsiblePerson: '刘敏',
          urgentTasks: 3,
          overdueRate: 2.1,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '小店区供电所',
          type: '区县供电所',
          governanceProgress: 89.7,
          dataQuality: 91.5,
          taskCompletion: 88.2,
          totalTasks: 134,
          completedTasks: 118,
          trend: 'up',
          trendValue: 1.9,
          region: '小店区',
          employees: 38,
          totalDataVolume: 1340,
          processedDataVolume: 1182,
          responsiblePerson: '孙伟',
          urgentTasks: 5,
          overdueRate: 4.2,
          tasks: generateTasksForUnit(2)
        },
        {
          id: 3,
          name: '杏花岭区供电所',
          type: '区县供电所',
          governanceProgress: 86.3,
          dataQuality: 88.1,
          taskCompletion: 84.6,
          totalTasks: 128,
          completedTasks: 108,
          trend: 'stable',
          trendValue: 0.1,
          region: '杏花岭区',
          employees: 42,
          totalDataVolume: 1280,
          processedDataVolume: 1083,
          responsiblePerson: '马晓东',
          urgentTasks: 7,
          overdueRate: 6.3,
          tasks: generateTasksForUnit(3)
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: '网格A区域',
          type: '网格区域',
          governanceProgress: 91.2,
          dataQuality: 92.8,
          taskCompletion: 89.5,
          totalTasks: 28,
          completedTasks: 25,
          trend: 'up',
          trendValue: 2.1,
          region: '城南片区',
          employees: 8,
          totalDataVolume: 280,
          processedDataVolume: 251,
          responsiblePerson: '周磊',
          urgentTasks: 1,
          overdueRate: 3.6,
          tasks: generateTasksForUnit(1)
        },
        {
          id: 2,
          name: '网格B区域',
          type: '网格区域',
          governanceProgress: 87.6,
          dataQuality: 89.3,
          taskCompletion: 85.2,
          totalTasks: 31,
          completedTasks: 26,
          trend: 'stable',
          trendValue: -0.3,
          region: '城北片区',
          employees: 6,
          totalDataVolume: 310,
          processedDataVolume: 264,
          responsiblePerson: '钱文静',
          urgentTasks: 2,
          overdueRate: 6.5,
          tasks: generateTasksForUnit(2)
        }
      ];
    }
  };

  const units = generateUnits();

  const sortedUnits = [...units].sort((a, b) => {
    switch (sortBy) {
      case 'governance':
        return b.governanceProgress - a.governanceProgress;
      case 'quality':
        return b.dataQuality - a.dataQuality;
      case 'completion':
        return b.taskCompletion - a.taskCompletion;
      default:
        return b.governanceProgress - a.governanceProgress;
    }
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleBackToList = () => {
    setSelectedUnit(null);
  };

  const handleTaskClick = (task: Task) => {
    console.log('跳转到任务处理:', task.id, task.title);
    // 触发事件跳转到任务管理页面
    window.dispatchEvent(new CustomEvent('openTaskManagement'));
  };

  if (selectedUnit) {
    const tasks = selectedUnit.tasks || [];
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
    const aiProcessableTasks = tasks.filter(t => t.autoProcessable && t.status === 'pending');

    return (
      <div className="min-h-screen bg-gray-50 p-3 pb-20">
        {/* Header - 移动端优化 */}
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="p-1.5 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{selectedUnit.name}</h1>
            <p className="text-xs text-gray-600">任务详情管理</p>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-2">
              <div className="text-lg font-bold text-blue-600">
                <AnimatedNumber value={tasks.length} />
              </div>
              <div className="text-xs text-gray-600">总任务</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-2">
              <div className="text-lg font-bold text-orange-600">
                <AnimatedNumber value={pendingTasks.length} />
              </div>
              <div className="text-xs text-gray-600">待处理</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-2">
              <div className="text-lg font-bold text-green-600">
                <AnimatedNumber value={completedTasks.length} />
              </div>
              <div className="text-xs text-gray-600">已完成</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-2">
              <div className="text-lg font-bold text-red-600">
                <AnimatedNumber value={urgentTasks.length} />
              </div>
              <div className="text-xs text-gray-600">紧急</div>
            </CardContent>
          </Card>
        </div>

        {/* 任务分类标签页 */}
        <Card>
          <CardContent className="p-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="overview" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  待办事项 ({pendingTasks.length})
                </TabsTrigger>
                <TabsTrigger value="progress" className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  进行中 ({inProgressTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  已完成 ({completedTasks.length})
                </TabsTrigger>
              </TabsList>

              {/* 待办任务 */}
              <TabsContent value="overview" className="space-y-3 mt-0">
                {/* AI助手提醒 */}
                {aiProcessableTasks.length > 0 && (
                  <div className="p-3 rounded-lg border-l-4 border-l-purple-500 bg-purple-50 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="font-medium text-purple-700 text-sm">
                            AI智能助手 ({aiProcessableTasks.length}个可处理)
                          </div>
                          <div className="text-xs text-purple-600">
                            预计节省80%处理时间
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        启动AI
                      </Button>
                    </div>
                  </div>
                )}
                
                {pendingTasks.length > 0 ? (
                  <div className="space-y-2">
                    {pendingTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span className="font-medium text-sm">{task.title}</span>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">紧急</Badge>
                            )}
                            {task.autoProcessable && (
                              <Badge className="bg-purple-100 text-purple-600 text-xs">AI可处理</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">{task.description}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-400">
                            <span>负责人: {task.assignee}</span>
                            <span className="ml-3">截止: {task.deadline}</span>
                          </div>
                          <Button
                            size="sm"
                            className="text-xs h-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskClick(task);
                            }}
                          >
                            <PlayCircle className="h-3 w-3 mr-1" />
                            处理
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500" />
                    <div className="text-sm">太棒了！暂无待办任务</div>
                  </div>
                )}
              </TabsContent>

              {/* 进行中任务 */}
              <TabsContent value="progress" className="space-y-3 mt-0">
                {inProgressTasks.length > 0 ? (
                  <div className="space-y-2">
                    {inProgressTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span className="font-medium text-sm">{task.title}</span>
                          </div>
                          <Badge className="bg-orange-100 text-orange-600 text-xs">进行中</Badge>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">{task.description}</div>
                        <div className="space-y-2">
                          <Progress value={task.progress} className="h-1" />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>进度: {task.progress}%</span>
                            <span>负责人: {task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm">暂无进行中的任务</div>
                  </div>
                )}
              </TabsContent>

              {/* 已完成任务 */}
              <TabsContent value="completed" className="space-y-3 mt-0">
                {completedTasks.length > 0 ? (
                  <div className="space-y-2">
                    {completedTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg border"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm text-green-700">{task.title}</div>
                          <div className="text-xs text-green-600">{task.description}</div>
                          <div className="text-xs text-green-500 mt-1">完成时间: {task.deadline}</div>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm">暂无完成任务</div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 基本信息卡片 - 移动到底部 */}
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4" />
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">单位类型</span>
                  <Badge variant="outline" className="text-xs">{selectedUnit.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">所在区域</span>
                  <span className="font-medium text-xs">{selectedUnit.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">责任主体</span>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 text-blue-500" />
                    <span className="font-medium text-xs">{selectedUnit.responsiblePerson}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">员工数量</span>
                  <span className="font-medium text-xs">{selectedUnit.employees}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">总数据量</span>
                  <span className="font-medium text-xs">{selectedUnit.totalDataVolume}GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">已处理数据量</span>
                  <span className="font-medium text-green-600 text-xs">{selectedUnit.processedDataVolume}GB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header - 移动端优化 */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1.5 h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">管辖单位详情</h1>
          <p className="text-xs text-gray-600">{currentRole.name} - 按治理进度排名</p>
        </div>
      </div>

      {/* 排序选择 - 移动端优化 */}
      <div className="flex gap-1.5 mb-3">
        <Button
          variant={sortBy === 'governance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('governance')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          治理进度
        </Button>
        <Button
          variant={sortBy === 'quality' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('quality')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          数据质量
        </Button>
        <Button
          variant={sortBy === 'completion' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('completion')}
          className="text-xs px-3 py-1.5 h-auto"
        >
          任务完成率
        </Button>
      </div>

      {/* 单位列表 - 移动端优化 */}
      <div className="space-y-2">
        {sortedUnits.map((unit, index) => (
          <Card 
            key={unit.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleUnitClick(unit)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                    <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{unit.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{unit.region}</span>
                      <Badge variant="outline" className="text-xs px-1">
                        {unit.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <User className="h-3 w-3" />
                      <span>责任主体: {unit.responsiblePerson}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-blue-600">
                      <AnimatedNumber value={unit.governanceProgress} suffix="%" />
                    </span>
                    {getTrendIcon(unit.trend)}
                  </div>
                  <div className={`text-xs ${getTrendColor(unit.trend)}`}>
                    {unit.trend === 'up' ? '+' : unit.trend === 'down' ? '' : '±'}
                    <AnimatedNumber value={Math.abs(unit.trendValue)} suffix="%" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900">
                    <AnimatedNumber value={unit.dataQuality} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">数据质量</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900">
                    <AnimatedNumber value={unit.taskCompletion} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">任务完成率</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                    <Users className="h-3 w-3" />
                    <AnimatedNumber value={unit.employees} />
                  </div>
                  <div className="text-xs text-gray-600">员工数</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-purple-600">
                    <AnimatedNumber value={unit.totalDataVolume} />GB
                  </div>
                  <div className="text-xs text-gray-600">数据量</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">治理进度</span>
                  <span className="font-medium">
                    <AnimatedNumber value={unit.governanceProgress} suffix="%" />
                  </span>
                </div>
                <Progress value={unit.governanceProgress} className="h-1.5" />
              </div>

              <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                <span>任务进度: {unit.completedTasks}/{unit.totalTasks}</span>
                <div className="flex items-center gap-2">
                  {unit.urgentTasks > 0 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span>紧急: {unit.urgentTasks}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>活跃度: 高</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnitsDetail;
