import { Card, CardFooter, Image } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CustomSelect, PrimaryButton, TextInput, UseSnackbar } from '../../../../components';
import { registerAPI } from '../../../../api/auth/';
import GambarLogin from '../../../../assets/gambar-login.png';
import { useRef } from 'react';
import { useAuth } from '../../../../hook/auth/Auth';

export default () => {
  const { handleSubmit, control, reset } = useForm();
  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();

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
        reset({ name: '', username: '', email: '', password: '', gender: '', role: '' });
        openSnackbarSuccess('Buat Akun Berhasil');
      })
      .catch((err) => {
        openSnackbarError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row w-full justify-center min-h-fit">
        <Card className="w-full md:w-[579px] md:h-[646px] h-full flex flex-col justify-center items-center md:ml-4">
          <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
            <div className="text-2xl font-bold mt-4 md:mb-0">Buat Akun</div>
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
                required
              />
              <TextInput
                passwordInput
                type="password"
                label="Konfirmasi Kata Sandi"
                name="konfirmasiKataSandi"
                control={control}
                required
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
                required
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
                required
              />
            </div>
            <PrimaryButton className="h-14 text-md w-full mt-4" onClick={handleSubmit(onSubmit)}>
              Buat Akun
            </PrimaryButton>
          </div>
        </Card>
      </div>
    </form>
  );
};
