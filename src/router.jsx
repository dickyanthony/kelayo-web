import { createBrowserRouter } from 'react-router-dom';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import RequireAuth from './screens/RequireAuth';
import { WrapVHCenter } from './components';
import TouristDestination from './screens/touristDestination';
import LodgingReservation from './screens/lodgingReservation';
import LodgingReservationDetail from './screens/lodgingReservation/LodgingReservationDetail';
import TourGuide from './screens/tourGuide';
import TourGuideDetail from './screens/tourGuide/TourGuideDetail';
import RentTransportation from './screens/rentTransportation';
import RentTransportationDetail from './screens/rentTransportation/rentTransportationDetail';
import RentTransportationForm from './screens/rentTransportation/rentTransportationForm';
import TouristDestinationDetail from './screens/touristDestination/touristDestinationDetail';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <WrapVHCenter>
        <Login />
      </WrapVHCenter>
    ),
  },
  {
    path: '/register',
    element: (
      <WrapVHCenter>
        <Register />
      </WrapVHCenter>
    ),
  },
  {
    path: '/tourist-destination',
    element: (
      <RequireAuth>
        <TouristDestination />
      </RequireAuth>
    ),
  },
  {
    path: '/tourist-destination/:id',
    element: (
      <RequireAuth>
        <TouristDestinationDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/lodging-reservation',
    element: (
      <RequireAuth>
        <LodgingReservation />
      </RequireAuth>
    ),
  },
  {
    path: '/lodging-reservation/:id',
    element: (
      <RequireAuth>
        <LodgingReservationDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/rent-transportation',
    element: (
      <RequireAuth>
        <RentTransportation />
      </RequireAuth>
    ),
  },
  {
    path: '/rent-transportation/:id',
    element: (
      <RequireAuth>
        <RentTransportationDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/rent-transportation-form/:id',
    element: (
      <RequireAuth>
        <RentTransportationForm />
      </RequireAuth>
    ),
  },
  {
    path: '/tour-guide',
    element: (
      <RequireAuth>
        <TourGuide />
      </RequireAuth>
    ),
  },
  {
    path: '/tour-guide/:id',
    element: (
      <RequireAuth>
        <TourGuideDetail />
      </RequireAuth>
    ),
  },
]);

export default router;
