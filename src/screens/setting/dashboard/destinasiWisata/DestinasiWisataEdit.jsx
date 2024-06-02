import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import DestinasiWisataForm from './DestinasiWisataForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <DestinasiWisataForm isEdit />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
