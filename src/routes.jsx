import { createBrowserRouter } from "react-router-dom";
import {
  GlobalLayout,
  HomePage,
  LoginPage,
  PostPage,
  RegisterPage,
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
        path: "/:postId",
        element: <PostPage />,
      },
    ],
  },
]);

export default router;
