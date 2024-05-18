import { useParams } from "react-router-dom";

import {
  BookingPrice,
  Footer,
  ItemRentTransportation,
  NavBar,
  PrimaryButton,
  TextInput,
  WrapHCenterXL,
} from "../../components";
import JogjaUnitPogung from "../../assets/lodgingReservation/jogja-unit-pogung.png";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Fortuner from "../../assets/fortuner.png";
const item = {
  id: 1,
  name: "Rentcar jogja",
  image: Fortuner,
  price: 150000,
};

const RentTransportationForm = () => {
  const { id } = useParams();
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full ">
        <NavBar />
        <WrapHCenterXL>
          <div className="w-full">
            <div className="flex flex-col w-full gap-4 items-center my-4 sm:flex-row sm:items-start">
              <ItemRentTransportation
                className="max-h-[201px]"
                imageClass="h-[160px]"
                key={item.id}
                item={item}
                isPressable={false}
                showPrice
              />

              <BookingPrice detail={item} />
            </div>
            <Accordion
              selectionMode="multiple"
              variant="shadow"
              className="mt-4"
            >
              <AccordionItem key="0" aria-label="Data Diri" title="Data Diri">
                <div className="grid mb-4 sm:grid-cols-2 gap-4">
                  <TextInput
                    name="firstName"
                    label="Nama Depan"
                    control={control}
                  />
                  <TextInput
                    name="lastName"
                    label="Nama Belakang"
                    control={control}
                  />
                  <TextInput
                    type="email"
                    name="email"
                    label="Email"
                    control={control}
                  />
                  <TextInput
                    type="email"
                    name="confirmEmail"
                    label="Konfirmasi Email"
                    control={control}
                  />
                  <TextInput name="noHp" label="No Hp" control={control} />
                </div>
              </AccordionItem>
              <AccordionItem key="1" aria-label="Pembayaran" title="Pembayaran">
                <div className="grid mb-4 sm:grid-cols-2 gap-4">
                  <TextInput
                    name="cardName"
                    label="Nama Kartu"
                    control={control}
                  />
                  <TextInput name="cardNo" label="No Kartu" control={control} />
                  <TextInput name="mm" label="MM/YY" control={control} />
                  <TextInput name="cvc" label="CVC" control={control} />
                </div>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end mt-4">
              <PrimaryButton className="w-full sm:w-auto">Bayar</PrimaryButton>
            </div>
          </div>
          <Footer />
        </WrapHCenterXL>
      </div>
    </form>
  );
};

export default RentTransportationForm;
