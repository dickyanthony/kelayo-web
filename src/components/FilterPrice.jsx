import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Slider,
} from "@nextui-org/react";
import { PrimaryButton } from "./Button";
import CustomDateRangePicker from "./CustomDateRangePicker";
import TextInput from "./TextInput";
import CustomDatePicker from "./CustomDatePicker";
import { useForm } from "react-hook-form";
import CustomSelect from "./CustomSelect";

const FilterPrice = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    //   try {
    //     if (data.email === TEMP_USER && data.kataSandi === TEMP_PW) {
    //       await login(data.email, data.password);
    //       navigate("/");
    //       openSnackbarSuccess("Berhasil Login");
    //     } else {
    //       throw new Error("Email atau password tidak sesuai");
    //     }
    //   } catch (error) {
    //     openSnackbarError("Email atau password tidak sesuai");
    //   }
  };
  return (
    <Card className="max-w-[400px] h-auto lg:min-w-[385px]">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex flex-col w-full items-center gap-3">
          <p className="text-[#181E4B] font-bold text-center text-sm sm:text-xl flex-grow">
            Rencanakan Perjalananmu
          </p>
          <CustomSelect
            className="max-w-xs"
            options={[
              { label: "Wisata Alam", value: "wisata_alam" },
              { label: "Wisata Budaya", value: "wisata_budaya" },
              { label: "Wisata Kuliner", value: "wisata_kuliner" },
            ]}
            control={control}
          />
          <TextInput
            className="max-w-xs"
            type="text"
            label="Konfirmasi Kata Sandi"
            name="konfirmasiKataSandi"
            control={control}
          />
          <CustomDatePicker className="max-w-xs" label="Tanggal" />

          <Slider
            label="Price Range"
            step={50}
            minValue={0}
            maxValue={1000}
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "IDR" }}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <Divider />

      <CardFooter className="flex justify-center">
        <PrimaryButton>Cari</PrimaryButton>
      </CardFooter>
    </Card>
  );
};

export default FilterPrice;
