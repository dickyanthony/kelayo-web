import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CustomPagination from "./CustomPagination";
import { ItemRentTransportation } from ".";
import Fortuner from "../assets/fortuner.png";
import Beat from "../assets/beat.png";
const DATA_CAR = [
  {
    id: 1,
    name: "Rentcar jogja",
    image: Fortuner,
  },
  {
    id: 2,
    name: "Yogya Rental Mobil",
    image: Fortuner,
  },
  {
    id: 3,
    name: "jogja Transport",
    image: Fortuner,
  },
  {
    id: 4,
    name: "Jhony Fonsen",
    image: Fortuner,
  },
];
const DATA_MOTOR = [
  {
    id: 1,
    name: "Mandiri Motor",
    image: Beat,
  },
  {
    id: 2,
    name: "WS Rental",
    image: Beat,
  },
  {
    id: 3,
    name: "Perdana rent",
    image: Beat,
  },
];
export default function TabRentTransportation(props) {
  const { setSelectedTab } = props;
  const [selected, setSelected] = React.useState("photos");

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
        <Tab key="car-rental" title="Rentar Mobil">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemRentTransportation list={DATA_CAR} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="motor-rental" title="Rental Motor">
          <Card>
            <CardBody className="flex items-center justify-center">
              <ItemRentTransportation list={DATA_MOTOR} />
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
      </Tabs>
    </div>
  );
}
