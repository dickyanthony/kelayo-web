import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import App from "./App";
import WrapCenter from "./components/WrapCenter";
import Register from "./screens/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
