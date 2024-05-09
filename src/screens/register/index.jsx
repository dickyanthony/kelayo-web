import GambarLogin from "../../assets/gambar-login.png";
import {
  ButtonWithLeftIcon,
  MedimumCheckbox,
  PrimaryButton,
  TextInput,
} from "../../components";
import { Card, CardFooter, Image } from "@nextui-org/react";
import GoogleIcon from "../../assets/google.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const { control } = useForm();
  return (
    <div className="flex flex-row w-full justify-center">
      <Card radius="lg" className="border-none max-[1100px]:hidden">
        <Image
          alt="Kelayo"
          className="object-cover w-full h-[646px] md:h-auto md:max-h-[646px]"
          src={GambarLogin}
        />
      </Card>
      <Card className="w-full md:w-[579px] md:h-[646px] h-full flex flex-col justify-center items-center md:ml-4">
        <div className="w-4/6 flex flex-wrap justify-center flex-col gap-4">
          <div className="text-2xl font-bold mt-4 md:mb-0">Daftar</div>

          <TextInput label="Nama" name="nama" control={control} />
          <TextInput label="Username" name="username" control={control} />
          <TextInput
            type="email"
            label="Email"
            name="email"
            control={control}
          />
          <TextInput
            passwordInput
            type="password"
            label="Kata Sandi"
            name="kataSandi"
            control={control}
          />
          <TextInput
            passwordInput
            type="password"
            label="Konfirmasi Kata Sandi"
            name="konfirmasiKataSandi"
            control={control}
          />

          <PrimaryButton className="h-14 text-md w-full mt-4">
            Daftar
          </PrimaryButton>

          <CardFooter className="justify-center">
            <div>
              Sudah punya akun?{" "}
              <span className="underline text-secondary-text hover:cursor-pointer">
                <Link to={"/login"}>Masuk</Link>
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
