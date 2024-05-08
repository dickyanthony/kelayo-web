import React from "react";
import GambarLogin from "../assets/gambar-login.png";
import {
  ButtonWithLeftIcon,
  MedimumCheckbox,
  PrimaryButton,
  TextInput,
} from "../components";
import { Card, CardFooter, Image } from "@nextui-org/react";
import GoogleIcon from "../assets/google.png";

export default function Login() {
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
          <div className="text-2xl font-bold mt-4 md:mb-0">Masuk</div>
          <TextInput type="email" label="Email" className="mb-4" />
          <TextInput type="password" label="Kata Sandi" />
          <MedimumCheckbox className="mb-4 md:mb-12">
            Ingatkan saya
          </MedimumCheckbox>
          <PrimaryButton className="h-14 text-md w-full">Login</PrimaryButton>
          <div className="text-center overflow-hidden text-ellipsis">
            atau masuk dengan
          </div>
          <ButtonWithLeftIcon
            className="border-black w-full h-14 text-md"
            icon={
              <Image
                alt="google"
                className="object-cover"
                height={25}
                src={GoogleIcon}
                width={25}
              />
            }
          >
            Masuk Dengan Google
          </ButtonWithLeftIcon>
          <CardFooter>
            <div>
              Belum punya akun?{" "}
              <span className="underline text-secondary-text hover:cursor-pointer">
                Daftar
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
