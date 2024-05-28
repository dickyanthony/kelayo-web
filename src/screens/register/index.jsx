import { Card, CardFooter, Image } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CustomSelect, PrimaryButton, TextInput, UseSnackbar } from '../../components';
import { registerAPI } from '../../api/users/';
import GambarLogin from '../../assets/gambar-login.png';
import { useRef } from 'react';
import { useAuth } from '../../hook/auth/Auth';

export default function Register() {
  const { handleSubmit, control } = useForm();
  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();
  const signal = useRef();

  const onSubmit = async (data) => {
    if (data.kataSandi !== data.konfirmasiKataSandi) {
      openSnackbarError('Password tidak sama');
      return;
    }
    const params = {
      nama: data.nama,
      username: data.username,
      email: data.email,
      password: data.kataSandi,
      gender: Number(data.gender),
      role: data.role,
    };

    registerAPI(params, signal.current?.signal)
      .then((res) => {
        navigate('/');
        login(res);
        openSnackbarSuccess('Registrasi Berhasil');
      })
      .catch((err) => {
        openSnackbarError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row w-full justify-center min-h-fit">
        <Card radius="lg" className="border-none max-[1100px]:hidden">
          <Image
            alt="Kelayo"
            className="object-cover w-full h-[646px] md:h-auto md:max-h-[646px]"
            src={GambarLogin}
          />
        </Card>
        <Card className="w-full md:w-[579px] md:h-[646px] h-full flex flex-col justify-center items-center md:ml-4">
          <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
            <div className="text-2xl font-bold mt-4 md:mb-0">Daftar</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Nama" name="nama" control={control} />
              <TextInput label="Username" name="username" control={control} />
              <TextInput type="email" label="Email" name="email" control={control} />
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
              <CustomSelect
                className="w-full"
                options={[
                  { label: 'Laki-laki', value: '1' },
                  { label: 'Perempuan', value: '2' },
                ]}
                control={control}
                label="Gender"
                name="gender"
              />
              <CustomSelect
                className="w-full"
                options={[
                  { label: 'Normal', value: 'normal' },
                  { label: 'Info Destinasi Wisata', value: 'destinasi_wisata' },
                  { label: 'Penyedia Penginapan', value: 'penyedia_penginapan' },
                  { label: 'Penyedia Transportasi', value: 'penyedia_transportasi' },
                  { label: 'Pemandu Wisata', value: 'pemandu_wisata' },
                ]}
                control={control}
                label="Role"
                name="role"
              />
            </div>
            <PrimaryButton className="h-14 text-md w-full mt-4" onClick={handleSubmit(onSubmit)}>
              Daftar
            </PrimaryButton>

            <CardFooter className="justify-center">
              <div>
                Sudah punya akun?{' '}
                <span className="underline text-secondary-text hover:cursor-pointer">
                  <Link to={'/login'}>Masuk</Link>
                </span>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </form>
  );
}
