import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import RequireAuth from "./screens/RequireAuth";
import { WrapHCenter, WrapVHCenter } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <WrapHCenter>
          <Home />
        </WrapHCenter>
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <WrapVHCenter>
        <Login />
      </WrapVHCenter>
    ),
  },
  {
    path: "/register",
    element: (
      <WrapVHCenter>
        <Register />
      </WrapVHCenter>
    ),
  },
]);

export default router;
