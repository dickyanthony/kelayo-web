import { Card, CardBody, Image } from "@nextui-org/react";
import {
  Footer,
  ItemRentTransportation,
  NavBar,
  WrapHCenter,
} from "../../components";
import RentalMobil from "../../assets/rental-mobil.png";
import Fortuner from "../../assets/fortuner.png";
const DATA_CAR = [
  {
    id: 1,
    name: "Rentcar jogja",
    image: Fortuner,
    price: 150000,
  },
  {
    id: 2,
    name: "Yogya Rental Mobil",
    image: Fortuner,
    price: 200000,
  },
  {
    id: 3,
    name: "jogja Transport",
    image: Fortuner,
    price: 150000,
  },
  {
    id: 4,
    name: "Jhony Fonsen",
    image: Fortuner,
    price: 170000,
  },
];

const RentTransportationDetail = () => {
  return (
    <div className="w-full">
      <NavBar className="absolute" style={{ width: "100vw" }} />
      <Card className="border-none flex items-center justify-center min-h-[400px] sm:min-h-[400px]">
        <div className="w-screen filter brightness-75 min-h-[400px] sm:min-h-[400px] bg-[#1D90D1]" />

        <CardBody className="flex-row !border-transparent justify-between items-center before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_20%)] lg:w-[calc(100%_-_40%)] ml-1 z-10  max-w-screen-xl gap-4">
          <div className=" flex-grow mb-4">
            <div className="font-bold text-white text-2xl sm:text-xl lg:text-2xl xl:text-4xl w-4/6">
              Selamat Datang di Rental Name
            </div>
          </div>
          <Image
            className="hidden sm:block"
            width={650}
            height={450}
            alt="rental"
            src={RentalMobil}
          />
        </CardBody>
      </Card>
      <WrapHCenter className="p-6 !w-full">
        <div className="flex flex-col w-full justify-center items-center">
          <div
            className={`gap-y-6 gap-x-8 grid grid-cols-1 min-[432px]:grid-cols-2 sm:gap-x-8 sm:grid-cols-3 `}
          >
            {DATA_CAR.map((item, index) => {
              return (
                <ItemRentTransportation key={index} item={item} showPrice />
              );
            })}
          </div>
          <Footer />
        </div>
      </WrapHCenter>
    </div>
  );
};
export default RentTransportationDetail;
