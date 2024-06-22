import { Card, CardBody, Image } from '@nextui-org/react';
import Airplane from '../../assets/airplane.png';
import CurvedLine from '../../assets/curved-line.png';
import Home1 from '../../assets/home-1.png';
import Line from '../../assets/line.png';
import { CategoryMenu, Footer, MyChatBot, NavBar, WrapHCenterXL } from '../../components';
import InfoEvent from './InfoEvent';

const Home = () => {
  return (
    <>
      <div className="w-full ">
        <NavBar className="absolute" />
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none flex items-center justify-center min-h-72 sm:min-h-56"
        >
          <Image
            alt="home"
            className="w-screen filter brightness-75 min-h-72 sm:min-h-56"
            src={Home1}
            height={150}
          />
          <CardBody className="!border-transparent justify-between before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_32%)] ml-1 z-10">
            <Image width={80} height={70} src={CurvedLine} alt="curved-line" />
            <div className="text-base font-bold text-white min-[746px]:text-4xl lg:text-6xl">
              KELAYO: KELANA
            </div>
            <div className="text-base font-bold text-white min-[746px]:text-4xl lg:text-6xl">
              NGAYOGYAKARTA
            </div>
            <div className="text-sm font-bold text-white md:mt-4 md:mb-4 min-[764px]:text-2xl">
              Rasakan Pengalaman Berwisata yang
            </div>
            <div className="text-sm font-bold text-white mb-2 min-[764px]:mb-4 lg:mb-8 min-[764px]:text-xl lg:text-2xl">
              Berbeda Bersama <span className="text-primary-text">KELAYO</span>
            </div>
            {/* <div className="flex flex-row bg-white/10">
              <Select
                label="Jenis Wisata"
                variant="bordered"
                defaultValue=""
                style={{ border: "none" }}
                className="max-w-xs !border-none !border-0 !focus:border-transparent !border-transparent"
                classNames={
                  {
                    // base: "max-w-full sm:max-w-[15rem] h-10 !border-none !border-0 !border-transparent",
                    // input:
                    //   "text-small !border-none !border-0 !border-transparent",
                    // mainWrapper:
                    //   "h-full font-normal text-default-500 bg-default-400/20 !border-none !focus:border-transparent !border-0",
                    // innerWrapper:
                    //   "h-full font-normal text-default-500 bg-default-400/20 !border-none !focus:border-transparent !border-0",
                    // listbox:
                    //   "h-full font-normal text-default-500 bg-default-400/20 !border-none !focus:border-transparent !border-0",
                    // listboxWrapper:
                    //   "h-full font-normal text-default-500 bg-default-400/20 !border-none !focus:border-transparent !border-0",
                  }
                }
              />
              <Input
                label="Jenis Wisata"
                variant="bordered"
                className="max-w-xs !border-none !focus:border-transparent"
                classNames={{
                  base: "max-w-full sm:max-w-[15rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 !border-none !focus:border-transparent",
                }}
              />
              <DatePicker
                style={{
                  border: "none",
                  borderColor: "transparent",
                  backgroundColor: "transparent",
                }}
                label="Jenis Wisata"
                variant="underlined"
                className="max-w-xs !border-none !border-0 !border-transparent !focus:border-transparent !bg-transparent"
                classNames={{
                  base: "max-w-full sm:max-w-[15rem] h-10 !border-none !border-transparent !border-0 !bg-transparent",
                  mainWrapper:
                    "h-full !border-none !border-0 !border-transparent !bg-transparent",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 !border-none !border-transparent !focus:border-transparent !border-0 !bg-transparent !border-y-0",
                  innerWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 !border-none !border-transparent !focus:border-transparent !border-0 !bg-transparent",
                  calendar:
                    "text-small !border-0 !border-none !border-transparent !bg-transparent",
                  calendarContent:
                    "h-full font-normal text-default-500 bg-default-400/20 !border-none !border-transparent !focus:border-transparent !border-0 !bg-transparent",
                }}
              />
            </div> */}

            {/* <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Notify me
            </Button> */}
          </CardBody>
        </Card>
        <WrapHCenterXL className="p-6">
          <div className="text-[#181E4B] mb-4 font-bold">KATEGORI</div>
          <div className="text-xl font-bold mb-10 text-primary-text sm:text-4xl text-center">
            Kami Memberikan Solusi Perjalanan Wisatamu
          </div>
          <CategoryMenu />
        </WrapHCenterXL>
        <Card className="border-none flex items-center justify-center min-h-72 sm:min-h-56">
          <Image
            alt="home"
            className="w-screen filter brightness-75 min-h-72 sm:min-h-56"
            src={Airplane}
            height={150}
          />
          <CardBody className="!border-transparent justify-center items-center before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_30%)] ml-1 z-10">
            <div className="font-bold text-white max-[478px]:text-base sm:text-2xl lg:text-4xl xl:text-5xl text-center w-3/6 mb-4">
              Buat Liburanmu Lebih Menyenangkan
            </div>
            <Image
              alt="line"
              className="w-20 mt-2 ml-40 max-[478px]:ml-14 lg:w-32 xl:w-72 xl:ml-[500px] "
              src={Line}
              height={10}
            />
          </CardBody>
        </Card>
        <WrapHCenterXL>
          <InfoEvent />
          <MyChatBot />
          <Footer />
        </WrapHCenterXL>
      </div>
    </>
  );
};

export default Home;
