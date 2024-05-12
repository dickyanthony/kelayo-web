import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomPagination from "./CustomPagination";

export default function TabTourist() {
  const [selected, setSelected] = React.useState("photos");
  <Tabs variant={"bordered"} aria-label="Tabs variants">
    <Tab key="lainnya" title="Lainnya" />
  </Tabs>;
  return (
    <div className="flex w-full flex-col mt-20">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="wisata-alam" title="Wisata Alam">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-budaya" title="Wisata Budaya">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="wisata-kuliner" title="Wisata Kuliner">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
          <CustomPagination />
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          <Card>
            <CardBody>
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
