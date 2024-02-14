import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slices/counter';
import friendRequest from './slices/friendRequestsSlice';
import userInfo from './slices/userInfoSlice';
import messages from './slices/messageSlice';

export default configureStore({
  reducer: {
    counter: countReducer,
    friendRequests: friendRequest,
    userInfo: userInfo,
    messages: messages
  }
});
