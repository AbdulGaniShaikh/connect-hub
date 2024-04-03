import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    inbox: [],
    count: 0
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setInbox: (state, action) => {
      state.inbox = action.payload;
    },
    newMessage: (state, action) => {
      var newInboxItem = {};
      var { receiverId, senderId, message, post, date } = action.payload.body;

      var newInbox = state.inbox.filter((inbox, idx) => {
        if (inbox.userId === senderId) {
          newInboxItem = state.inbox[idx];
          return false;
        }
        return true;
      });

      newInboxItem.lastMessage = message;
      newInboxItem.post = post;
      newInboxItem.date = date;
      newInboxItem.userId = action.payload.userId === senderId ? receiverId : senderId;
      newInboxItem.senderId = senderId;

      if (!newInboxItem.unreadMessageCount) {
        newInboxItem.unreadMessageCount = 1;
      } else {
        newInboxItem.unreadMessageCount = newInboxItem.unreadMessageCount + 1;
      }
      if (newInboxItem.unreadMessageCount === 1) {
        state.count = state.count + 1;
      }
      state.inbox = [newInboxItem, ...newInbox];
    },

    updateInbox: (state, action) => {
      const newInbox = state.inbox.map((inbox) => {
        if (inbox.userId === action.payload.userId) {
          return { ...inbox, ...action.payload };
        }
        return inbox;
      });
      state.inbox = [...newInbox];
    },
    clearInbox: (state) => {
      state.inbox = [];
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    increaseCount: (state, action) => {
      state.inbox.forEach((inboxItem) => {
        if (action.payload === inboxItem.userId && inboxItem.unreadMessageCount <= 0) {
          if (inboxItem.unreadMessageCount === 1) {
            state.count = Math.max(state.count + 1, 1);
          }
          return;
        }
      });
    },
    descreaseCount: (state, action) => {
      state.inbox.forEach((inboxItem) => {
        if (action.payload === inboxItem.userId && inboxItem.unreadMessageCount > 0) {
          state.count = Math.max(state.count - 1, 0);
          return;
        }
      });
    },
    clearCount: (state) => {
      state.count = 0;
    },
    clearAll: (state) => {
      state.count = 0;
      state.inbox = [];
      state.messages = [];
    }
  }
});

export const { setMessages, addMessage } = messages.actions;
export const { setInbox, clearInbox, newMessage, updateInbox } = messages.actions;
export const { setCount, increaseCount, descreaseCount, clearCount, clearAll } = messages.actions;

export const selectMessages = (state) => state.messages.messages;
export const selectInbox = (state) => state.messages.inbox;
export const selectCount = (state) => state.messages.count;

export default messages.reducer;
