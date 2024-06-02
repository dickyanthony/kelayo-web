import { Footer, NavBar, WrapHCenterXL } from '../../../../components';
import AkunForm from './AkunForm';

export default () => {
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <AkunForm isEdit={false} />
      </WrapHCenterXL>
      <Footer />
    </div>
  );
};
