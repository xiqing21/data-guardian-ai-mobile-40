
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TaskDetail from './TaskDetail';
import AIProcessingDetail from './AIProcessingDetail';
import TaskOverview from './TaskOverview';
import AISmartAssignment from './AISmartAssignment';
import TaskCategoryFilter from './TaskCategoryFilter';
import TaskCard from './TaskCard';
import { Task, Category } from '../types/Task';

const TaskManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [aiProcessingTask, setAiProcessingTask] = useState<Task | null>(null);
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
    console.log('AI处理完成:', result);
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === aiProcessingTask?.id 
          ? { 
              ...task, 
              status: 'completed',
              progress: 100,
              assignee: 'AI智能体',
              aiResult: result
            }
          : task
      )
    );
    setAiProcessingTask(null);
  };

  // AI智能重新分配任务
  const handleAIReassignTasks = () => {
    console.log('开始AI智能重新分配任务');
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.status === 'pending') {
          // AI智能分配逻辑
          let newAssignee = task.assignee;
          
          if (task.autoProcessable) {
            // 自动处理的任务分配给AI
            newAssignee = task.category === 'call' ? 'AI外呼系统' : 'AI智能体';
          } else {
            // 需要人工处理的任务分配给合适的网格员
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

  // If AI processing is active, show the AI processing detail
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

  // If a task is selected, show the detail view
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

      <TaskCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 任务列表 */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskSelect={setSelectedTask}
            onAIProcess={handleAIProcess}
          />
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="fixed bottom-20 right-4">
        <Button className="rounded-full w-14 h-14 shadow-lg bg-blue-500 hover:bg-blue-600">
          <span className="text-2xl">+</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskManagement;
