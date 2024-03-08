import { createSlice } from '@reduxjs/toolkit';

export const serverStatus = createSlice({
  name: 'serverStatus',
  initialState: {
    status: 'DOWN'
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  }
});
export const { setStatus } = serverStatus.actions;

export const selectServerStatus = (state) => state.serverStatus.status;
export default serverStatus.reducer;
