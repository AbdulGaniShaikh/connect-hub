import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    user: {}
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    updateTotalPost: (state, action) => {
      state.user.totalPost = action.payload;
    },
    updateTotalFriends: (state, action) => {
      state.user.totalFriends = action.payload;
    },
    decrementTotalFriendsCount: (state) => {
      state.user.totalFriends -= 1;
    },
    incrementTotalFriendsCount: (state) => {
      state.user.totalFriends += 1;
    },
    incrementTotalPostsCount: (state) => {
      state.user.totalPost += 1;
    },

    updateDescription: (state, action) => {
      state.user.description = action.payload;
    },
    updateProfileImageId: (state, action) => {
      state.user.profileImageId = action.payload;
    },
    updateCoverImageId: (state, action) => {
      state.user.coverImageId = action.payload;
    }
  }
});

export const {
  setUserInfo,
  updateCoverImageId,
  updateDescription,
  updateProfileImageId,
  updateTotalFriends,
  updateTotalPost,
  decrementTotalFriendsCount,
  incrementTotalFriendsCount,
  incrementTotalPostsCount
} = userInfo.actions;

export const selectUserInfo = (state) => state.userInfo.user;

export default userInfo.reducer;
