{
}

import React, { useRef } from 'react';
import { Card } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TextInput, UseSnackbar, PrimaryButton } from '../../../../components';
import { updatePasswordAPI } from '../../../../api/user/userAPI';

export default () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { handleSubmit, control, reset } = useForm();

  const signal = useRef();
  const userId = id ?? user.id;

  const onSubmit = (data) => {
    if (data.kataSandiBaru !== data.konfirmasiKataSandi) {
      openSnackbarError('Password baru tidak sama');
      return;
    }
    const params = {
      id: userId,
      password: data.kataSandi,
      newPassword: data.kataSandiBaru,
    };

    updatePasswordAPI(params, signal.current?.signal)
      .then(() => {
        reset({ kataSandi: '', kataSandiBaru: '', konfirmasiKataSandi: '' });
        openSnackbarSuccess('Kata sandi berhasil diubah');
      })
      .catch((err) => openSnackbarError(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Card className="w-full h-auto md:w-[579px] flex flex-col items-center md:ml-4">
        <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
          <div className="text-2xl text-center font-bold mt-4 md:mb-0">Ganti Password</div>

          <div className="grid gap-4 sm:grid-cols-2">
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
              label="Kata Sandi Baru"
              name="kataSandiBaru"
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
          </div>
          <PrimaryButton className="h-10 text-md w-full my-4" onClick={handleSubmit(onSubmit)}>
            Simpan
          </PrimaryButton>
        </div>
      </Card>
    </form>
  );
};
