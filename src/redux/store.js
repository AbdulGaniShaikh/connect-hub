import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slices/counter';
import friendRequest from './slices/friendRequestsSlice';

export default configureStore({
  reducer: {
    counter: countReducer,
    friendRequests: friendRequest
  }
});
