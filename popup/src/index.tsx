import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import { fetchMessages, markMessageAsRead } from './api';
import { Message } from './types';
import './index.css';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await fetchMessages();
        setMessages(messages);
      } catch (error) {
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleMarkAsRead = (id: string) => {
    markMessageAsRead(id);
    setMessages(messages.map(msg => msg.id === id ? { ...msg, read: true } : msg));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <MessageList messages={messages} onMarkAsRead={handleMarkAsRead} />;
};

export default App;