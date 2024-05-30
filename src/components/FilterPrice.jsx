import { Card, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import { PrimaryButton, SecondaryButton } from './Button';
import TextInput from './TextInput';
import CustomDatePicker from './CustomDatePicker';
import { useForm } from 'react-hook-form';
import CustomSelect from './CustomSelect';
import CustomSlider from './CustomSlider';

const FilterPrice = (props) => {
  const { submitFilter, className, min, max } = props;
  const { handleSubmit, control, reset, getValues } = useForm();

  const onSubmit = async (data) => {
    submitFilter(data);
  };

  const handleReset = () => {
    reset({
      jenisWisata: '',
      wisata: '',
      tanggal: null,
      filterHarga: [min, max],
    });
    onSubmit(getValues());
  };

  return (
    <Card
      className={`max-w-[400px] h-auto min-w-full sm:min-w-[250px] md:min-w-[250px] lg:min-w-[385px] ${className}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-col w-full items-center gap-3">
            <p className="text-[#181E4B] font-bold text-center text-sm sm:text-xl flex-grow">
              Rencanakan Perjalananmu
            </p>
            <CustomSelect
              className="max-w-xs"
              options={[
                { label: 'Wisata Alam', value: 'wisata_alam' },
                { label: 'Wisata Budaya', value: 'wisata_budaya' },
                { label: 'Wisata Kuliner', value: 'wisata_kuliner' },
              ]}
              control={control}
              label="Jenis Wisata"
              name="jenisWisata"
            />
            <TextInput
              className="max-w-xs"
              type="text"
              label="Cari Wisata"
              name="wisata"
              control={control}
            />
            <CustomDatePicker
              className="max-w-xs"
              label="Tanggal"
              name="tanggal"
              control={control}
            />
            <CustomSlider
              name="filterHarga"
              label="Filter Harga"
              step={50}
              min={min}
              max={max}
              formatOptions={{ style: 'currency', currency: 'IDR' }}
              className="max-w-xs"
              control={control}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-center gap-2">
          <PrimaryButton type="submit" onClick={handleSubmit(onSubmit)}>
            Cari
          </PrimaryButton>
          <SecondaryButton type="button" onClick={handleReset}>
            Reset
          </SecondaryButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FilterPrice;
