import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Image } from '@nextui-org/react';
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
} from '../../components';
import Mesyah from '../../assets/mesyah-dwi-nastiya.png';
import { getDetailTourGuideAPI } from '../../api/tourGuide';

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
        <Image width={265} src={detail.image} alt={detail.name} />
        <div className="font-bold w-fit flex-grow mt-4 mb-4">{detail.name}</div>
      </div>
      <div className="px-8">
        <p className="text-xs">Umur: {detail.age}</p>
        <p className="text-xs">Status: {detail.status}</p>
        <p className="text-xs">Domisili: {detail.domisili}</p>
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
  const signal = useRef();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

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
  const onSubmit = async (data) => {
    console.log('data===>', data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <NavBar />
        <WrapHCenterXL>
          {!loading && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex flex-col gap-4 w-fit order-1 sm:order-none">
                <CardInfo detail={detail} />
                <Card className="p-4 items-center">
                  <CustomDateRangePicker className="mb-4" name="dateRange" control={control} />
                  <CustomSelect
                    label="Tipe"
                    className="mb-4"
                    name="type"
                    options={[
                      { label: 'Private', value: 'private' },
                      { label: 'Kelompok', value: 'kelompok' },
                    ]}
                    control={control}
                  />
                  <PrimaryButton className="max-w-[290px]" onPress={handleSubmit(onSubmit)}>
                    Sambungkan
                  </PrimaryButton>
                </Card>
              </div>
              <div className="flex flex-col gap-2 order-2 sm:order-none">
                <CardCompetition detail={detail} />
                <CardDescription detail={detail} />
                <CardReview detail={DUMMY_DETAIL} />
              </div>
            </div>
          )}
          <Footer />
        </WrapHCenterXL>
      </div>
    </form>
  );
};

export default TourGuideDetail;
