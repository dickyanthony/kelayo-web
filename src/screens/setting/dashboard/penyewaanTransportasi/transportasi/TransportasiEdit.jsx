import { Footer, NavBar, WrapHCenterXL } from '../../../../../components';
import TransportasiForm from './TransportasiForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <TransportasiForm isEdit />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
