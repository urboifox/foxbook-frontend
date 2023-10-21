import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = {};
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
