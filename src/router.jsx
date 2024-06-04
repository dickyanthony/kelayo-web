import { createBrowserRouter } from 'react-router-dom';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import RequireAuth from './screens/RequireAuth';
import { WrapVHCenter, Page404 } from './components';
import TouristDestination from './screens/touristDestination';
import LodgingReservation from './screens/lodgingReservation';
import LodgingReservationDetail from './screens/lodgingReservation/LodgingReservationDetail';
import TourGuide from './screens/tourGuide';
import TourGuideDetail from './screens/tourGuide/TourGuideDetail';
import RentTransportation from './screens/rentTransportation';
import RentTransportationDetail from './screens/rentTransportation/rentTransportationDetail';
import RentTransportationForm from './screens/rentTransportation/rentTransportationForm';
import TouristDestinationDetail from './screens/touristDestination/touristDestinationDetail';
import Setting from './screens/setting';
import AkunEdit from './screens/setting/dashboard/akun/AkunEdit';
import AkunDetail from './screens/setting/dashboard/akun/AkunDetail';
import AkunNew from './screens/setting/dashboard/akun/AkunNew';
import PemanduWisataEdit from './screens/setting/dashboard/pemanduWisata/PemanduWisataEdit';
import PemanduWisataDetail from './screens/setting/dashboard/pemanduWisata/PemanduWisataDetail';
import PemanduWisataNew from './screens/setting/dashboard/pemanduWisata/PemanduWisataNew';
import PemesananPenginapanEdit from './screens/setting/dashboard/pemesananPenginapan/PemesananPenginapanEdit';
import PemesananPenginapanDetail from './screens/setting/dashboard/pemesananPenginapan/PemesananPenginapanDetail';
import PemesananPenginapanNew from './screens/setting/dashboard/pemesananPenginapan/PemesananPenginapanNew';
import DestinasiWisataEdit from './screens/setting/dashboard/destinasiWisata/DestinasiWisataEdit';
import DestinasiWisataDetail from './screens/setting/dashboard/destinasiWisata/DestinasiWisataDetail';
import DestinasiWisataNew from './screens/setting/dashboard/destinasiWisata/DestinasiWisataNew';
import PenyewaanTransportasiEdit from './screens/setting/dashboard/penyewaanTransportasi/PenyewaanTransportasiEdit';
import PenyewaanTransportasiDetail from './screens/setting/dashboard/penyewaanTransportasi/PenyewaanTransportasiDetail';
import PenyewaanTransportasiNew from './screens/setting/dashboard/penyewaanTransportasi/PenyewaanTransportasiNew';
import TransportasiEdit from './screens/setting/dashboard/penyewaanTransportasi/transportasi/TransportasiEdit';
import TransportasiDetail from './screens/setting/dashboard/penyewaanTransportasi/transportasi/TransportasiDetail';
import TransportasiNew from './screens/setting/dashboard/penyewaanTransportasi/transportasi/TransportasiNew';

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
  {
    path: '/setting',
    element: (
      <RequireAuth>
        <Setting />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/add-account',
    element: (
      <RequireAuth>
        <AkunNew />
      </RequireAuth>
    ),
  },
  ,
  {
    path: '/setting/dashboard/detail-account/:id',
    element: (
      <RequireAuth>
        <AkunDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-account/:id',
    element: (
      <RequireAuth>
        <AkunEdit />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/add-tour-guide',
    element: (
      <RequireAuth>
        <PemanduWisataNew />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/detail-tour-guide/:id',
    element: (
      <RequireAuth>
        <PemanduWisataDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-tour-guide/:id',
    element: (
      <RequireAuth>
        <PemanduWisataEdit />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/add-lodging-reservation',
    element: (
      <RequireAuth>
        <PemesananPenginapanNew />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/detail-lodging-reservation/:id',
    element: (
      <RequireAuth>
        <PemesananPenginapanDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-lodging-reservation/:id',
    element: (
      <RequireAuth>
        <PemesananPenginapanEdit />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/add-tourist-destination',
    element: (
      <RequireAuth>
        <DestinasiWisataNew />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/detail-tourist-destination/:id',
    element: (
      <RequireAuth>
        <DestinasiWisataDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-tourist-destination/:id',
    element: (
      <RequireAuth>
        <DestinasiWisataEdit />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/add-rent-transportation',
    element: (
      <RequireAuth>
        <PenyewaanTransportasiNew />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/detail-rent-transportation/:id',
    element: (
      <RequireAuth>
        <PenyewaanTransportasiDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-rent-transportation/:id',
    element: (
      <RequireAuth>
        <PenyewaanTransportasiEdit />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/rent-transportation/:id/add-transportation/',
    element: (
      <RequireAuth>
        <TransportasiNew />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/detail-rent-transportation/:id/detail-transportation/:rentId',
    element: (
      <RequireAuth>
        <TransportasiDetail />
      </RequireAuth>
    ),
  },
  {
    path: '/setting/dashboard/edit-rent-transportation/:id/edit-transportation/:rentId',
    element: (
      <RequireAuth>
        <TransportasiEdit />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
