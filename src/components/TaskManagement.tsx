import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import TaskDetail from './TaskDetail';
import AIProcessingDetail from './AIProcessingDetail';
import TaskOverview from './TaskOverview';
import AISmartAssignment from './AISmartAssignment';
import TaskCategoryFilter from './TaskCategoryFilter';
import TaskCard from './TaskCard';
import TaskConfirmation from './TaskConfirmation';
import { Task, Category } from '../types/Task';

const TaskManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [aiProcessingTask, setAiProcessingTask] = useState<Task | null>(null);
  const [confirmationTask, setConfirmationTask] = useState<{ task: Task; result: any } | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '手机号异常检测',
      description: '检测并处理1,247个异常手机号',
      category: 'phone',
      priority: 'high',
      status: 'in-progress',
      progress: 75,
      assignee: '网格员001',
      deadline: '2024-01-15',
      autoProcessable: true
    },
    {
      id: 2,
      title: '地址信息补全',
      description: '补全2,156条不完整地址信息',
      category: 'address',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      assignee: 'AI智能体',
      deadline: '2024-01-14',
      autoProcessable: true
    },
    {
      id: 3,
      title: '合同信息校验',
      description: '校验867个合同信息一致性',
      category: 'contract',
      priority: 'high',
      status: 'pending',
      progress: 0,
      assignee: '网格员005',
      deadline: '2024-01-16',
      autoProcessable: false
    },
    {
      id: 4,
      title: '证照有效期检查',
      description: '检查134个证照有效期状态',
      category: 'certificate',
      priority: 'low',
      status: 'in-progress',
      progress: 60,
      assignee: 'AI智能体',
      deadline: '2024-01-17',
      autoProcessable: true
    },
    {
      id: 5,
      title: '外呼验证任务',
      description: '验证3,421个手机号有效性',
      category: 'call',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
      assignee: 'AI外呼系统',
      deadline: '2024-01-15',
      autoProcessable: true
    }
  ]);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: 'phone',
      priority: 'medium',
      assignee: '网格员001',
      deadline: '',
      autoProcessable: false
    }
  });

  const categories: Category[] = [
    { key: 'all', label: '全部', count: tasks.length },
    { key: 'phone', label: '手机号', count: tasks.filter(t => t.category === 'phone').length },
    { key: 'address', label: '地址', count: tasks.filter(t => t.category === 'address').length },
    { key: 'contract', label: '合同', count: tasks.filter(t => t.category === 'contract').length },
    { key: 'certificate', label: '证照', count: tasks.filter(t => t.category === 'certificate').length },
    { key: 'call', label: '外呼', count: tasks.filter(t => t.category === 'call').length }
  ];

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const overallProgress = Math.round(
    tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length
  );

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const autoProcessableTasks = tasks.filter(task => task.autoProcessable && task.status === 'pending').length;

  const taskStats = {
    totalTasks: tasks.length,
    pendingTasks,
    autoProcessableTasks
  };

  const handleTaskConfirm = (taskId: number, result: any) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: result.status === 'resolved' ? 'completed' : task.status,
              progress: result.status === 'resolved' ? 100 : task.progress,
              confirmationData: result
            }
          : task
      )
    );
    console.log('任务确认结果:', result);
  };

  const handleAIProcess = (task: Task) => {
    console.log('启动AI处理:', task);
    setAiProcessingTask(task);
  };

  const handleAIComplete = (result: any) => {
    console.log('AI处理完成，等待人工确认:', result);
    if (aiProcessingTask) {
      setConfirmationTask({ task: aiProcessingTask, result });
      setAiProcessingTask(null);
    }
  };

  const handleConfirmationComplete = (approved: boolean, comments?: string) => {
    if (!confirmationTask) return;

    console.log('人工确认结果:', { approved, comments });
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === confirmationTask.task.id 
          ? { 
              ...task, 
              status: approved ? 'completed' : 'pending',
              progress: approved ? 100 : 0,
              assignee: approved ? 'AI智能体' : task.assignee,
              aiResult: approved ? confirmationTask.result : undefined,
              confirmationData: { approved, comments, timestamp: new Date().toISOString() }
            }
          : task
      )
    );
    
    setConfirmationTask(null);
  };

  const handleAIReassignTasks = () => {
    console.log('开始AI智能重新分配任务');
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.status === 'pending') {
          let newAssignee = task.assignee;
          
          if (task.autoProcessable) {
            newAssignee = task.category === 'call' ? 'AI外呼系统' : 'AI智能体';
          } else {
            const gridWorkers = ['网格员001', '网格员002', '网格员003', '网格员004', '网格员005'];
            newAssignee = gridWorkers[Math.floor(Math.random() * gridWorkers.length)];
          }
          
          return {
            ...task,
            assignee: newAssignee,
            status: task.autoProcessable ? 'in-progress' : 'pending',
            progress: task.autoProcessable ? Math.floor(Math.random() * 30) + 10 : 0
          };
        }
        return task;
      })
    );
    
    console.log('AI智能分配完成，已重新分配', pendingTasks, '个任务');
  };

  const onSubmitNewTask = (data: any) => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'pending',
      progress: 0,
      assignee: data.assignee,
      deadline: data.deadline,
      autoProcessable: data.autoProcessable
    };
    
    setTasks(prev => [...prev, newTask]);
    form.reset();
    setShowNewTaskForm(false);
    console.log('新建任务成功:', newTask);
  };

  const NewTaskForm = () => (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowLeft 
              className="h-4 w-4 cursor-pointer" 
              onClick={() => setShowNewTaskForm(false)}
            />
            新建任务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewTask)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务标题</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入任务标题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务描述</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请输入任务描述" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>任务类别</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择类别" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">手机号</SelectItem>
                          <SelectItem value="address">地址</SelectItem>
                          <SelectItem value="contract">合同</SelectItem>
                          <SelectItem value="certificate">证照</SelectItem>
                          <SelectItem value="call">外呼</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>优先级</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择优先级" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">低</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="high">高</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>负责人</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择负责人" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="网格员001">网格员001</SelectItem>
                          <SelectItem value="网格员002">网格员002</SelectItem>
                          <SelectItem value="网格员003">网格员003</SelectItem>
                          <SelectItem value="网格员004">网格员004</SelectItem>
                          <SelectItem value="网格员005">网格员005</SelectItem>
                          <SelectItem value="AI智能体">AI智能体</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>截止日期</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  保存任务
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewTaskForm(false)}
                >
                  取消
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );

  if (showNewTaskForm) {
    return <NewTaskForm />;
  }

  if (confirmationTask) {
    return (
      <TaskConfirmation
        task={confirmationTask.task}
        aiResult={confirmationTask.result}
        onConfirm={handleConfirmationComplete}
        onBack={() => setConfirmationTask(null)}
      />
    );
  }

  if (aiProcessingTask) {
    return (
      <AIProcessingDetail 
        taskId={aiProcessingTask.id}
        taskType={aiProcessingTask.category}
        onComplete={handleAIComplete}
        onCancel={() => setAiProcessingTask(null)}
      />
    );
  }

  if (selectedTask) {
    return (
      <TaskDetail 
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        onConfirm={handleTaskConfirm}
      />
    );
  }

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      <TaskOverview
        overallProgress={overallProgress}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        pendingTasks={pendingTasks}
      />

      <AISmartAssignment 
        onReassignTasks={handleAIReassignTasks}
        taskStats={taskStats}
      />

      {/* 新建任务卡片 */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>任务管理</span>
            <Button 
              onClick={() => setShowNewTaskForm(true)}
              size="sm"
              className="h-8 px-3 text-xs bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-3 w-3 mr-1" />
              新建任务
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <TaskCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskSelect={setSelectedTask}
            onAIProcess={handleAIProcess}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
