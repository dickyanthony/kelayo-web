import { useEffect, useState, useRef } from 'react';
import { Card, Image } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PrimaryButton, TextInput, UseSnackbar } from '../../../../../components';
import DefaultMale from '../../../../../assets/default-male.jpeg';

import { EditIcon } from '../../../../../assets/EditIcon';
import '../../../../../css/AvatarStyle.css';
import { getDetailTransportationAPI } from '../../../../../api/rentTransportation';
import { updateTransportationAPI } from '../../../../../api/transportationAPI';

export default (props) => {
  const { isEdit, isNew } = props;
  const { id, rentId } = useParams();
  console.log('use==>', useParams());
  const user = JSON.parse(localStorage.getItem('user'));

  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      id: '',
      image: '',
      name: '',
      price: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const signal = useRef();

  useEffect(() => {
    if (rentId) getDetail();
  }, [rentId]);

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);

    getDetailTransportationAPI(rentId, signal.current?.signal)
      .then((res) => {
        let imageBlob;
        if (res.image) {
          imageBlob = URL.createObjectURL(
            new Blob([new Uint8Array(res.image.data)], { type: 'image/jpeg' })
          );
        }
        reset({ ...res, image: imageBlob ?? '' });
        setImage(imageBlob ?? '');
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', rentId);
    formData.append('name', data.name);
    formData.append('price', data.price);

    if (!isEdit) formData.append('rentId', id);

    const previousImage = getValues('image');
    if (image && image !== previousImage) {
      formData.append('image', image);
    }

    updateTransportationAPI(formData, signal.current?.signal)
      .then(() => {
        if (!isNew) getDetail();
        if (isNew) {
          reset({
            id: '',
            image: '',
            name: '',
            price: 0,
          });
          setImage('');
        }
        openSnackbarSuccess(isNew ? 'Transportasi ditambahkan' : 'Transportasi diperbarui');
      })
      .catch((err) => console.log(err));
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
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full mt-4 md:w-[579px] h-full flex flex-col items-center md:ml-4">
        <div className="text-2xl text-center font-bold mt-4 md:mb-0">
          {isEdit ? 'Edit ' : isNew ? 'Tambah' : 'Lihat '} {getValues('title')}
        </div>
        <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
          <div className="w-full flex justify-center items-center my-2 relative group">
            <Image
              isBlurred
              width={240}
              src={image !== '' ? image : DefaultMale}
              alt="transportasi"
            />

            {(isEdit || isNew) && (
              <div className="absolute w-[240px] h-full flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
                <EditIcon className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Nama" name="name" control={control} isDisabled={!isEdit && !isNew} />
            <TextInput
              type="number"
              label="Harga"
              name="price"
              control={control}
              isDisabled={!isEdit && !isNew}
            />
          </div>

          {(isEdit || isNew) && (
            <PrimaryButton className="h-12 text-md w-full mt-4" onClick={handleSubmit(onSubmit)}>
              Simpan
            </PrimaryButton>
          )}
        </div>
      </Card>
    </form>
  );
};
