import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useAuth } from '../../hook/auth/Auth';
import DestinasiWisataList from './dashboard/destinasiWisata/DestinasiWisataList';
import PemesananPenginapanList from './dashboard/pemesananPenginapan/PemesananPenginapanList';
import PemanduWisataList from './dashboard/pemanduWisata/PemanduWisataList';
import AkunList from './dashboard/akun/AkunList';
import PenyewaanTransportasiList from './dashboard/penyewaanTransportasi/PenyewaanTransportasiList';

export default () => {
  const {
    authState: { user },
  } = useAuth();

  const tabData = [
    {
      key: 'profil',
      title: 'Profil',
      content: null,
    },
  ];

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

  return (
    // <Table />
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={false}>
          {tabData.map(({ key, title, content }) => (
            <Tab key={key} title={title}>
              {content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
