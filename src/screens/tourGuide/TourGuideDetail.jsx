import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AccordionItem, Card, Image, Accordion } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import CheckIcon from '../../assets/check-icon.png';
import {
  CustomDateRangePicker,
  CustomSelect,
  Footer,
  NavBar,
  PrimaryButton,
  WrapHCenterXL,
  CardReview,
  UseSnackbar,
  BookingPrice,
  TextInput,
} from '../../components';
import Mesyah from '../../assets/mesyah-dwi-nastiya.png';
import { getDetailTourGuideAPI } from '../../api/tourGuide';
import { formatNumberWithSeparator } from '../../utils/numberConverter';
import DefaultMale from '../../assets/default-male.jpeg';
import { createTransactionAPI } from '../../api/midtransAPI';
import { formatDateToYYYYMMDD } from '../../utils/dateConverter';
import { v4 as uuid } from 'uuid';
const DUMMY_DETAIL = {
  name: 'MEYSYAH DWI NASTIYA',
  age: 20,
  status: 'Mahasiswa',
  domisili: 'Caturtunggal, Kecamatan Depok, Kabupaten Sleman',
  description:
    'Meysyah merupakan salah seorang mahasiswa antropoogi budaya yang telah tinggal di Yogyakarta selama tiga tahun dan telah terjun pada kepemanduan wisata sejak pertengahan 2023 di salah satu agen wisata bersepeda di pusat Kota Yogyakarta. Meysya cukup berpengalaman dan cukup kompeten dalam melakukan pendampingan wisata dalam jelajah daerah legendaris di yogaykarta. Dia beberapa kali menhadi asisten pemandu wisata pada agen perjalanan wisata tersebut.',
  competition: ['Wisata Sejarah', 'Wisata Kuliner'],
  image: Mesyah,
  review: [
    {
      id: 1,
      image: Mesyah,
      name: 'Muhammad Alif',
      date: '28 Oktober 2023',
      description:
        'Pemandu sangat ramah dan informatif terhadap destinasi-destinasi yang disinggahi. Bahkan pemandu juga menjelaskan terkait jalan dan apapaun yang kita lewati',
    },
    {
      id: 2,
      image: Mesyah,
      name: 'Muhammad Alif',
      date: '28 Oktober 2023',
      description:
        'Pemandu sangat ramah dan informatif terhadap destinasi-destinasi yang disinggahi. Bahkan pemandu juga menjelaskan terkait jalan dan apapaun yang kita lewati',
    },
    {
      id: 3,
      image: Mesyah,
      name: 'Muhammad Alif',
      date: '28 Oktober 2023',
      description:
        'Pemandu sangat ramah dan informatif terhadap destinasi-destinasi yang disinggahi. Bahkan pemandu juga menjelaskan terkait jalan dan apapaun yang kita lewati',
    },
  ],
};

const CardInfo = ({ detail }) => {
  return (
    <Card className="p-4 w-fit sm:min-w-[265px] md:min-w-[305px] lg:min-w-[345px]">
      <div className="flex flex-col justify-center items-center text-center">
        <Image width={265} src={detail.image ?? DefaultMale} alt={detail.name} />
        <div className="font-bold w-fit flex-grow mt-4 mb-4">{detail.name}</div>
      </div>
      <div className="px-8">
        <p className="text-xs">Umur: {detail.age}</p>
        <p className="text-xs">Status: {detail.status}</p>
        <p className="text-xs">Alamat: {detail.domisili}</p>
        <p className="text-xs">Harga: Rp {formatNumberWithSeparator(detail.price)}</p>
      </div>
    </Card>
  );
};

const CardCompetition = ({ detail }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-row items-center gap-3">
        <div className="font-semibold">Kompetensi:</div>
        {detail.competition.length === 0 && '-'}
        {(detail?.competition || []).map((item, index) => {
          return (
            <div key={index} className="flex items-center">
              <Image width={18} src={CheckIcon} alt="check" />
              <div className="text-xs font-light">{item}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const CardDescription = ({ detail }) => {
  return (
    <Card className="p-6 mt-4">
      <div className="font-semibold">Kenali Pemandu Wisatamu</div>
      <div className="w-full h-[2px] border-primary-text/50 border-t-1 my-2"></div>
      <p className="text-xs text-black/80">{detail?.description ?? ''}</p>
    </Card>
  );
};

const TourGuideDetail = () => {
  const { id } = useParams();
  const { openSnackbarError } = UseSnackbar();
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [dateDifference, setDateDifference] = useState(0);
  const signal = useRef();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  useEffect(() => {
    const calculateDateDifference = () => {
      if (!dateRange.start || !dateRange.end) return 0;
      const start = new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day);
      const end = new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    setDateDifference(calculateDateDifference());
  }, [dateRange]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getDetail = () => {
    setLoading(true);
    getDetailTourGuideAPI(id, signal.current?.signal)
      .then((res) => {
        const modifiedRes = {
          ...res,
          competition: JSON.parse(res.competition),
        };
        if (res.image) modifiedRes.image = createBlobURL(res.image.data);

        setDetail(modifiedRes);
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  // const test = ['a', 'b'];
  // console.log(JSON.PAR(test));
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
      product: detail.name,
      total: total,

      tour_guide_id: id,
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
      type: 'tour_guide',
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
      <div className="w-full">
        <NavBar />
        <WrapHCenterXL>
          {!loading && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex flex-col gap-4 w-fit order-1 sm:order-none">
                <CardInfo detail={detail} />
                <BookingPrice detail={detail} onOrder={handleSubmitWithTotal} />
              </div>
              <div className="flex flex-col gap-2 order-2 sm:order-none">
                <CardCompetition detail={detail} />
                <CardDescription detail={detail} />
                <CardReview detail={DUMMY_DETAIL} />
              </div>
            </div>
          )}
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
          <Footer />
        </WrapHCenterXL>
      </div>
    </form>
  );
};

export default TourGuideDetail;
