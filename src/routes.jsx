import { createBrowserRouter } from "react-router-dom";
import {
  EditPostPage,
  EditUserPage,
  GlobalLayout,
  HomePage,
  LoginPage,
  RegisterPage,
  UserPage,
  UsersPage,
} from "./components/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
      {
        path: "/users/edit/:userId",
        element: <EditUserPage />,
      },
      {
        path: "/posts/edit/:postId",
        element: <EditPostPage />,
      },
    ],
  },
]);

export default router;
