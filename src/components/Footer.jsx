import { Image } from "@nextui-org/react";
import RoundedKelayo from "../assets/rounded-kelayo-logo.png";

export default function Footer() {
  return (
    <div className="w-full h-auto mt-14 py-4 px-4 flex flex-col items-center">
      <div className="w-4/5 h-[1px] border-primary-text border-t-2 mb-14 opacity-40"></div>
      <div className="grid grid-cols-2">
        <div>
          <Image
            width="50%"
            alt="footer-logo"
            //   className="w-full object-cover h-[140px]"
            src={RoundedKelayo}
          />
        </div>
        <div>
          <div className="flex flex-row">
            <div></div>
            <div>
              Jalan Kaliurang KM.5, Caturtunggal, Kecamatan Depok, Kabupaten
              Sleman
            </div>
          </div>
          <div className="flex flex-row">
            <div></div>
            <div>081234567890</div>
          </div>
        </div>
      </div>
    </div>
  );
}
