import React from 'react';
import { Message } from './types';

interface MessageItemProps {
  message: Message;
  onMarkAsRead: (id: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onMarkAsRead }) => {
  return (
    <div className={`p-4 border rounded ${message.read ? 'bg-gray-200' : 'bg-white'}`}>
      <p>{message.content}</p>
      <button onClick={() => onMarkAsRead(message.id)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Mark as Read
      </button>
    </div>
  );
};

export default MessageItem;