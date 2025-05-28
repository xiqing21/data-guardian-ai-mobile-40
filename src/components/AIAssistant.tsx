import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Settings, User, Brain, Zap, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  type: string;
  content: string;
  timestamp: Date;
  confidence?: number;
  processingTime?: string;
  suggestions?: string[];
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '您好！我是基于光明大模型的数据治理智能助手，具备深度学习和自然语言处理能力。我可以为您提供：\n\n🤖 智能数据分析与治理\n📊 实时质量监控与预警\n🔄 自动化处理流程\n📱 智能外呼与验证\n\n请告诉我您需要什么帮助？',
      timestamp: new Date(),
      confidence: 98.5,
      processingTime: '0.3s'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiCapabilities, setAiCapabilities] = useState({
    dataProcessed: 1247892,
    accuracy: 96.8,
    tasksCompleted: 3456,
    responseTime: '0.2s'
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 实时更新AI能力指标
  useEffect(() => {
    const interval = setInterval(() => {
      setAiCapabilities(prev => ({
        ...prev,
        dataProcessed: prev.dataProcessed + Math.floor(Math.random() * 50),
        accuracy: Math.min(99.9, prev.accuracy + (Math.random() - 0.5) * 0.1),
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { label: '智能数据分析', action: '请对当前数据进行深度质量分析，包括完整性、准确性、一致性等维度', icon: '📊' },
    { label: '异常智能检测', action: '启动AI异常检测算法，识别数据中的异常模式和潜在问题', icon: '🔍' },
    { label: '自动治理建议', action: '基于机器学习模型，为当前数据质量问题提供智能治理方案', icon: '🤖' },
    { label: '外呼任务优化', action: '分析外呼成功率，优化外呼策略和时间安排', icon: '📞' },
    { label: '实时监控设置', action: '配置数据质量实时监控规则和预警机制', icon: '⚡' },
    { label: '治理效果评估', action: '评估当前数据治理措施的效果和ROI', icon: '📈' }
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI响应处理时间
    const processingTime = Math.random() * 2 + 0.5;
    setTimeout(() => {
      const aiResponse = generateIntelligentAIResponse(content);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        processingTime: `${processingTime.toFixed(1)}s`,
        suggestions: aiResponse.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, processingTime * 1000);
  };

  const generateIntelligentAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('数据质量') || input.includes('质量分析') || input.includes('深度')) {
      return {
        content: '🧠 **深度数据质量分析报告**\n\n基于光明大模型的多维度分析结果：\n\n📊 **核心指标**\n• 完整性：92.3% ↗️ (+2.1%)\n• 准确性：95.1% ✅ (达标)\n• 一致性：88.7% ⚠️ (需关注)\n• 时效性：91.4% ↗️ (+1.8%)\n• 唯一性：96.2% ✅ (优秀)\n\n🔍 **智能发现**\n• 检测到地址字段存在1,247个不一致问题\n• 发现手机号字段有89个格式异常\n• 识别出156条重复记录\n\n💡 **AI建议**\n1. 优先处理地址一致性问题（预计提升3.2%）\n2. 启用智能手机号验证算法\n3. 配置重复记录自动清理规则\n\n已为您生成对应的治理任务，预计24小时内完成处理。',
        confidence: 94.7,
        suggestions: ['查看详细治理方案', '启动自动处理', '配置监控规则']
      };
    }
    
    if (input.includes('异常') || input.includes('检测') || input.includes('识别')) {
      return {
        content: '🔍 **AI异常检测完成**\n\n运用深度学习算法进行全量数据扫描：\n\n⚠️ **异常统计**\n• 手机号异常：1,247条 (置信度: 97.3%)\n• 地址异常：892条 (置信度: 94.1%)\n• 合同异常：134条 (置信度: 99.2%)\n• 时间异常：67条 (置信度: 96.8%)\n\n🤖 **智能分类**\n• 可自动修复：1,891条 (78.2%)\n• 需人工确认：356条 (14.7%)\n• 建议删除：172条 (7.1%)\n\n🚀 **处理能力**\n• AI自动处理率：86.3%\n• 预计处理时间：2小时15分钟\n• 准确率预测：96.8%\n\n智能体已准备就绪，是否立即启动自动处理流程？',
        confidence: 96.8,
        suggestions: ['启动自动处理', '查看异常详情', '配置处理规则', '生成处理报告']
      };
    }
    
    if (input.includes('外呼') || input.includes('电话') || input.includes('验证') || input.includes('优化')) {
      return {
        content: '📞 **智能外呼系统优化方案**\n\n基于历史数据和机器学习分析：\n\n📈 **当前状态**\n• 待验证号码：3,421个\n• 历史成功率：87.3%\n• 平均响应时间：12.4秒\n• 最佳外呼时段：10:00-11:30, 14:30-16:00\n\n🧠 **AI优化建议**\n• 语音识别准确率可提升至96.5%\n• 外呼成功率预计提升至92.1%\n• 支持方言识别（晋语、官话）\n• 智能重拨策略优化\n\n⚡ **实时能力**\n• 并发外呼：500路\n• 自动分析通话质量\n• 实时情绪识别\n• 智能话术调整\n\n系统已配置最优外呼策略，预计2小时完成全部验证任务。',
        confidence: 92.4,
        suggestions: ['启动外呼任务', '查看历史数据', '优化外呼策略', '设置提醒']
      };
    }
    
    if (input.includes('监控') || input.includes('预警') || input.includes('实时') || input.includes('配置')) {
      return {
        content: '⚡ **实时监控系统配置**\n\n智能监控已激活，正在进行24/7全方位监控：\n\n🎯 **监控范围**\n• 数据质量实时评分\n• 异常模式智能识别\n• 处理任务状态跟踪\n• 系统性能监控\n\n🚨 **预警机制**\n• 质量分数低于85%：立即预警\n• 异常数量超过阈值：自动分析\n• 处理任务延期：智能重新分配\n• 系统负载过高：自动扩容\n\n📊 **智能分析**\n• 趋势预测准确率：94.2%\n• 问题预判时间：提前2-4小时\n• 自动处理覆盖率：89.7%\n\n您希望调整哪些监控参数？我可以为您个性化配置。',
        confidence: 95.1,
        suggestions: ['调整预警阈值', '查看监控面板', '设置报告推送', '优化规则']
      };
    }

    if (input.includes('效果') || input.includes('评估') || input.includes('ROI') || input.includes('成本')) {
      return {
        content: '📈 **数据治理效果评估报告**\n\n基于AI模型的全面效果分析：\n\n💰 **投资回报分析**\n• 人工成本节省：73.2% (月节省28万元)\n• 处理效率提升：356%\n• 错误率降低：89.4%\n• 数据质量提升：24.6%\n\n⏱️ **时间效益**\n• 平均处理时间：从4.2小时降至0.7小时\n• 自动化覆盖率：86.3%\n• 重复工作减少：91.7%\n\n🎯 **质量提升**\n• 数据准确性：从78.3%提升至95.1%\n• 完整性改善：+16.8%\n• 一致性改善：+21.3%\n\n💡 **持续优化**\n基于学习算法，系统效果每月提升2-5%，预计6个月达到最优状态。',
        confidence: 97.2,
        suggestions: ['查看详细报告', '导出分析数据', '设置定期评估', '优化策略']
      };
    }
    
    return {
      content: '🤖 **智能分析中...**\n\n我正在调用光明大模型的多个AI能力模块进行深度分析：\n\n🧠 自然语言理解模块\n🔍 数据智能分析模块\n📊 预测分析模块\n⚡ 实时处理模块\n\n基于您的问题，我将为您提供最专业的数据治理建议。如果您有具体的数据问题，请详细描述，我可以提供更精准的解决方案。\n\n💡 您也可以尝试问我关于数据质量、异常检测、自动化处理等方面的问题。',
      confidence: 89.3,
      suggestions: ['数据质量分析', '异常检测', '自动化处理', '效果评估']
    };
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // 模拟语音识别
    setTimeout(() => {
      setIsListening(false);
      setInputValue('请帮我进行全面的数据质量深度分析');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">光明大模型助手</h2>
              <p className="text-sm text-gray-500">深度学习 • 智能分析 • 实时在线</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-600">
              AI活跃
            </Badge>
          </div>
        </div>
        
        {/* AI能力指标 */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-blue-600">{aiCapabilities.dataProcessed.toLocaleString()}</div>
            <div className="text-gray-600">数据处理量</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-semibold text-green-600">{aiCapabilities.accuracy.toFixed(1)}%</div>
            <div className="text-gray-600">准确率</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <div className="font-semibold text-purple-600">{aiCapabilities.tasksCompleted}</div>
            <div className="text-gray-600">完成任务</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <div className="font-semibold text-orange-600">{aiCapabilities.responseTime}</div>
            <div className="text-gray-600">响应时间</div>
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="p-4 bg-white border-b">
        <p className="text-sm text-gray-600 mb-3">🚀 智能助手能力：</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage(action.action)}
              className="text-xs justify-start h-auto py-2 px-3"
            >
              <span className="mr-2">{action.icon}</span>
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
              className={`max-w-[85%] p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              
              {/* AI消息的额外信息 */}
              {message.type === 'ai' && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {message.confidence && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        置信度: {message.confidence}%
                      </div>
                    )}
                    {message.processingTime && (
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        耗时: {message.processingTime}
                      </div>
                    )}
                  </div>
                  
                  {/* 智能建议 */}
                  {message.suggestions && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 mb-1">💡 智能建议：</div>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs h-6 px-2"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border shadow-sm p-4 rounded-lg max-w-[85%]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">光明大模型正在深度分析...</span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                🧠 调用多个AI模块进行智能处理
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
            placeholder="向AI助手描述您的数据治理需求..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button
            onClick={startVoiceInput}
            variant={isListening ? "default" : "outline"}
            size="sm"
            className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
          >
            {isListening ? "🎤 录音中..." : "🎤"}
          </Button>
          <Button
            onClick={() => handleSendMessage(inputValue)}
            size="sm"
            disabled={!inputValue.trim()}
            className="bg-purple-500 hover:bg-purple-600"
          >
            发送
          </Button>
        </div>
        {isListening && (
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-600">
              🎤 正在监听语音输入... 支持普通话/方言识别
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
