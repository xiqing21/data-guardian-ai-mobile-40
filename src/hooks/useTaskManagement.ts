
import { useState } from 'react';
import { Task, Category } from '../types/Task';

export const useTaskManagement = (employeeTasks?: {
  pendingTasks: number;
  urgentTasks: number;
  inProgressTasks: number;
  completedToday: number;
  totalToday: number;
}) => {
  // Use passed employeeTasks data, fallback to defaults
  const defaultTasks = {
    pendingTasks: 12,
    urgentTasks: 3,
    inProgressTasks: 7,
    completedToday: 8,
    totalToday: 28
  };
  
  const currentTasks = employeeTasks || defaultTasks;
  
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

  const overallProgress = Math.round(
    tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length
  );

  const completedTasks = currentTasks.completedToday;
  const inProgressTasks = currentTasks.inProgressTasks;
  const pendingTasks = currentTasks.pendingTasks;
  const autoProcessableTasks = tasks.filter(task => task.autoProcessable && task.status === 'pending').length;

  const taskStats = {
    totalTasks: tasks.length,
    pendingTasks,
    autoProcessableTasks
  };

  const addTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
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

  return {
    tasks,
    categories,
    overallProgress,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    taskStats,
    addTask,
    updateTask,
    handleAIReassignTasks
  };
};
