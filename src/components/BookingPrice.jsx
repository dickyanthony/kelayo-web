import { useState } from 'react';
import { Card, CardHeader, CardFooter, Divider } from '@nextui-org/react';
import { CustomDateRangePicker } from '../components';
import { formatNumberWithSeparator } from '../utils/numberConverter';
import { getLocalTimeZone, today } from '@internationalized/date';
import { PrimaryButton } from './Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function BookingPrice(props) {
  const { detail, hideButton = false, onOrder = () => {} } = props;
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [dateDifference, setDateDifference] = useState(0);
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

  return (
    <Card className="max-w-[400px] h-auto lg:min-w-[385px]">
      <CardHeader className="flex flex-col gap-3">
        <div className="w-full flex flex-col sm:flex-row items-center gap-3">
          <p className="text-sm sm:text-xl flex-grow font-semibold">
            Rp {formatNumberWithSeparator(detail?.price)}
          </p>
          <div className="w-full sm:w-auto flex-shrink-0">
            <CustomDateRangePicker
              fullWidth
              label="Tanggal Penempatan"
              minValue={today(getLocalTimeZone())}
              onChange={setDateRange}
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between">
          <div>
            <div className="font-semibold text-sm sm:text-xl">Total</div>
            <p className="text-xs">Termasuk Pajak Dan Biaya</p>
          </div>
          <div className="text-sm sm:text-xl font-semibold flex items-center">
            Rp{' '}
            {!dateRange.start || !dateRange.end
              ? formatNumberWithSeparator(detail?.price ?? 0)
              : formatNumberWithSeparator((detail?.price ?? 0) * dateDifference)}
          </div>
        </div>
      </CardHeader>
      <Divider />
      {!hideButton && (
        <CardFooter className="flex justify-center">
          <PrimaryButton onPress={onOrder}>Pesan</PrimaryButton>
        </CardFooter>
      )}
    </Card>
  );
}
