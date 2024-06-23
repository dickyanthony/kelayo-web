import { Image } from '@nextui-org/react';
import Whitelocation from '../../assets/white-location.png';
import WhiteSport from '../../assets/white-water-sport.png';
import WhiteCar from '../../assets/white-car.png';
import PrambananEvent from '../../assets/prambanan-info-event.png';

const DATA_EVENT = [
  {
    image: Whitelocation,
    title: 'Pilih Wisata',
    description:
      'Temukan destinasi wisata favorit Anda dan pilih dari berbagai pilihan menarik yang kami tawarkan. Jadikan liburan Anda tak terlupakan.',
    bgColor: '#F0BB1F',
  },
  {
    image: WhiteSport,
    title: 'Cek Ketersediaan',
    description:
      'Pastikan ketersediaan tiket dan fasilitas di destinasi pilihan Anda sebelum berangkat. Cek jadwal dan ketersediaan dengan mudah.',
    bgColor: '#F15A2B',
  },
  {
    image: WhiteCar,
    title: 'Pesan',
    description:
      'Pesan tiket Anda dengan mudah dan cepat. Nikmati kemudahan proses pemesanan untuk pengalaman liburan yang menyenangkan.',
    bgColor: '#006380',
  },
];

const ItemInfoEvent = ({ item }) => {
  return (
    <>
      <div className="flex items-center mb-10 max-w-[395px]">
        <div
          className="min-w-12 min-h-12 rounded-xl justify-center items-center flex flex-wrap"
          style={{ backgroundColor: item.bgColor }}
        >
          <Image isZoomed src={item.image} alt={item.title} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <div className="font-bold text-[#5E6282] ">{item.title}</div>
          <p className="text-[#5E6282]">{item.description}</p>
        </div>
      </div>
    </>
  );
};

export default function InfoEvent() {
  return (
    <div className="w-full justify-items-center items-center grid grid-cols-1 sm:grid-cols-2 mt-12 ">
      <div>
        <div className="text-primary-text font-bold mb-2">Cepat & Mudah</div>
        <div className="text-[#181E4B] font-bold text-4xl">Info Event</div>
        <div className="flex flex-col mt-11">
          {DATA_EVENT.map((item, index) => (
            <ItemInfoEvent key={index} item={item} />
          ))}
        </div>
      </div>
      <Image
        src={PrambananEvent}
        alt="prambanan-info-event"
        className="w-[330px] h-[319px] md:w-[380px] md:h-[369px]"
      />
    </div>
  );
}
