import { configureStore } from '@reduxjs/toolkit';
import friendRequest from './slices/friendRequestsSlice';
import userInfo from './slices/userInfoSlice';
import messages from './slices/messageSlice';
import serverStatus from './slices/serverStatus';

export default configureStore({
  reducer: {
    friendRequests: friendRequest,
    userInfo: userInfo,
    messages: messages,
    serverStatus: serverStatus
  }
});
