import { Image } from '@nextui-org/react';
import RoundedKelayo from '../assets/rounded-kelayo-logo.png';
import BlueLocation from '../assets/blue-location.png';
import BluePhone from '../assets/blue-phone.png';
import BlueInstagram from '../assets/blue-instagram.svg';
import BlueFb from '../assets/blue-fb.svg';
export default function Footer() {
  return (
    <div className="w-full h-auto mt-14 py-4 px-4 flex flex-col items-center">
      <div className="w-full h-[1px] border-primary-text border-t-2 mb-7 opacity-40" />
      <div className="grid grid-cols-1 w-ful sm:grid-cols-2">
        <div className="pl-8">
          <Image
            width="60%"
            alt="footer-logo"
            //   className="w-full object-cover h-[140px]"
            src={RoundedKelayo}
          />
        </div>
        <div className="pr-8">
          <div className="flex flex-row gap-3 mt-8">
            <Image
              className="min-w-3 min-h-3"
              src={BlueLocation}
              alt="location"
              width={24}
              height={24}
            />
            <p className="text-default-800 text-xs">
              Jalan Kaliurang KM.5, Caturtunggal, Kecamatan Depok, Kabupaten Sleman
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-2">
            <Image className="min-w-3 min-h-3" src={BluePhone} alt="phone" width={24} height={24} />
            <p className="text-default-800 text-xs">081234567890</p>
          </div>
          <div className="flex flex-row gap-4 mt-4 items-center">
            <p className="text-default-600 text-xs ml-1">Social Media</p>
            <Image
              className="min-w-3 min-h-3"
              src={BlueInstagram}
              alt="phone"
              width={24}
              height={24}
            />
            <Image className="min-w-3 min-h-3" src={BlueFb} alt="phone" width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] border-primary-text border-t-2 mb-8 mt-4 opacity-10" />
      <div className="grid grid-cols max-w-screen-lg w-full sm:grid-cols-2">
        <div className="flex flex-row gap-4">
          <p className="text-default-800 text-sm">Tentang Kami</p>
          <p className="text-default-800 text-sm">Hubungi Kami</p>
          <p className="text-default-800 text-sm">Bantuan</p>
        </div>
        <div className="items-end text-right text-default-500 text-xs">
          Copyright © 2024 • Kelayo.
        </div>
      </div>
    </div>
  );
}
