import { useEffect, useRef, useState } from 'react';
import { Card } from '@nextui-org/react';
import { getDashboardAPI, getDashboarSparkdAPI } from '../../../../api/dashboardAPI';
import PieChart from './PieChart';
import SparkLine from './SparkLine';
import Bag from '/images/gradient-green-bag.svg';
import Shop from '/images/gradient-yellow-shop.svg';
import Message from '/images/gradient-orange-message.svg';
import useSnackbar from '../../../../components/Snackbar';

export default () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { openSnackbarError } = useSnackbar();
  const [pieChartDetail, setPieChartDetail] = useState([]);
  const [sparklineDetail, setSparklineDetail] = useState([]);

  const [loading, setLoading] = useState(true);

  const signal = useRef();
  useEffect(() => {
    getDashboard();
  }, []);
  const getDashboard = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);
    const params = {};
    if (user.role !== 'admin') params.userId = user.id;
    getDashboardAPI(params, signal.current?.signal)
      .then((res) => {
        setPieChartDetail(res);
        getDashboardSpark();
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  const getDashboardSpark = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);
    const params = {};
    if (user.role !== 'admin') params.userId = user.id;
    getDashboarSparkdAPI(signal.current?.signal)
      .then((res) => {
        setSparklineDetail(res);
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const [sparkLineSuccess, setSparkLineSuccess] = useState({
    title: 'Berhasil',
    total: 0,
  });
  const [sparkLineWaitForConfirm, setSparkLineWaitForConfirm] = useState({
    title: 'Menunggu Konfirmasi',
    total: 0,
  });
  const [sparkLineTake, setSparkLineTake] = useState({
    title: 'Ambil di Tempat',
    total: 0,
  });

  return (
    <div className="max-w-screen-xl md:min-w-[1034px] p-4">
      <div className="font-semibold text-2xl">Hi, Selamat datang kembali 👋</div>
      {!loading && (
        <>
          {(user.role === 'admin' || user.role === 'penyedia_penginapan') && (
            <Card className="container p-4 mt-4" isBlurred>
              <div>Order Penginanpan</div>
              <PieChart
                detail={pieChartDetail.orderLodgingReservation}
                title="Transaksi Order Penginapan"
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <SparkLine
                  detail={sparkLineWaitForConfirm}
                  className="gradient-yellow-card"
                  titleClass="text-[#7A4100] font-bold"
                  totalClass="text-[#7A4100] font-bold"
                  imageSource={Shop}
                  imageAlt="shop"
                  to="#B76E00"
                  from="#FFAB00"
                  sparklineDetail={
                    sparklineDetail?.orderLodgingReservation
                      ? sparklineDetail?.orderLodgingReservation[1]
                      : []
                  }
                />
                <SparkLine
                  detail={sparkLineTake}
                  className="gradient-orange-card"
                  titleClass="text-[#7A0916] font-bold"
                  totalClass="text-[#7A0916] font-bold"
                  imageSource={Message}
                  imageAlt="message"
                  to="#B71D18"
                  from="#FFAC82"
                  sparklineDetail={
                    sparklineDetail?.orderLodgingReservation
                      ? sparklineDetail?.orderLodgingReservation[2]
                      : []
                  }
                />
                <SparkLine
                  detail={sparkLineSuccess}
                  className="gradient-green-card"
                  titleClass="text-[#004B50] font-bold"
                  totalClass="text-[#004B50] font-bold"
                  imageSource={Bag}
                  imageAlt="bag"
                  to="#007867"
                  from="#5BE49B"
                  sparklineDetail={
                    sparklineDetail?.orderLodgingReservation
                      ? sparklineDetail?.orderLodgingReservation[3]
                      : []
                  }
                />
              </div>
            </Card>
          )}

          {(user.role === 'admin' || user.role === 'pemandu_wisata') && (
            <Card className="container p-4 mt-4">
              <div>Order Pemandu Wisata</div>
              <PieChart
                detail={pieChartDetail.orderTourGuide}
                title="Transaksi Order Pemandu Wisata"
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <SparkLine
                  detail={sparkLineWaitForConfirm}
                  className="gradient-yellow-card"
                  titleClass="text-[#7A4100] font-bold"
                  totalClass="text-[#7A4100] font-bold"
                  imageSource={Shop}
                  imageAlt="shop"
                  to="#B76E00"
                  from="#FFAB00"
                  sparklineDetail={
                    sparklineDetail?.orderTourGuide ? sparklineDetail?.orderTourGuide[1] : []
                  }
                />
                <SparkLine
                  detail={sparkLineTake}
                  className="gradient-orange-card"
                  titleClass="text-[#7A0916] font-bold"
                  totalClass="text-[#7A0916] font-bold"
                  imageSource={Message}
                  imageAlt="message"
                  to="#B71D18"
                  from="#FFAC82"
                  sparklineDetail={
                    sparklineDetail?.orderTourGuide ? sparklineDetail?.orderTourGuide[2] : []
                  }
                />
                <SparkLine
                  detail={sparkLineSuccess}
                  className="gradient-green-card"
                  titleClass="text-[#004B50] font-bold"
                  totalClass="text-[#004B50] font-bold"
                  imageSource={Bag}
                  imageAlt="bag"
                  to="#007867"
                  from="#5BE49B"
                  sparklineDetail={
                    sparklineDetail?.orderTourGuide ? sparklineDetail?.orderTourGuide[3] : []
                  }
                />
              </div>
            </Card>
          )}
          {(user.role === 'admin' || user.role === 'penyedia_transportasi') && (
            <Card className="container p-4 mt-4">
              <div>Order Transportasi</div>
              <PieChart
                detail={pieChartDetail.orderTransportation}
                title="Transaksi Order Transportasi"
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <SparkLine
                  detail={sparkLineWaitForConfirm}
                  className="gradient-yellow-card"
                  titleClass="text-[#7A4100] font-bold"
                  totalClass="text-[#7A4100] font-bold"
                  imageSource={Shop}
                  imageAlt="shop"
                  to="#B76E00"
                  from="#FFAB00"
                  sparklineDetail={
                    sparklineDetail?.orderTransportation
                      ? sparklineDetail?.orderTransportation[1]
                      : []
                  }
                />
                <SparkLine
                  detail={sparkLineTake}
                  className="gradient-orange-card"
                  titleClass="text-[#7A0916] font-bold"
                  totalClass="text-[#7A0916] font-bold"
                  imageSource={Message}
                  imageAlt="message"
                  to="#B71D18"
                  from="#FFAC82"
                  sparklineDetail={
                    sparklineDetail?.orderTransportation
                      ? sparklineDetail?.orderTransportation[2]
                      : []
                  }
                />
                <SparkLine
                  detail={sparkLineSuccess}
                  className="gradient-green-card"
                  titleClass="text-[#004B50] font-bold"
                  totalClass="text-[#004B50] font-bold"
                  imageSource={Bag}
                  imageAlt="bag"
                  to="#007867"
                  from="#5BE49B"
                  sparklineDetail={
                    sparklineDetail?.orderTransportation
                      ? sparklineDetail?.orderTransportation[3]
                      : []
                  }
                />
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
