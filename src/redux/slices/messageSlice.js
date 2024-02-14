import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export const { setMessages, addMessage } = messages.actions;
export const selectMessages = (state) => state.messages.messages;

export default messages.reducer;
