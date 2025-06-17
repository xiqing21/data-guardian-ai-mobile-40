import React, { useState, useEffect } from 'react';
import AIAssistantWithProps from '@/components/AIAssistantWithProps';
import AnalyticsReports from '@/components/AnalyticsReports';
import TaskManagement from '@/components/TaskManagement';
import RoleBasedContent from '@/components/RoleBasedContent';
import { useRoleManagement } from '@/hooks/useRoleManagement';
import AppHeader from '@/components/AppHeader';
import AIWorkbench from '@/components/AIWorkbench';
import DataQualityRadar from '@/components/DataQualityRadar';
import BottomNavigation from '@/components/BottomNavigation';
import FloatingAvatar from '@/components/FloatingAvatar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 使用角色管理钩子
  const {
    currentRole,
    availableRoles,
    switchRole,
    getCurrentRoleContent,
    hasPermission,
    getRoleStatistics,
    getRoleTasks
  } = useRoleManagement();

  const roleContent = getCurrentRoleContent();
  const roleStatistics = getRoleStatistics();
  const roleTasks = getRoleTasks();
  
  const [dataQuality, setDataQuality] = useState({
    completeness: 92,
    accuracy: 95,
    consistency: 88,
    timeliness: 90,
    compliance: 94,
    uniqueness: 96
  });

  // 增加6维度的详细数据
  const [dimensionDetails, setDimensionDetails] = useState({
    completeness: { issues: 128, trend: '+2.1%', level: '良好' },
    accuracy: { issues: 45, trend: '+1.8%', level: '优秀' },
    consistency: { issues: 287, trend: '-0.5%', level: '待改进' },
    timeliness: { issues: 156, trend: '+3.2%', level: '良好' },
    compliance: { issues: 67, trend: '+1.5%', level: '优秀' },
    uniqueness: { issues: 23, trend: '+0.8%', level: '优秀' }
  });

  const [treatmentStats, setTreatmentStats] = useState({
    autoTreatmentRate: 90,
    accuracy: 100,
    abnormalDetectionRate: 92,
    callSuccessRate: 85,
    smsResponseRate: 80
  });

  // AI智能体状态 - 整合后的状态
  const [integratedAIStatus, setIntegratedAIStatus] = useState({
    activeAgents: 5,
    processingTasks: 23,
    completionRate: 96.8,
    pendingAutoTasks: 8,
    aiProcessingTasks: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataQuality(prev => ({
        ...prev,
        completeness: Math.min(95, prev.completeness + Math.random() * 0.5),
        accuracy: Math.min(98, prev.accuracy + Math.random() * 0.3)
      }));
      
      // 更新整合后的AI状态
      setIntegratedAIStatus(prev => ({
        ...prev,
        processingTasks: Math.max(15, prev.processingTasks + Math.floor(Math.random() * 10 - 5)),
        aiProcessingTasks: Math.max(10, prev.aiProcessingTasks + Math.floor(Math.random() * 6 - 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-4 p-4 pb-20">
      {/* 整合的AI智能工作台 */}
      <AIWorkbench
        currentRole={currentRole}
        roleContent={roleContent}
        roleTasks={roleTasks}
        integratedAIStatus={integratedAIStatus}
        onTabChange={setActiveTab}
      />

      {/* 基于角色的内容显示 */}
      <RoleBasedContent
        role={currentRole}
        roleContent={roleContent}
        statistics={roleStatistics}
        tasks={roleTasks}
      />

      {/* 数据质量雷达图 - 增强版本 */}
      <DataQualityRadar
        currentRole={currentRole}
        roleContent={roleContent}
        dataQuality={dataQuality}
        dimensionDetails={dimensionDetails}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 - 现在包含角色切换功能 */}
      <AppHeader 
        currentRole={currentRole} 
        availableRoles={availableRoles}
        onRoleChange={switchRole}
      />

      {/* 主要内容区域 */}
      <div className="flex-1">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'ai-assistant' && (
          <AIAssistantWithProps 
            employeeTasks={roleTasks} 
            currentRole={currentRole}
          />
        )}
        {activeTab === 'analytics' && roleContent.showAnalytics && <AnalyticsReports />}
        {activeTab === 'tasks' && roleContent.showTasks && <TaskManagement employeeTasks={roleTasks} />}
      </div>

      {/* 悬浮数智人助手 */}
      <FloatingAvatar onAvatarClick={() => setActiveTab('ai-assistant')} />

      {/* 底部导航栏 - 根据角色权限动态显示 */}
      <BottomNavigation
        activeTab={activeTab}
        roleContent={roleContent}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
