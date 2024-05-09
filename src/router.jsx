import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
