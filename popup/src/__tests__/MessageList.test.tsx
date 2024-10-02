import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageList from '../MessageList';
import { Message } from '../types';

const messages: Message[] = [
  { id: '1', content: 'Test message', priority: 'high', timestamp: '2024-09-30T15:00:00Z', read: false },
];

test('renders no messages state', () => {
  render(<MessageList messages={[]} onMarkAsRead={() => {}} />);
  const noMessagesElement = screen.getByText(/no messages/i);
  expect(noMessagesElement).toBeInTheDocument();
});

test('renders messages', () => {
  render(<MessageList messages={messages} onMarkAsRead={() => {}} />);
  const messageElement = screen.getByText(/test message/i);
  expect(messageElement).toBeInTheDocument();
});