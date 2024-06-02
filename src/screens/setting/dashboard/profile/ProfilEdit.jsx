import React, { useEffect, useRef, useState } from 'react';
import { Card, Avatar } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { registerAPI } from '../../../../api/auth';
import { TextInput, UseSnackbar, PrimaryButton } from '../../../../components';
import { getDetailUserAPI, updateUserProfileAPI } from '../../../../api/user/userAPI';
import { EditIcon } from '../../../../assets/EditIcon';

export default () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      id: '',
      image: '',
      name: '',
      username: '',
      email: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const signal = useRef();
  const userId = id ?? user.id;

  useEffect(() => {
    if (userId) getDetail();
  }, [userId]);

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);

    getDetailUserAPI(userId, signal.current?.signal)
      .then((res) => {
        const blob = new Blob([new Uint8Array(res.avatar.data)], { type: 'image/jpeg' });
        const imageBlob = URL.createObjectURL(blob);
        reset({ ...res, image: imageBlob });
        setImage(imageBlob);
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('nama', data.name);
    formData.append('username', data.username);
    formData.append('email', data.email);

    const previousImage = getValues('image');
    if (image && image !== previousImage) {
      formData.append('image', image);
    }

    updateUserProfileAPI(formData, signal.current?.signal)
      .then(() => {
        getDetail();
        openSnackbarSuccess('Profil berhasil diperbarui');
      })
      .catch((err) => openSnackbarError(err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 500 * 1024) {
        openSnackbarError('Batas ukuran gambar adalah 500 KB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // setValue('image', reader.result);
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full md:w-[579px] md:h-[528px] h-full flex flex-col items-center md:ml-4">
        <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
          <div className="text-2xl text-center font-bold mt-4 md:mb-0">Edit Profil</div>
          <div className="w-full flex justify-center items-center my-2 relative">
            <Avatar isBordered color="primary" src={image} className="w-32 h-32 text-larger" />
            <div className="w-32 h-32 rounded-full absolute m-auto flex justify-center text-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <EditIcon className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="absolute m-auto opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Nama" name="name" control={control} />
            <TextInput label="Username" name="username" control={control} isDisabled />
            <TextInput type="email" label="Email" name="email" control={control} isDisabled />
          </div>
          <PrimaryButton className="h-14 text-md w-full mt-4" onClick={handleSubmit(onSubmit)}>
            Simpan
          </PrimaryButton>
        </div>
      </Card>
    </form>
  );
};
