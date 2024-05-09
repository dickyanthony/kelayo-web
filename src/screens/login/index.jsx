import GambarLogin from "../../assets/gambar-login.png";
import {
  ButtonWithLeftIcon,
  MedimumCheckbox,
  PrimaryButton,
  TextInput,
  UseSnackbar,
} from "../../components";
import { Card, CardFooter, Image } from "@nextui-org/react";
import GoogleIcon from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/auth/Auth";

const TEMP_USER = "nusantarabyte@support.com";
const TEMP_PW = "nusantarabyte";
export default function Login() {
  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  console.log(useAuth());
  const onSubmit = async (data) => {
    console.log("data===>", data);
    try {
      if (data.email === TEMP_USER && data.kataSandi === TEMP_PW) {
        await login(data.email, data.password);
        navigate("/");
        openSnackbarSuccess("Berhasil Login");
      } else {
        throw new Error("Email atau password tidak sesuai");
      }
    } catch (error) {
      openSnackbarError("Email atau password tidak sesuai");
      console.error("Authentication failed:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <TextInput
              type="email"
              label="Email"
              name="email"
              control={control}
            />
            <TextInput
              type="password"
              label="Kata Sandi"
              name="kataSandi"
              control={control}
            />
            <MedimumCheckbox className="mb-4 md:mb-12">
              Ingatkan saya
            </MedimumCheckbox>
            <PrimaryButton
              isLoading={false}
              onClick={handleSubmit(onSubmit)}
              className="h-14 text-md w-full"
            >
              Login
            </PrimaryButton>
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
            <CardFooter className="justify-center">
              <div>
                Belum punya akun?{" "}
                <span className="underline text-secondary-text hover:cursor-pointer">
                  <Link to={"/register"}>Daftar</Link>
                </span>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </form>
  );
}