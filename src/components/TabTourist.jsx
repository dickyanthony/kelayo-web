import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import CustomPagination from './CustomPagination';
import Nature1 from '../assets/nature/nature-1.jpg';
import { FilterPrice, ItemTourCard } from '.';
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
  const [selected, setSelected] = React.useState('photos');

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
        <Tab key="wisata-alam" title="Wisata Alam">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-budaya" title="Wisata Budaya">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-kuliner" title="Wisata Kuliner">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemTourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="order-2 sm:order-1">
              <Card>
                <CardBody className="flex items-center justify-center">
                  <ItemTourCard list={list} className="grid !grid-cols-1 md:!grid-cols-2" />
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
