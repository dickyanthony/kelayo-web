import { useNavigate, useParams } from 'react-router-dom';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { getDetailLodgingReservationAPI } from '../../api/lodgingReservation';
import { createTransactionAPI } from '../../api/midtransAPI';
import { insertOrderLodgingReservationAPI } from '../../api/orderLodgingReservationAPI';
import {
  BookingPrice,
  Footer,
  ItemLodgingReservation,
  NavBar,
  SkeletonLodgingReservation,
  TextInput,
  WrapHCenterXL,
} from '../../components';
import useSnackbar from '../../components/Snackbar';
import { formatDateToYYYYMMDD } from '../../utils/dateConverter';

const LodgingReservationDetail = () => {
  const { id } = useParams();
  const { openSnackbarError } = useSnackbar();
  const { handleSubmit, control } = useForm();
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const signal = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const transactionStatus = queryParams.get('transaction_status');
  //   const orderId = queryParams.get('order_id');

  //   if (transactionStatus === 'settlement' && orderId) {
  //     handlePaymentSuccess(orderId);
  //   }
  // }, [location.search]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    getDetailLodgingReservationAPI(id, signal.current?.signal)
      .then((res) => {
        const modifiedRes = {
          ...res,
        };
        if (res.image) modifiedRes.image = createBlobURL(res.image.data);

        setDetail(modifiedRes);
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data, total, start, end) => {
    if (
      data.firstName === undefined ||
      data.lastName === undefined ||
      data.email === undefined ||
      data.confirmEmail === undefined ||
      data.noHp === undefined
    ) {
      openSnackbarError('Isi data diri!');
      return;
    }
    if (data.email !== data.confirmEmail) {
      openSnackbarError('Periksa email!');
      return;
    }
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    const params = {
      id: uuid(),
      product: detail.title,
      total: total,

      lodging_reservation_id: id,
      first_name: data.firstName,
      last_name: data.lastName,
      hp: data.noHp,
      trans: new Date().toISOString().split('T')[0],
      start: start,
      end: end,
      total_price: total,
      image: null,
      user_id: user.id,
      status: 1,
      type: 'lodging_reservation',
    };

    createTransactionAPI(params, signal.current?.signal)
      .then((response) => {
        window.snap.pay(response);
      })
      .catch((err) => openSnackbarError(err));
  };

  const handleSubmitWithTotal = (total, start, end) => {
    if ((start === null) | (end === null)) openSnackbarError('Pilih tanggal reservasi!');
    const startDate = formatDateToYYYYMMDD(new Date(start.year, start.month - 1, start.day));
    const endDate = formatDateToYYYYMMDD(new Date(end.year, end.month - 1, end.day));

    handleSubmit((data) => onSubmit(data, total, startDate, endDate))();
  };
  return (
    <form onSubmit={handleSubmitWithTotal}>
      <div className="w-full ">
        <NavBar />
        <WrapHCenterXL>
          <div className="w-full">
            <div className="flex flex-col w-full gap-4 justify-between items-center my-4 sm:flex-row sm:items-start">
              {!loading ? (
                <ItemLodgingReservation key={detail?.id} item={detail} isPressable={false} />
              ) : (
                <SkeletonLodgingReservation />
              )}
              <BookingPrice detail={detail} onOrder={handleSubmitWithTotal} />
            </div>

            <Accordion selectionMode="multiple" variant="shadow" className="mt-4">
              <AccordionItem key="0" aria-label="Data Diri" title="Data Diri">
                <div className="grid mb-4 sm:grid-cols-2 gap-4">
                  <TextInput name="firstName" label="Nama Depan" control={control} />
                  <TextInput name="lastName" label="Nama Belakang" control={control} />
                  <TextInput type="email" name="email" label="Email" control={control} />
                  <TextInput
                    type="email"
                    name="confirmEmail"
                    label="Konfirmasi Email"
                    control={control}
                  />
                  <TextInput name="noHp" label="No Hp" control={control} />
                </div>
              </AccordionItem>
              {/* <AccordionItem key="1" aria-label="Pembayaran" title="Bukti Pembayaran">
                <div className="grid mb-4 sm:grid-cols-2 gap-4">
                  <TextInput name="cardName" label="Nama Kartu" control={control} />
                  <TextInput name="cardNo" label="No Kartu" control={control} />
                  <TextInput name="mm" label="MM/YY" control={control} />
                  <TextInput name="cvc" label="CVC" control={control} />
                </div>
              </AccordionItem> */}
            </Accordion>
          </div>
          <Footer />
        </WrapHCenterXL>
      </div>
    </form>
  );
};

export default LodgingReservationDetail;
