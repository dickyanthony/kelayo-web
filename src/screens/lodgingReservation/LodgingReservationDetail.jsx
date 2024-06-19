import { useParams } from 'react-router-dom';

import {
  BookingPrice,
  Footer,
  ItemLodgingReservation,
  SkeletonLodgingReservation,
  NavBar,
  PrimaryButton,
  TextInput,
  WrapHCenterXL,
} from '../../components';
import JogjaUnitPogung from '../../assets/lodgingReservation/jogja-unit-pogung.png';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { getDetailLodgingReservationAPI } from '../../api/lodgingReservation';
import { useEffect, useRef, useState } from 'react';
import useSnackbar from '../../components/Snackbar';
import { createTransactionAPI } from '../../api/midtransAPI';
import { v4 as uuid } from 'uuid';

const LodgingReservationDetail = () => {
  const { id } = useParams();
  const { openSnackbarError } = useSnackbar();
  const { handleSubmit, control } = useForm();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const signal = useRef();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

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

  const onSubmit = async (data, total) => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    console.log('Data===>', data);
    const params = {
      id: uuid(),
      // id: detail.id,
      product: detail.title,
      total: total,
    };

    createTransactionAPI(params, signal.current?.signal)
      .then((response) => window.snap.pay(response))
      .catch((err) => openSnackbarError(err));
  };

  const handleSubmitWithTotal = (total) => {
    handleSubmit((data) => onSubmit(data, total))();
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
              <AccordionItem key="1" aria-label="Pembayaran" title="Bukti Pembayaran">
                <div className="grid mb-4 sm:grid-cols-2 gap-4">
                  <TextInput name="cardName" label="Nama Kartu" control={control} />
                  <TextInput name="cardNo" label="No Kartu" control={control} />
                  <TextInput name="mm" label="MM/YY" control={control} />
                  <TextInput name="cvc" label="CVC" control={control} />
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <Footer />
        </WrapHCenterXL>
      </div>
    </form>
  );
};

export default LodgingReservationDetail;
