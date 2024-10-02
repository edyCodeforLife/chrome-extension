import { Message } from './types';

export const fetchMessages = async (): Promise<Message[]> => {
  return new Promise<Message[]>((resolve, reject) => {
    chrome.storage.local.get(['messages'], (result: { messages?: Message[] }) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message || 'Unknown error'));
      } else {
        resolve(result.messages || []);
      }
    });
  });
};

export const markMessageAsRead = (id: string) => {
  chrome.storage.local.get(['messages'], (result) => {
    const messages = result.messages.map((message: Message) =>
      message.id === id ? { ...message, read: true } : message
    );
    chrome.storage.local.set({ messages });
  });
};