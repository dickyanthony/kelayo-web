import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import MenuWisata from "../assets/menu-wisata.png";
import MenuPenginapan from "../assets/menu-penginapan.png";
import MenuPenyewaanTransportasi from "../assets/menu-penyewaan-transportasi.png";
import MenuPemanduWisata from "../assets/menu-pemandu-wisata.png";
import MenuRekanWisata from "../assets/menu-rekan-wisata.png";
import { useNavigate } from "react-router-dom";
const list = [
  {
    title: "Destinasi Wisata",
    img: MenuWisata,
    description: "Jelajahi berbagai jenis destinasi wisata di Yogyakarta",
    to: "/tourist-destination",
  },
  {
    title: "Pemesanan Penginapan",
    img: MenuPenginapan,
    description:
      "Cari penginapan favorit dan ternyamanmu disini. Badan fit, liburan tenang",
    to: "/lodging-reservation",
  },
  {
    title: "Penyewaan Trasnportasi",
    img: MenuPenyewaanTransportasi,
    description:
      "Carilah transportasi pilihanmu untuk mengelilingi indah dan nyamannya Yogyakarta",
    to: "/",
  },
  {
    title: "Pemandu Wisata",
    img: MenuPemanduWisata,
    description:
      "Temukan pemandu wisatamu disini untuk kesan dan pengalaman perjalanan yang menyenangkan",
    to: "/",
  },
  {
    title: "Rekan Wisata",
    img: MenuRekanWisata,
    description:
      "Temukan rekan perjalananmu untuk menambah relasi dan kesan yang menyenangkan",
    to: "/",
  },
];
export default function CategoryMenu() {
  const navigate = useNavigate();

  return (
    <div className="w-5/5 grid grid-cols-1 min-[268px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center items-center mb-16 gap-4 relative z-30 mt-14">
      {list.map((item, index) => (
        <div
          key={index}
          className="w-full relative mb-10 lg:mb-0"
          onClick={() => navigate(item.to)}
        >
          <div className="absolute inset-0 flex justify-center -top-9">
            <Image
              isZoomed
              radius="lg"
              alt={item.title}
              className="object-cover w-[98px] h-[69px] min-[483px]:w-[128px] min-[483px]:h-[99px]"
              src={item.img}
            />
          </div>

          <Card
            className="min-w-[100px] max-w-[221px] min-h-[198px] max-h-[198px] sm:min-h-[268px] lg:min-h-[288px] lg:max-w-[195px] lg:min-w-[195px] xl:min-w-[221px]"
            shadow="sm"
            isPressable
            onPress={() => navigate(item.to)}
          >
            <CardBody className="overflow-visible p-0 !flex-grow-0  h-[40px] min-[481px]:h-[65px] items-center"></CardBody>
            <CardFooter className="text-small flex-col justify-between relative">
              <b className="font-semibold mb-2 text-sm sm:text-lg">
                {item.title}
              </b>
              <p className="text-[#181E4B] text-xs sm:text-base">
                {item.description}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
