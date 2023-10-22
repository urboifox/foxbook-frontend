import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userDataSlice";
import posts from "./slices/postsSlice";
import users from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    user,
    posts,
    users,
  },
});
