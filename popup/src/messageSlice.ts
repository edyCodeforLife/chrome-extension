import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from './types';

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    markAsRead(state, action: PayloadAction<string>) {
      const message = state.messages.find(msg => msg.id === action.payload);
      if (message) {
        message.read = true;
      }
    },
  },
});

export const { setMessages, markAsRead } = messageSlice.actions;
export default messageSlice.reducer;