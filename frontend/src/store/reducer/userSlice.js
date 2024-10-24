import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],

  reducers: {
    setUserList: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice;
export const { setUserList } = userSlice.actions;
