import { useParams } from 'react-router-dom';

import {
  BookingPrice,
  Footer,
  ItemRentTransportation,
  NavBar,
  PrimaryButton,
  TextInput,
  WrapHCenterXL,
} from '../../components';
import JogjaUnitPogung from '../../assets/lodgingReservation/jogja-unit-pogung.png';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import Fortuner from '../../assets/fortuner.png';
import { useEffect, useRef, useState } from 'react';
import { getDetailTransportationAPI } from '../../api/rentTransportation';
import useSnackbar from '../../components/Snackbar';
import { createTransactionAPI } from '../../api/midtransAPI';
import { formatDateToYYYYMMDD } from '../../utils/dateConverter';
import { v4 as uuid } from 'uuid';
const item = {
  id: 1,
  name: 'Rentcar jogja',
  image: Fortuner,
  price: 150000,
};

const RentTransportationForm = () => {
  const { id } = useParams();
  const { openSnackbarError } = useSnackbar();
  const { handleSubmit, control } = useForm();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const signal = useRef();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    getDetailTransportationAPI(id, signal.current?.signal)
      .then((res) => {
        const blob = new Blob([new Uint8Array(res.image?.data)], { type: 'image/jpeg' });
        const imageBlob = URL.createObjectURL(blob);
        setDetail({ ...res, image: imageBlob ?? '' });
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

      transportation_id: id,
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
      type: 'transportation',
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
            <div className="flex flex-col w-full gap-4 items-center my-4 sm:flex-row sm:items-start">
              {!loading && (
                <ItemRentTransportation
                  className="max-h-[201px]"
                  imageClass="h-[160px]"
                  item={detail}
                  isPressable={false}
                  showPrice
                />
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
              {/* <AccordionItem key="1" aria-label="Pembayaran" title="Pembayaran">
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

export default RentTransportationForm;
