import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import X from '../assets/x.gif';
import { PrimaryButton, SecondaryButton } from './Button';

export default function PaymentFailed({ detail }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <div className="flex justify-center">
          <Image src={X} width={40} height={40} />
        </div>
        <h2 className="text-2xl font-semibold mt-4">Pembayaran Gagal</h2>
        <p className="mt-2">
          Maaf, pembayaran Anda tidak berhasil. <br />
          Silakan coba lagi atau hubungi dukungan pelanggan untuk bantuan lebih lanjut.
        </p>

        <div className="mt-6 space-x-4">
          <PrimaryButton className="py-2 px-4 rounded" onClick={() => navigate('/')}>
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
