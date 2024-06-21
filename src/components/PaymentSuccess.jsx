import { useNavigate, useSearchParams } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import Checkmark from '../assets/checkmark.gif';
import { PrimaryButton, SecondaryButton } from './Button';
import { useEffect, useState } from 'react';

import { getTransactionAPI } from '../api/midtransAPI';
import { Spinner } from '@nextui-org/react';
import { insertOrderLodgingReservationAPI } from '../api/orderLodgingReservationAPI';
import { insertOrderTourGuideAPI } from '../api/orderTourGuideAPI';
import { insertOrderTransportationAPI } from '../api/orderTransportationAPI';

export default function PaymentSuccess({ detail }) {
  const navigate = useNavigate();
  const serverKey = import.meta.env.VITE_MIDTRANS_SERVER;
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('order_id');
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   axios
  //     .get(`https://api.midtrans.com/v2/${orderId}/status`, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: 'Basic U0ItTWlkLXNlcnZlci05bmFKZ0txdHRJLXVtVnpjdzF6NjhFNWk6',
  //       },
  //       withCredentials: false,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {});
  // }, []);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getTransactionAPI(orderId)
        .then((response) => handleInsertOrder(response))
        .catch((error) => {
          setLoading(false);
          openSnackBar('Terjadi masalah');
        });
    }
  }, [orderId]);

  const handleInsertOrder = (res) => {
    const customField2 = res.custom_field2.split(',');
    const params = {
      id: res.order_id,
      first_name: customField2[0],
      last_name: customField2[1],
      hp: customField2[2],
      trans: customField2[3],
      start: customField2[4],
      end: customField2[5],
      total_price: customField2[6],
      image: null,
      user_id: customField2[7],
      status: 1,
    };

    const apiMapping = {
      lodging_reservation: {
        idKey: 'lodging_reservation_id',
        api: insertOrderLodgingReservationAPI,
      },
      tour_guide: {
        idKey: 'tour_guide_id',
        api: insertOrderTourGuideAPI,
      },
      transportation: {
        idKey: 'transportation_id',
        api: insertOrderTransportationAPI,
      },
    };

    const { idKey, api } = apiMapping[res.custom_field1] || {};

    if (idKey && api) {
      params[idKey] = customField2[8];
      api(params)
        .then(() => {})
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  };

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
          {loading ? (
            <Spinner />
          ) : (
            <>
              <PrimaryButton className="py-2 px-4 rounded" onClick={() => navigate('/')}>
                Beranda
              </PrimaryButton>
              <SecondaryButton className="py-2 px-4 rounded" onClick={() => navigate('/dashboard')}>
                Dashboard
              </SecondaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
