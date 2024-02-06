"use client";

import { useState, useCallback, useRef } from 'react';
import { askChatGPT } from '../api/route';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

export default function Home() {
  // State
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Handlers
  const handleSendMessage = useCallback(async (message: string) => {
    const response = await askChatGPT(message);
    setMessages([...messagesRef.current, { text: message, sender: 'user' }, { text: response.data, sender: 'bot' }]);
  }, []);

  // Main Component
  return (
    <div className="flex flex-col flex-grow w-full items-center justify-center h-dvh bg-slate-200 ">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
