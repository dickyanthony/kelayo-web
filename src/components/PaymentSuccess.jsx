import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import Checkmark from '../assets/checkmark.gif';
import { PrimaryButton, SecondaryButton } from './Button';

export default function PaymentSuccess({ detail }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <div className="flex justify-center">
          <Image src={Checkmark} width={40} height={40} />
        </div>
        <h2 className="text-2xl font-semibold mt-4">Pembayaran Berhasil</h2>
        <p className="mt-2">
          Terima kasih! Pembayaran Anda telah berhasil. <br />
          silahkan cek dashboard untuk melihat pesanan kamu.
        </p>
        <div className="mt-6 space-x-4">
          <PrimaryButton className="py-2 px-4 rounded" onClick={() => navigate('/home')}>
            Beranda
          </PrimaryButton>
          <SecondaryButton className="py-2 px-4 rounded" onClick={() => navigate('/dashboard')}>
            Dashboard
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
