import React from "react";
// import { Card, Image } from "@nextui-org/react";
import GambarLogin from "../assets/gambar-login.png";
import {
  ButtonWithLeftIcon,
  MedimumCheckbox,
  PrimaryButton,
  TextInput,
} from "../components";
import { CardFooter, CardHeader, Checkbox, Input } from "@nextui-org/react";
import { Card, Image } from "@nextui-org/react";
import GoogleIcon from "../assets/google.png";
export default function Login() {
  return (
    <div className="flex flex-row">
      <Card radius="lg" className="border-none max-[900px]:hidden">
        <Image
          alt="Kelayo"
          className="object-cover"
          height={646}
          src={GambarLogin}
          width={600}
        />
      </Card>
      <Card className="w-[579px] h-[646px] flex flex-col justify-center items-center min-[900px]:ml-24">
        <div className="w-4/6 flex flex-wrap justify-center flex-col md:flex-nowrap gap-4">
          <div className="text-2xl font-bold">Masuk</div>
          <Input type="email" label="Email" className="mb-4" />
          <Input type="password" label="Kata Sandi" />
          <MedimumCheckbox className="mb-12">Ingatkan saya</MedimumCheckbox>
          <PrimaryButton className="h-14 text-md">Login</PrimaryButton>
          <div className="text-center">atau masuk dengan</div>
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
