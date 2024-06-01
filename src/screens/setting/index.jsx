import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useAuth } from '../../hook/auth/Auth';
import DestinasiWisataList from './dashboard/destinasiWisata/DestinasiWisataList';

export default () => {
  const {
    authState: { user },
  } = useAuth();

  const tabData = [
    {
      key: 'destinasi_wisata',
      title: 'Destinasi Wisata',
      content: <DestinasiWisataList user={user} />,
    },
    {
      key: 'wisata_alam',
      title: 'Wisata Alam',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      key: 'penyewaan_transportasi',
      title: 'Penyewaan Transportasi',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];
  return (
    // <Table />
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={false}>
          {tabData.map(({ key, title, content }) => (
            <Tab key={key} title={title}>
              <Card>
                <CardBody>{content}</CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
