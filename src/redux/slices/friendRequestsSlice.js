import { createSlice } from '@reduxjs/toolkit';

export const friendRequests = createSlice({
  name: 'friendRequests',
  initialState: {
    requests: []
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action) => {
      const id = action.payload;
      state.requests = state.requests.filter((request) => id !== request.id);
    }
  }
});

export const { removeRequest, setRequests } = friendRequests.actions;
export const selectRequests = (state) => state.friendRequests.requests;

export default friendRequests.reducer;
