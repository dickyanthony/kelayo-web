import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DatePicker,
  Dropdown,
  Image,
  Input,
  Select,
} from "@nextui-org/react";
import {
  CategoryMenu,
  Footer,
  NavBar,
  TourCard,
  WrapHCenter,
} from "../../components";
import Home1 from "../../assets/home-1.png";

export default function Home() {
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
          <CardBody className="!border-transparent justify-between before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_30%)] shadow-small ml-1 z-10">
            <div className="text-base font-bold text-white min sm:text-4xl lg:text-6xl">
              KELAYO: KELANA
            </div>
            <div className="text-base font-bold text-white sm:text-4xl lg:text-6xl">
              NGAYOGYAKARTA
            </div>
            <div className="text-sm font-bold text-white md:mt-4 md:mb-4 sm:text-2xl">
              Rasakan Pengalaman Berwisata yang
            </div>
            <div className="text-sm font-bold text-white mb-2 sm:mb-4 lg:mb-8 sm:text-xl lg:text-2xl">
              Berbeda Bersama <span className="text-primary-text">KELAYO</span>
            </div>
            <div className="flex flex-row bg-white/10">
              <Select
                label="Jenis Wisata"
                variant="bordered"
                defaultValue=""
                className="max-w-xs !border-none"
              />
              <Input
                label="Jenis Wisata"
                variant="bordered"
                defaultValue="junior@nextui.org"
                className="max-w-xs bg-opacity-0 !border-none"
              />
              <DatePicker
                label="Jenis Wisata"
                variant="bordered"
                className="max-w-xs !border-none"
              />
            </div>
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Notify me
            </Button>
          </CardBody>
        </Card>
        <WrapHCenter className="p-6">
          <div className="text-[#181E4B] mb-4">KATEGORI</div>
          <div className="text-xl font-bold mb-10 text-primary-text sm:text-4xl text-center">
            Kami Memberikan Solusi Perjalanan Wisatamu
          </div>
          <CategoryMenu />

          <TourCard />
          <Footer />
        </WrapHCenter>
      </div>
    </>
  );
}
