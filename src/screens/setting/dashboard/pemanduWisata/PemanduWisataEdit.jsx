import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import PemanduWisataForm from './PemanduWisataForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <PemanduWisataForm isEdit />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
