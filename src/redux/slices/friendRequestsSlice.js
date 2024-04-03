import { createSlice } from '@reduxjs/toolkit';

export const friendRequests = createSlice({
  name: 'friendRequests',
  initialState: {
    requests: [],
    friendsFlag: false
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action) => {
      const id = action.payload;
      state.requests = state.requests.filter((request) => id !== request.friendRequestId);
    },
    clearRequests: (state) => {
      state.requests = [];
    },
    flipFlag: (state) => {
      state.friendsFlag = !state.friendsFlag;
    }
  }
});

export const { removeRequest, setRequests, clearRequests, flipFlag } = friendRequests.actions;
export const selectRequests = (state) => state.friendRequests.requests;
export const selectFriendsFlag = (state) => state.friendRequests.friendsFlag;

export default friendRequests.reducer;
