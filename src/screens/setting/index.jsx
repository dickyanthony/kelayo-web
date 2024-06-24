import { Tabs, Tab } from '@nextui-org/react';
import { useAuth } from '../../hook/auth/Auth';
import DestinasiWisataList from './dashboard/destinasiWisata/DestinasiWisataList';
import PemesananPenginapanList from './dashboard/pemesananPenginapan/PemesananPenginapanList';
import PemanduWisataList from './dashboard/pemanduWisata/PemanduWisataList';
import AkunList from './dashboard/akun/AkunList';
import PenyewaanTransportasiList from './dashboard/penyewaanTransportasi/PenyewaanTransportasiList';
import { NavBar, WrapHCenterXL } from '../../components';
import ProfilEdit from './dashboard/profile/ProfilEdit';
import GantiPassword from './dashboard/GantiPassword/gantiPassword';
import OrderPenginapanList from './dashboard/orderPenginapan/OrderPenginapanList';
import OrderPemanduList from './dashboard/orderPemandu/OrderPemanduList';
import Dashboard from './dashboard/dashboard';
import OrderTransportasiList from './dashboard/orderTransportasi/OrderTransportasiList';

export default () => {
  const {
    authState: { user },
  } = useAuth();

  const tabData = [];

  if (user.role !== 'normal' && user.role !== 'destinasi_wisata') {
    tabData.unshift({ key: 'dashboard', title: 'Dashboard', content: <Dashboard /> });
  }

  if (user.role === 'admin')
    tabData.push({
      key: 'akun',
      title: 'Akun',
      content: <AkunList />,
    });

  if (user.role === 'admin' || user.role === 'destinasi_wisata')
    tabData.push({
      key: 'destinasi_wisata',
      title: 'Destinasi Wisata',
      content: <DestinasiWisataList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'penyedia_penginapan')
    tabData.push({
      key: 'pemesanan_penginapan',
      title: 'Pemesanan Penginapan',
      content: <PemesananPenginapanList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'penyedia_transportasi')
    tabData.push({
      key: 'penyewaan_transportasi',
      title: 'Penyewaan Transportasi',
      content: <PenyewaanTransportasiList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'pemandu_wisata')
    tabData.push({
      key: 'pemandu_wisata',
      title: 'Pemandu Wisata',
      content: <PemanduWisataList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'penyedia_penginapan' || user.role === 'normal')
    tabData.push({
      key: 'order_penginapan',
      title: 'Order Penginapan',
      content: <OrderPenginapanList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'pemandu_wisata' || user.role === 'normal')
    tabData.push({
      key: 'order_pemandu',
      title: 'Order Pemandu',
      content: <OrderPemanduList user={user} />,
    });

  if (user.role === 'admin' || user.role === 'penyedia_transportasi' || user.role === 'normal')
    tabData.push({
      key: 'order_transportasi',
      title: 'Order Transportasi',
      content: <OrderTransportasiList user={user} />,
    });

  return (
    <div className="w-full">
      <NavBar />
      <WrapHCenterXL>
        <div className="flex flex-col px-4 mt-4">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" isVertical={true}>
              {tabData.map(({ key, title, content }) => (
                <Tab key={key} title={title}>
                  {content}
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </WrapHCenterXL>
    </div>
  );
};
