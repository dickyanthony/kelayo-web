import { useEffect, useRef, useState } from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';
import {
  EmptyState,
  Footer,
  ItemRentTransportation,
  NavBar,
  SkeletonRentTransportation,
  WrapHCenter,
} from '../../components';
import RentalMobil from '../../assets/rental-mobil.png';
import Fortuner from '../../assets/fortuner.png';
import { useParams, useLocation } from 'react-router-dom';
import { getDetailRentTransportationAPI } from '../../api/rentTransportation';
import useSnackbar from '../../components/Snackbar';
const DATA_CAR = [
  {
    id: 1,
    name: 'Rentcar jogja',
    image: Fortuner,
    price: 150000,
  },
  {
    id: 2,
    name: 'Yogya Rental Mobil',
    image: Fortuner,
    price: 200000,
  },
  {
    id: 3,
    name: 'jogja Transport',
    image: Fortuner,
    price: 150000,
  },
  {
    id: 4,
    name: 'Jhony Fonsen',
    image: Fortuner,
    price: 170000,
  },
];

const RentTransportationDetail = () => {
  const { id } = useParams();
  const { openSnackbarError } = useSnackbar();
  const navState = useLocation();
  console.log(navState);
  const [rentTransportationDetail, setRentTransportationDetail] = useState({
    listData: [],
    storeName: '',
    storeImage: '',
    totalPage: 0,
    totalData: 0,
  });
  const [loading, setLoading] = useState(false);
  const signal = useRef();
  useEffect(() => {
    getTransportation();
  }, []);

  const getTransportation = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    const params = { id: id };
    getDetailRentTransportationAPI(params, signal.current?.signal)
      .then((res) => {
        const data = (res.listData || []).map((item) => {
          const imageBlob = new Blob([new Uint8Array(item.image?.data)], { type: 'image/jpeg' });
          const url = URL.createObjectURL(imageBlob);
          return {
            ...item,
            image: url ?? '',
          };
        });
        console.log('data===>', data);
        setRentTransportationDetail({
          listData: data,

          totalPage: res.totalPage,
          totalData: res.totalData,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  console.log(rentTransportationDetail);
  return (
    <div className="w-full">
      <NavBar className="absolute" style={{ width: '100vw' }} />
      <Card className="border-none flex items-center justify-center min-h-[400px] sm:min-h-[400px]">
        <div className="w-screen filter brightness-75 min-h-[400px] sm:min-h-[400px] bg-[#1D90D1]" />

        <CardBody className="flex-row !border-transparent justify-between items-center before:bg-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_20%)] lg:w-[calc(100%_-_40%)] ml-1 z-10  max-w-screen-xl gap-4">
          <div className=" flex-grow mb-4">
            <div className="font-bold text-white text-2xl sm:text-xl lg:text-2xl xl:text-4xl w-4/6">
              Selamat Datang di {navState.state?.name ?? ''}
            </div>
          </div>
          <Image
            className="hidden sm:block mxa-w-[450px] max-h-[350px]"
            width={450}
            height={350}
            alt="rental"
            src={navState.state?.image ?? ''}
          />
        </CardBody>
      </Card>
      <WrapHCenter className="p-6 !w-full">
        <div className="flex flex-col w-full justify-center items-center">
          <div
            className={`gap-y-6 gap-x-8 grid grid-cols-1 min-[432px]:grid-cols-2 sm:gap-x-8 sm:grid-cols-3 `}
          >
            {loading && <SkeletonRentTransportation />}
            {!loading &&
              rentTransportationDetail.listData.length > 0 &&
              rentTransportationDetail.listData.map((item, index) => {
                return <ItemRentTransportation key={index} item={item} showPrice />;
              })}
          </div>
          {!loading && rentTransportationDetail.listData.length === 0 && <EmptyState />}

          <Footer />
        </div>
      </WrapHCenter>
    </div>
  );
};
export default RentTransportationDetail;
