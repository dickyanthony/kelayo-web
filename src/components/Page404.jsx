import LostTourist from '../assets/lost-tourist.png';
import { WrapHCenterXL, NavBar, PrimaryButton } from '.';
import { Image } from '@nextui-org/react';
import WrapVHCenter from './WrapHCenter';
import { useNavigate } from 'react-router-dom';
const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <WrapVHCenter className="w-full min-h-screen">
        <Image className="w-64 h-52" src={LostTourist} alt="404" />
        <div className="font-bold text-5xl my-6">404 Page</div>
        <PrimaryButton variant="shadow" onPress={() => navigate('/')}>
          Kembali
        </PrimaryButton>
      </WrapVHCenter>
    </div>
  );
};

export default Page404;
