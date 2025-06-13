
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, MessageSquare, Zap, TrendingUp, Clock } from 'lucide-react';

interface AIAssistantWithPropsProps {
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistantWithProps: React.FC<AIAssistantWithPropsProps> = ({ employeeTasks }) => {
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
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      let assistantReply = '';
      
      if (inputValue.includes('任务') || inputValue.includes('待处理')) {
        assistantReply = `根据当前系统数据分析：

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
        assistantReply = `📊 **滨河公司数据质量分析**

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
        assistantReply = `🤖 **AI智能体运行状态**

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
        assistantReply = `我理解您的问题。基于当前系统状态（${employeeTasks?.totalToday || 28}个今日任务，${employeeTasks?.completedToday || 8}个已完成），我建议：

✨ **可用功能**
• 任务智能分配与优化
• 数据质量实时监控  
• 异常情况自动处理
• 工作效率分析报告

请告诉我您具体需要什么帮助，我会为您提供针对性的解决方案。`;
      }

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

  const quickActions = [
    { label: '查看任务状态', action: () => setInputValue('当前任务状态如何？') },
    { label: '数据质量分析', action: () => setInputValue('帮我分析数据质量') },
    { label: 'AI智能分配', action: () => setInputValue('启动AI智能任务分配') },
    { label: '异常检测', action: () => setInputValue('检查是否有数据异常') }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">AI数智助手</h2>
            <p className="text-sm text-gray-500">专业数据治理智能体</p>
          </div>
          <Badge className="ml-auto bg-green-100 text-green-700">在线</Badge>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <div className="p-2 bg-blue-500 rounded-full self-start">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              <div
                className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="p-2 bg-gray-300 rounded-full self-start">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="p-2 bg-blue-500 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border shadow-sm p-3 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 快捷操作 */}
      <div className="p-4 bg-white border-t">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={action.action}
              className="text-xs h-8"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的问题..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="px-3">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantWithProps;
