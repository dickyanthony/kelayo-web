import { Card, CardBody, Image } from "@nextui-org/react";
import { ItemTourGuide, NavBar, WrapHCenter } from "../../components";
import TourGuideHeader from "../../assets/tour-guide-header.png";
import Mesyah from "../../assets/mesyah-dwi-nastiya.png";
const DATA = [
  {
    id: 1,
    name: "Meysyah Dwi",
    image: Mesyah,
  },
  {
    id: 2,
    name: "Azhar Ammar",
    image: Mesyah,
  },
  {
    id: 3,
    name: "Mutiara Nabila",
    image: Mesyah,
  },
  {
    id: 4,
    name: "Jhony Fonsen",
    image: Mesyah,
  },
];

const TourGuide = () => {
  return (
    <div className="w-full">
      <NavBar className="absolute" style={{ width: "100vw" }} />
      <Card className="border-none flex items-center justify-center min-h-[400px] sm:min-h-[400px]">
        <div className="w-screen filter brightness-75 min-h-[400px] sm:min-h-[400px] bg-[#1D90D1]" />

        <CardBody className="flex-row !border-transparent justify-between items-center before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_20%)] lg:w-[calc(100%_-_40%)] ml-1 z-10  max-w-screen-xl gap-4">
          <div className=" flex-grow mb-4">
            <div className="font-bold text-white text-2xl sm:text-xl lg:text-2xl xl:text-4xl w-4/6">
              Belajar dan Menjelajah Yogyakarta? Pemandu Wisata KELAYO Solusinya
            </div>
          </div>
          <Image
            className="hidden sm:block"
            width={650}
            height={450}
            alt="pemandu-wisata"
            src={TourGuideHeader}
          />
        </CardBody>
      </Card>
      <WrapHCenter className="p-6 !w-auto">
        <div className="flex flex-col w-full justify-center items-center">
          <ItemTourGuide list={DATA} />
        </div>
      </WrapHCenter>
    </div>
  );
};
export default TourGuide;
