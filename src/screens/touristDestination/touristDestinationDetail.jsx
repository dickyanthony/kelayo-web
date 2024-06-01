import React, { useEffect, useRef, useState } from 'react';
import { Image, Card } from '@nextui-org/react';
import Slider from 'react-slick';
import { CardReview, Map, NavBar, UseSnackbar, WrapHCenterXL } from '../../components';
import Nature1 from '../../assets/nature/nature-1.jpg';
import Nature2 from '../../assets/nature/nature-2.jpg';
import Nature3 from '../../assets/nature/nature-3.jpg';
import Mesyah from '../../assets/mesyah-dwi-nastiya.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { useParams } from 'react-router-dom';
import { getDetailTouristDestinationAPI } from '../../api/touristDestination';
import { formatNumberWithSeparator } from '../../utils/numberConverter';
const ImageSlider = ({ detail }) => {
  const images = [detail.image1, detail.image2, detail.image3];

  const settings = {
    customPaging: function (i) {
      return (
        <a className="custom-thumbnail">
          <Image src={images[i]} alt={`thumbnail-${i}`} className="custom-thumbnail-image" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb custom-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className="image-slider slider-container mb-16 lg:min-w-[340px] max-h-[200px]"
      style={{ width: '100%' }}
    >
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={item}
              alt={`item-${index}`}
              className="w-4/5 object-cover lg:min-w-[340px] max-h-[200px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const TouristDestinationDetail = () => {
  const { id } = useParams();
  const { openSnackbarError } = UseSnackbar();
  const [detail, setDetail] = useState({
    title: 'Pantai Kesirat',
    location: 'Kabupaten Gunung Kidul',
    price: 7000,
    parentImage: Nature1,
    childImage: [Nature2, Nature3],

    description:
      'Untuk kamu yang hendak menikmati matahari terbenam sembari mendengarkan deburan ombak, Pantai Kesirat sangat wajib untuk kamu kunjungi.  Lokasinya yang berada di dataran tinggi dan berada di atas tebing, serta langsung menghadap Samudera Hindia dan juga menghadap ke barat, menambah sensasi suguhan alam yang sangat menenangkan dan juga indah.Selain untuk sekadar menikmati matahari terbenam, Pantai Kesirat juga cocok bagi pengunjung yang menginginkan melakukan camping. Tetapi sayangnya, jika pengunjung menghendaki camping, kita harus membawa segala perlengkapannya sendiri karena tidak terdapat penyewaan di kawasan tersebut.',
    review: [
      {
        id: 1,
        image: Mesyah,
        name: 'Muhammad Alif',
        date: '28 Oktober 2023',
        description: 'Bagus',
      },
      {
        id: 2,
        image: Mesyah,
        name: 'Muhammad Alif',
        date: '28 Oktober 2023',
        description: 'Bersih',
      },
    ],
  });

  const signal = useRef();
  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    getDetailTouristDestinationAPI(id, signal.current?.signal)
      .then((res) => {
        const modifiedDetail = {
          ...res,
          image1: res.image1 ? createBlobURL(res.image1.data) : null,
          image2: res.image2 ? createBlobURL(res.image2.data) : null,
          image3: res.image3 ? createBlobURL(res.image3.data) : null,
          image4: res.image4 ? createBlobURL(res.image4.data) : null,
        };
        setDetail(modifiedDetail);
      })
      .catch((err) => openSnackbarError(err));
  };
  return (
    <div className="w-full ">
      <NavBar className="z-50" />
      <WrapHCenterXL>
        <Card className="p-8 mt-4 max-w-screen-lg">
          <div className="grid grid-cols-1 min-[727px]:grid-cols-2 gap-4 max-w-screen-lg">
            <ImageSlider detail={detail} />
            <div>
              <div className="font-bold text-2xl">{detail.title}</div>
              <div className="w-full h-2 border-b-1 border-black/75" />
              <div className="text-xl mb-2">{detail.location}</div>
              <div>HTM: Rp{formatNumberWithSeparator(detail.price)}/Orang</div>
              <div className="mt-4 max-w-screen-lg text-sm">{detail.description}</div>
            </div>
          </div>
          <div className="w-full h-2 border-b-1 border-black my-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 mb-4 gap-4 justify-items-center min-h-[350px]">
            <Map />
            <div className="flex flex-row gap-2 items-center">
              <Image src={markerIcon} />
              <div className="text-sm">
                Karang, Girikarto, Panggang, Gunung Kidul Regency, Special Region of Yogyakarta
                55872
              </div>
            </div>
          </div>
        </Card>
        <div className="max-w-screen-lg min-w-full">{/* <CardReview detail={detail} /> */}</div>
      </WrapHCenterXL>
    </div>
  );
};

export default TouristDestinationDetail;
