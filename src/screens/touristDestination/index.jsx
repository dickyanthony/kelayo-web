import { useState } from 'react';
import { CustomCarousel, Footer, NavBar, TabTourist, WrapHCenter } from '../../components';

export default function TouristDestination() {
  const [selectedTabComponent, setSelectedTabComponent] = useState('wisata-alam');

  const RenderCarousel = () => {
    let carouselList = { image: [], title: '' };
    switch (selectedTabComponent) {
      case 'wisata-alam':
        carouselList = { image: [], title: 'NATURE' };
      case 'wisata-budaya':
        carouselList = { image: [], title: 'CULTURE & HISTORY' };
      case 'wisata-kuliner':
        carouselList = { image: [], title: 'FOOD & CULINARY' };
      case 'lainnya':
        carouselList = { image: [], title: 'NATURE' };
      default:
        carouselList = { image: [], title: 'KELAYO' };
    }
    return <CustomCarousel title={carouselList.title} image={carouselList.image} />;
  };
  return (
    <div className="w-full ">
      <NavBar className="absolute" />
      <RenderCarousel />
      <WrapHCenter className="p-6">
        <div className="flex flex-col w-4/5 justify-center items-center">
          <TabTourist setSelectedTab={(e) => console.log('e===>', e)} />
          <Footer />
        </div>
      </WrapHCenter>
    </div>
  );
}
