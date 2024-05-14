import { useState } from "react";
import {
  CustomCarousel,
  Footer,
  NavBar,
  TabTourist,
  WrapHCenter,
} from "../../components";

import Nature1 from "../../assets/nature/nature-1.jpg";
import Nature2 from "../../assets/nature/nature-2.jpg";
import Nature3 from "../../assets/nature/nature-3.jpg";

export default function TouristDestination() {
  const [selectedTabComponent, setSelectedTabComponent] =
    useState("wisata-alam");

  const RenderCarousel = () => {
    let carouselList = { image: [], title: "" };
    switch (selectedTabComponent) {
      case "wisata-alam":
        carouselList = { image: [Nature1, Nature2, Nature3], title: "NATURE" };
        break;
      case "wisata-budaya":
        carouselList = { image: [], title: "CULTURE & HISTORY" };
        break;
      case "wisata-kuliner":
        carouselList = { image: [], title: "FOOD & CULINARY" };
        break;
      case "lainnya":
        carouselList = { image: [], title: "NATURE" };
        break;
      default:
        carouselList = { image: [], title: "KELAYO" };
        break;
    }

    return (
      <CustomCarousel
        title={carouselList.title}
        listImage={carouselList.image}
      />
    );
  };
  return (
    <div className="w-full ">
      <NavBar className="absolute" style={{ width: "100vw" }} />

      <div
        className="max-w-lg hidden sm:block"
        style={{ maxHeight: "calc(100vh - 20%)" }}
      >
        <RenderCarousel />
      </div>
      <WrapHCenter className="p-6 !w-auto">
        <div className="flex flex-col w-full justify-center items-center">
          <TabTourist setSelectedTab={(e) => setSelectedTabComponent(e)} />

          <Footer />
        </div>
      </WrapHCenter>
    </div>
  );
}
