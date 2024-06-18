import { Tab, Tabs } from '@nextui-org/react';
import { NavBar, WrapHCenterXL } from '../../components';
import { useAuth } from '../../hook/auth/Auth';
import GantiPassword from './dashboard/GantiPassword/gantiPassword';
import ProfilEdit from './dashboard/profile/ProfilEdit';

export default () => {
  const {
    authState: { user },
  } = useAuth();

  const tabData = [
    {
      key: 'profil',
      title: 'Profil',
      content: <ProfilEdit />,
    },
    {
      key: 'ganti_password',
      title: 'Ganti Password',
      content: <GantiPassword />,
    },
  ];

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
