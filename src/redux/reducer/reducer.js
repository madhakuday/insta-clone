import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updatePostId: (state, action) => {
      state.user.likedPosts = action.payload;
    },
  },
});

export const { setUser, updatePostId } = userSlice.actions;

export const selectuser = (state) => state?.user;

export default userSlice.reducer;
