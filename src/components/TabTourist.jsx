import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import useSnackbar from './Snackbar';
import CustomPagination from './CustomPagination';
import Nature1 from '../assets/nature/nature-1.jpg';
import { FilterPrice, ItemTourCard } from '.';
import { getListTouristDestinationAPI } from '../api/touristDestination';
const list = [
  {
    id: 1,
    title: 'Pantai Kesirat',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 2,
    title: 'Pantai Parangtritis',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 3,
    title: 'Pantai Parangkusumo',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 4,
    title: 'Gunung Api Purba Nglanggeran',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 5,
    title: 'Tebing dan Pantai Siung',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 6,
    title: 'Goa Cerme',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 7,
    title: 'Bukit Kalitalang',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
  {
    id: 8,
    title: 'Ledoksambi',
    img: Nature1,
    description:
      'Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng',
    location: 'Yogyakarta',
    range: '20 Km',
  },
];
export default function TabTourist(props) {
  const { setSelectedTab } = props;
  const { openSnackbarError } = useSnackbar();
  const [selected, setSelected] = React.useState('wisata-alam');
  const [touristDestinationList, setTouristDestinationList] = useState([]);
  const signal = useRef();
  useEffect(() => {
    getList();
  }, [selected]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getList = () => {
    const params = { type: selected };
    getListTouristDestinationAPI(params, signal.current?.signal)
      .then((res) => {
        const modifiedListData = res.listData.map((item) => {
          const newItem = { ...item };

          if (item.image1) {
            newItem.image1 = createBlobURL(item.image1.data);
          }

          return newItem;
        });
        setTouristDestinationList(modifiedListData);
      })
      .catch((err) => openSnackbarError(err));
  };

  const onSubmitFilter = (data) => {
    console.log('Data===>', data);
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
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={touristDestinationList} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata_budaya" title="Wisata Budaya">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={touristDestinationList} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata_kuliner" title="Wisata Kuliner">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={touristDestinationList} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-grow order-2 sm:order-1">
              <Card className="min-w-full">
                <CardBody className="flex items-center justify-center">
                  <ItemTourCard
                    list={touristDestinationList}
                    className="grid !grid-cols-1 md:!grid-cols-2"
                  />
                </CardBody>
              </Card>
            </div>
            <div className="order-1 sm:order-2 flex justify-center">
              <FilterPrice submitFilter={onSubmitFilter} />
            </div>
          </div>
          <CustomPagination />
        </Tab>
      </Tabs>
    </div>
  );
}
