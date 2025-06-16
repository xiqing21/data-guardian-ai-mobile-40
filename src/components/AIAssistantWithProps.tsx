
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { useAIMessages } from '../hooks/useAIMessages';
import MessageList from './ai-assistant/MessageList';
import QuickActions from './ai-assistant/QuickActions';
import MessageInput from './ai-assistant/MessageInput';

interface AIAssistantWithPropsProps {
  employeeTasks?: {
    pendingTasks: number;
    urgentTasks: number;
    inProgressTasks: number;
    completedToday: number;
    totalToday: number;
  };
}

const AIAssistantWithProps: React.FC<AIAssistantWithPropsProps> = ({ employeeTasks }) => {
  const { messages, isTyping, sendMessage } = useAIMessages(employeeTasks);

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

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
      <MessageList messages={messages} isTyping={isTyping} />

      {/* 底部操作区域 */}
      <div className="p-4 bg-white border-t">
        <QuickActions onActionClick={handleQuickAction} />
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default AIAssistantWithProps;
