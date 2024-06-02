import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import PemesananPenginapanForm from './PemesananPenginapanForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <PemesananPenginapanForm isNew />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
