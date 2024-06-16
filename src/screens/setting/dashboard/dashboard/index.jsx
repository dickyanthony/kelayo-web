import { Card } from '@nextui-org/react';
import { useState } from 'react';
import PieChart from './PieChart';
import SparkLine from './SparkLine';

export default () => {
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
      <PieChart />
      <div className="grid grid-cols-3 gap-3 mt-4">
        <SparkLine detail={sparkLineSuccess} />
        <SparkLine detail={sparkLineWaitForConfirm} />
        <SparkLine detail={sparkLineTake} />
      </div>
    </div>
  );
};
