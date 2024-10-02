import React from 'react';
import MessageItem from './MessageItem';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  onMarkAsRead: (id: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onMarkAsRead }) => {
  if (messages.length === 0) return <div>No messages</div>;

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <MessageItem key={message.id} message={message} onMarkAsRead={onMarkAsRead} />
      ))}
    </div>
  );
};

export default MessageList;