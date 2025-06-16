
import { useState } from 'react';

export interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EmployeeTasks {
  pendingTasks: number;
  urgentTasks: number;
  inProgressTasks: number;
  completedToday: number;
  totalToday: number;
}

export const useAIMessages = (employeeTasks?: EmployeeTasks) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: `您好！我是您的数据治理AI助手。目前系统状态：
      
📊 **任务概览**
• 待处理任务：${employeeTasks?.pendingTasks || 12}个
• 进行中任务：${employeeTasks?.inProgressTasks || 7}个  
• 紧急任务：${employeeTasks?.urgentTasks || 3}个
• 今日已完成：${employeeTasks?.completedToday || 8}个

我可以帮您处理任务分配、数据质量分析、异常检测等问题。有什么需要协助的吗？`,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const generateAIReply = (inputValue: string): string => {
    if (inputValue.includes('任务') || inputValue.includes('待处理')) {
      return `根据当前系统数据分析：

📋 **任务状态详情**
• 待处理任务：${employeeTasks?.pendingTasks || 12}个（建议优先处理）
• 进行中任务：${employeeTasks?.inProgressTasks || 7}个（正常推进中）
• 紧急任务：${employeeTasks?.urgentTasks || 3}个（⚠️ 需要立即关注）

🎯 **处理建议**
1. 优先处理${employeeTasks?.urgentTasks || 3}个紧急任务
2. AI可自动处理数据补全和异常检测类任务
3. 预计可节省60%的人工处理时间

需要我启动AI智能分配吗？`;
    } else if (inputValue.includes('数据质量') || inputValue.includes('质量')) {
      return `📊 **滨河公司数据质量分析**

当前质量评分：92分

🔍 **各维度表现**
• 准确性：95% ✅ 优秀
• 唯一性：96% ✅ 优秀  
• 完整性：92% 🟡 良好
• 合规性：94% 🟡 良好
• 一致性：88% 🟠 待改进
• 时效性：90% 🟠 待改进

📈 **改进建议**
1. 重点关注一致性和时效性问题
2. 建议启用自动校验规则
3. 加强实时数据同步`;
    } else if (inputValue.includes('AI') || inputValue.includes('智能')) {
      return `🤖 **AI智能体运行状态**

• 活跃智能体：5个
• AI处理任务：15个
• 完成率：96.8%
• 平均处理时间：1.2秒

⚡ **AI能力**
1. 自动数据补全：准确率95%+
2. 异常检测：覆盖率92%
3. 外呼验证：成功率85%
4. 智能分配：效率提升25%

AI正在持续学习优化中，为您提供更好的服务！`;
    } else {
      return `我理解您的问题。基于当前系统状态（${employeeTasks?.totalToday || 28}个今日任务，${employeeTasks?.completedToday || 8}个已完成），我建议：

✨ **可用功能**
• 任务智能分配与优化
• 数据质量实时监控  
• 异常情况自动处理
• 工作效率分析报告

请告诉我您具体需要什么帮助，我会为您提供针对性的解决方案。`;
    }
  };

  const sendMessage = (inputValue: string) => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantReply = generateAIReply(inputValue);
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: assistantReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    messages,
    isTyping,
    sendMessage
  };
};
