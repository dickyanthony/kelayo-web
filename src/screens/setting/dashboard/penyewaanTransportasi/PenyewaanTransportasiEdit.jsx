import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import PenyewaanTransportasiForm from './PenyewaanTransportasiForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <PenyewaanTransportasiForm isEdit />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
