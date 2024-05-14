import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CustomPagination from "./CustomPagination";
import { TourCard } from ".";
const list = [
  {
    title: "Pantai Kesirat",
    img: "/images/fruit-1.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Pantai Parangtritis",
    img: "/images/fruit-2.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Pantai Parangkusumo",
    img: "/images/fruit-3.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Gunung Api Purba Nglanggeran",
    img: "/images/fruit-4.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Tebing dan Pantai Siung",
    img: "/images/fruit-5.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Goa Cerme",
    img: "/images/fruit-6.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Bukit Kalitalang",
    img: "/images/fruit-7.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
  {
    title: "Ledoksambi",
    img: "/images/fruit-8.jpeg",
    description:
      "Kematerin ini dikenal pula dengan sebutan “ jeron beteng “. karena wilayahnya mencakup area di dalam benteng",
    location: "Yogyakarta",
    range: "20 Km",
  },
];
export default function TabTourist(props) {
  const { setSelectedTab } = props;
  const [selected, setSelected] = React.useState("photos");

  return (
    <div className="flex w-full flex-col mt-20">
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
              <TourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-budaya" title="Wisata Budaya">
          <Card>
            <CardBody className="flex items-center justify-center">
              <TourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-kuliner" title="Wisata Kuliner">
          <Card>
            <CardBody className="flex items-center justify-center">
              <TourCard list={list} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          <Card>
            <CardBody className="flex items-center justify-center">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
      </Tabs>
    </div>
  );
}
