import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import PenyewaanTransportasiForm from './PenyewaanTransportasiForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <PenyewaanTransportasiForm isNew />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
