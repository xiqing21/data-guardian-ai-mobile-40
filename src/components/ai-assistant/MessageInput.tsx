
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleSetMessage = (message: string) => {
    setInputValue(message);
  };

  return (
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
  );
};

export default MessageInput;
export { MessageInput };
