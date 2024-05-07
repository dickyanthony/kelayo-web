import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/Login";
import App from "./App";
import WrapCenter from "./components/WrapCenter";

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
    element: <Login />,
  },
]);

export default router;
