import {
  BookingPrice,
  CustomPagination,
  Footer,
  ItemLodgingReservation,
  NavBar,
  WrapHCenterXL,
} from "../../components";
import AnjumaBackpacker from "../../assets/lodgingReservation/anjuma-backpacker.png";
import JogjaUnitPogung from "../../assets/lodgingReservation/jogja-unit-pogung.png";
import UmahBuDee from "../../assets/lodgingReservation/umah-bu-dee.png";
import { useState } from "react";
const DATA = [
  {
    id: 1,
    image: JogjaUnitPogung,
    title: "Jogja Unit Pogung",
    description:
      "Selamat datang diunit pogung ,dibangun dengan sentuhan arsitektur modern yang menyatu dengan kehangatan budaya lokal. unit pogung menyajikan kesempurnaan akomodasi untuk wisatawan yang ingin merasakan kenyamanan dan keindahan.",
    price: 150000,
    isFreeWifi: true,
    isFreeWaterElectric: true,
    isPrivateBathroom: true,
  },
  {
    id: 2,
    image: AnjumaBackpacker,
    title: "Anjuma Backpacker",
    description:
      "Ajuma Backpacker menawarkan pengalaman menginap yang ekonomis namun tetap nyaman dan menyenangkan bagi para wisatawan.Dengan suasana yang hangat dan ramah ,fasilitas sederhana namun lengkap disediakan untuk memenuhi kebutuhan dasar anda.",
    price: 200000,
    isFreeWifi: true,
    isFreeWaterElectric: false,
    isPrivateBathroom: true,
  },
  {
    id: 3,
    image: UmahBuDee,
    title: "Umah Bu dee",
    description:
      "Selamat datang di Umah Bu Dee, sebuah tempat menginap yang penuh pesona di Jogja yang akan membuat Anda merasa seperti di rumah sendiri. Terletak di lingkungan yang tenang dan damai, Umah Bu Dee menawarkan kombinasi yang sempurna antara kenyamanan modern dan kehangatan tradisional Jogja.",
    price: 120000,
    isFreeWifi: false,
    isFreeWaterElectric: true,
    isPrivateBathroom: true,
  },
];

export default function LodgingReservation() {
  const [bookingDetail, setBookingDetail] = useState();
  console;
  return (
    <div className="w-full ">
      <NavBar />
      <WrapHCenterXL>
        <div className="flex flex-col w-full gap-4 items-center mt-4 sm:flex-row sm:items-start">
          <div className="flex flex-col gap-3 order-2 sm:order-1">
            {DATA.map((item) => (
              <ItemLodgingReservation
                key={item.id}
                item={item}
                onPress={setBookingDetail}
              />
            ))}
            <CustomPagination />
          </div>
          <div className="order-1 sm:order-2">
            <BookingPrice detail={bookingDetail} />
          </div>
        </div>
        <Footer />
      </WrapHCenterXL>
    </div>
  );
}
