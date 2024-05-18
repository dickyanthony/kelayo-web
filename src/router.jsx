import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import RequireAuth from "./screens/RequireAuth";
import { WrapVHCenter } from "./components";
import TouristDestination from "./screens/touristDestination";
import LodgingReservation from "./screens/lodgingReservation";
import LodgingReservationDetail from "./screens/lodgingReservation/LodgingReservationDetail";
import TourGuide from "./screens/tourGuide";
import TourGuideDetail from "./screens/tourGuide/TourGuideDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <RequireAuth>
      <Home />
      // </RequireAuth>
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
  {
    path: "/tourist-destination",
    element: (
      // <RequireAuth>
      <TouristDestination />
      // </RequireAuth>
    ),
  },
  {
    path: "/lodging-reservation",
    element: (
      // <RequireAuth>
      <LodgingReservation />
      // </RequireAuth>
    ),
  },
  {
    path: "/lodging-reservation/:id",
    element: (
      // <RequireAuth>
      <LodgingReservationDetail />
      // </RequireAuth>
    ),
  },
  {
    path: "/tour-guide",
    element: (
      // <RequireAuth>
      <TourGuide />
      // </RequireAuth>
    ),
  },
  {
    path: "/tour-guide/:id",
    element: (
      // <RequireAuth>
      <TourGuideDetail />
      // </RequireAuth>
    ),
  },
]);

export default router;
