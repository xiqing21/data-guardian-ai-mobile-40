
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { message-square, phone, settings, user } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '您好！我是数据治理智能助手，可以帮您处理数据质量问题、任务分配和智能分析。请告诉我您需要什么帮助？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: '数据质量分析', action: '请分析当前数据质量状况' },
    { label: '异常数据检测', action: '检测异常数据并生成报告' },
    { label: '自动外呼任务', action: '启动手机号验证外呼任务' },
    { label: '任务进度查询', action: '查看当前治理任务进度' }
  ];

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('数据质量') || input.includes('质量分析')) {
      return '根据最新分析，当前数据质量指标如下：\n• 完整性：92.3%（较上周提升2.1%）\n• 准确性：95.1%（符合预期目标）\n• 一致性：88.7%（需要重点关注）\n\n建议优先处理地址字段的一致性问题，已为您生成相关治理任务。';
    }
    
    if (input.includes('异常') || input.includes('检测')) {
      return '已完成异常数据检测，发现以下问题：\n• 手机号格式异常：1,247条\n• 重复手机号：892条\n• 地址信息不完整：2,156条\n• 证照有效期过期：134条\n\n智能体将自动处理其中86%的问题，剩余需要人工确认的已生成工单。';
    }
    
    if (input.includes('外呼') || input.includes('电话')) {
      return '自动外呼任务已启动：\n• 待验证手机号：3,421个\n• 预计完成时间：2小时15分钟\n• 成功率预测：87%\n\n外呼脚本已优化，支持普通话和山西话两种语言。系统将实时更新验证结果。';
    }
    
    if (input.includes('任务') || input.includes('进度')) {
      return '当前治理任务进度：\n• 总任务数：156个\n• 已完成：89个（57%）\n• 进行中：45个（29%）\n• 待处理：22个（14%）\n\n预计今日完成率：78%，明日可完成全部任务。需要我为您重新分配任务优先级吗？';
    }
    
    return '我已收到您的请求，正在调用相关的AI模型进行分析。基于光明大模型的智能分析能力，我可以为您提供数据治理的全流程支持。请稍等片刻，我会为您提供详细的分析结果。';
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // 模拟语音识别
    setTimeout(() => {
      setIsListening(false);
      setInputValue('请帮我分析当前的数据质量状况');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <message-square className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI数据治理助手</h2>
            <p className="text-sm text-gray-500">基于光明大模型 • 实时在线</p>
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="p-4 bg-white border-b">
        <p className="text-sm text-gray-600 mb-3">快捷操作：</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage(action.action)}
              className="text-xs"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border shadow-sm p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">AI正在思考...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的问题..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button
            onClick={startVoiceInput}
            variant={isListening ? "default" : "outline"}
            size="sm"
            className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
          >
            {isListening ? "录音中..." : "🎤"}
          </Button>
          <Button
            onClick={() => handleSendMessage(inputValue)}
            size="sm"
            disabled={!inputValue.trim()}
          >
            发送
          </Button>
        </div>
        {isListening && (
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="animate-pulse">
              正在监听语音输入...
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
