import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import CustomPagination from './CustomPagination';
import { ItemRentTransportation, SkeletonRentTransportation } from '.';
import Fortuner from '../assets/fortuner.png';
import Beat from '../assets/beat.png';
import { getListRentTransportationAPI } from '../api/rentTransportation';
import useSnackbar from './Snackbar';
const DATA_CAR = [
  {
    id: 1,
    name: 'Rentcar jogja',
    image: Fortuner,
  },
  {
    id: 2,
    name: 'Yogya Rental Mobil',
    image: Fortuner,
  },
  {
    id: 3,
    name: 'jogja Transport',
    image: Fortuner,
  },
  {
    id: 4,
    name: 'Jhony Fonsen',
    image: Fortuner,
  },
];
const DATA_MOTOR = [
  {
    id: 1,
    name: 'Mandiri Motor',
    image: Beat,
  },
  {
    id: 2,
    name: 'WS Rental',
    image: Beat,
  },
  {
    id: 3,
    name: 'Perdana rent',
    image: Beat,
  },
];
export default function TabRentTransportation(props) {
  const { setSelectedTab } = props;
  const { openSnackbarError } = useSnackbar();
  const [selected, setSelected] = React.useState(1);
  const [rentTransportation, setRentTransportation] = useState({
    listData: [],
    totalData: 0,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const signal = useRef();

  useEffect(() => {
    getList();
  }, [selected]);

  const getList = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    const params = { type: selected };
    getListRentTransportationAPI(params, signal.current?.signal)
      .then((res) => {
        const data = (res.listData || []).map((item) => {
          const imageBlob = new Blob([new Uint8Array(item.image.data)], { type: 'image/jpeg' });
          const url = URL.createObjectURL(imageBlob);
          return {
            ...item,
            image: url,
          };
        });
        setRentTransportation({
          totalPage: res.totalPage,
          totalData: res.totalData,
          listData: data,
        });
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex w-full flex-col mt-16">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(e) => {
          setSelected(e);
          setSelectedTab(e);
        }}
      >
        <Tab key="1" title="Rental Mobil">
          <Card>
            <CardBody className="flex items-center justify-center">
              <div className="w-full gap-y-8 gap-x-2 grid grid-cols-1 min-[432px]:grid-cols-2 sm:grid-cols-3">
                {loading && <SkeletonRentTransportation />}
                {!loading &&
                  rentTransportation.listData.map((item, index) => {
                    return <ItemRentTransportation key={index} item={item} />;
                  })}
              </div>
            </CardBody>
          </Card>
          <CustomPagination totalPage={rentTransportation.totalPage} />
        </Tab>
        <Tab key="2" title="Rental Motor">
          <Card>
            <CardBody className="flex items-center justify-center">
              <div className="w-full gap-y-8 gap-x-2 grid grid-cols-1 min-[432px]:grid-cols-2 sm:grid-cols-3">
                {loading && <SkeletonRentTransportation />}
                {!loading &&
                  rentTransportation.listData.map((item, index) => {
                    return <ItemRentTransportation key={index} item={item} />;
                  })}
              </div>
            </CardBody>
          </Card>
          <CustomPagination totalPage={rentTransportation.totalPage} />
        </Tab>
      </Tabs>
    </div>
  );
}
