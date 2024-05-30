import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Card, CardBody, Spacer } from '@nextui-org/react';
import useSnackbar from './Snackbar';
import CustomPagination from './CustomPagination';
import Nature1 from '../assets/nature/nature-1.jpg';
import { CustomCard, EmptyState, FilterPrice, ItemTourCard } from '.';
import { getListTouristDestinationAPI } from '../api/touristDestination';

export default function TabTourist(props) {
  const { setSelectedTab } = props;
  const { openSnackbarError } = useSnackbar();
  const [selected, setSelected] = React.useState('wisata-alam');
  const [touristDestinationList, setTouristDestinationList] = useState({
    totalData: 0,
    totalPage: 0,
    listData: [],
  });
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [loading, setLoading] = useState(false);

  const signal = useRef();
  useEffect(() => {
    getList();
  }, [selected]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getList = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    const params = {};
    if (selected !== 'lainnya') params.type = selected;
    let maxPrice = 0;

    getListTouristDestinationAPI(params, signal.current?.signal)
      .then((res) => {
        const modifiedListData = res.listData.map((item) => {
          const newItem = { ...item };

          if (item.image1) {
            newItem.image1 = createBlobURL(item.image1.data);
          }

          return newItem;
        });
        if (modifiedListData.length > 0) {
          maxPrice = res.listData.reduce(function (prev, current) {
            return prev && prev.price > current.price ? prev : current;
          }).price;
          console.log('max==>', maxPrice);
        }
        setTouristDestinationList({
          totalPage: res.totalPage,
          totalData: res.totalData,
          listData: modifiedListData,
        });
      })
      .then(() => setPrice({ min: 0, max: maxPrice }))
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const onSubmitFilter = (data) => {
    console.log('data==>', data);
    setLoading(true);
    const params = {};

    if (data.wisata) params.name = data.wisata;
    if (data.jenisWisata) params.type = data.jenisWisata;
    if (data.wisata) params.name = data.wisata;
    if (data.filterHarga) params.minPrice = data.filterHarga[0];
    if (data.filterHarga) params.maxPrice = data.filterHarga[1];
    getListTouristDestinationAPI(params, signal.current?.signal)
      .then((res) => {
        const modifiedListData = res.listData.map((item) => {
          const newItem = { ...item };

          if (item.image1) {
            newItem.image1 = createBlobURL(item.image1.data);
          }

          return newItem;
        });
        setTouristDestinationList({
          totalPage: res.totalPage,
          totalData: res.totalData,
          listData: modifiedListData,
        });
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const ImageSkeleton = () => {
    return (
      <div className="flex w-full">
        <CustomCard />
        <Spacer x={4} />
        <CustomCard />
        <Spacer x={4} />
        <CustomCard />
      </div>
    );
  };
  console.log('price==>', price);
  const RenderTab = () => {
    switch (selected) {
      case 'wisata_alam':
        return (
          <>
            <Card>
              <CardBody className="flex items-center justify-center">
                {loading ? (
                  <ImageSkeleton />
                ) : (
                  <ItemTourCard list={touristDestinationList.listData} />
                )}
                {touristDestinationList.listData.length === 0 && !loading && <EmptyState />}
              </CardBody>
            </Card>
            <CustomPagination initial={1} totalPage={touristDestinationList.totalPage} />
          </>
        );
      case 'wisata_budaya':
        return (
          <>
            <Card>
              <CardBody className="flex items-center justify-center">
                {loading ? (
                  <ImageSkeleton />
                ) : (
                  <ItemTourCard list={touristDestinationList.listData} />
                )}
                {touristDestinationList.listData.length === 0 && !loading && <EmptyState />}
              </CardBody>
            </Card>
            <CustomPagination initial={1} totalPage={touristDestinationList.totalPage} />
          </>
        );
      case 'wisata_kuliner':
        return (
          <>
            <Card>
              <CardBody className="flex items-center justify-center">
                {loading ? (
                  <ImageSkeleton />
                ) : (
                  <ItemTourCard list={touristDestinationList.listData} />
                )}
                {touristDestinationList.listData.length === 0 && !loading && <EmptyState />}
              </CardBody>
            </Card>
            <CustomPagination initial={1} totalPage={touristDestinationList.totalPage} />
          </>
        );

      case 'lainnya':
        return (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex-grow order-2 sm:order-1">
                <Card className="min-w-full">
                  <CardBody className="flex items-center justify-center">
                    {loading ? (
                      <ImageSkeleton />
                    ) : (
                      <ItemTourCard
                        list={touristDestinationList.listData}
                        className="grid !grid-cols-1 md:!grid-cols-2"
                      />
                    )}
                    {touristDestinationList.listData.length === 0 && !loading && <EmptyState />}
                  </CardBody>
                </Card>
              </div>
              <div className="order-1 sm:order-2 flex justify-center">
                <FilterPrice submitFilter={onSubmitFilter} min={price.min} max={price.max} />
              </div>
            </div>
            <CustomPagination initial={1} totalPage={touristDestinationList.totalPage} />
          </>
        );
      default:
        return null;
    }
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
        <Tab key="wisata_alam" title="Wisata Alam">
          {RenderTab()}
        </Tab>
        <Tab key="wisata_budaya" title="Wisata Budaya">
          {RenderTab()}
        </Tab>
        <Tab key="wisata_kuliner" title="Wisata Kuliner">
          {RenderTab()}
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          {RenderTab()}
        </Tab>
      </Tabs>
    </div>
  );
}
