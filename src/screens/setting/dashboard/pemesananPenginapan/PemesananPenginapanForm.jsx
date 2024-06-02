import { useEffect, useState, useRef } from 'react';
import { Card, Image } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  CustomCheckbox,
  PrimaryButton,
  TextArea,
  TextInput,
  UseSnackbar,
} from '../../../../components';
import DefaultMale from '../../../../assets/default-male.jpeg';

import { EditIcon } from '../../../../assets/EditIcon';
import '../../../../css/AvatarStyle.css';
import {
  getDetailLodgingReservationAPI,
  updateLodgingReservationAPI,
} from '../../../../api/lodgingReservation';

export default (props) => {
  const { isEdit, isNew } = props;
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      id: '',
      image: '',
      title: '',
      price: 0,
      description: '',
      isFreeWifi: 0,
      isFreeWaterElectric: 0,
      isPrivateBathroom: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const signal = useRef();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);

    getDetailLodgingReservationAPI(id, signal.current?.signal)
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
    const isFreeWifiInt =
      typeof data.isFreeWifi !== 'number' ? (data.isFreeWifi === true ? 1 : 0) : data.isFreeWifi;

    const isFreeWaterElectricInt =
      typeof data.isFreeWaterElectric !== 'number'
        ? data.isFreeWaterElectric === true
          ? 1
          : 0
        : data.isFreeWaterElectric;
    const isPrivateBathroomInt =
      typeof data.isPrivateBathroom !== 'number'
        ? data.isPrivateBathroom === true
          ? 1
          : 0
        : data.isPrivateBathroom;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('isFreeWaterElectric', isFreeWaterElectricInt);
    formData.append('isPrivateBathroom', isPrivateBathroomInt);
    formData.append('isFreeWifi', isFreeWifiInt);
    formData.append('description', data.description);
    if (!isEdit) formData.append('userId', user.id);

    const previousImage = getValues('image');
    if (image && image !== previousImage) {
      formData.append('image', image);
    }

    updateLodgingReservationAPI(formData, signal.current?.signal)
      .then(() => {
        if (!isNew) getDetail();
        if (isNew) {
          reset({
            id: '',
            image: '',
            title: '',
            price: 0,
            description: '',
            isFreeWifi: false,
            isFreeWaterElectric: false,
            isPrivateBathroom: false,
          });
          setImage('');
        }
        openSnackbarSuccess(
          isNew ? 'Penginapan berhasil ditambahkan' : 'Penginapan berhasil diperbarui'
        );
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
              alt="pemesanan-penginapan"
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
            <TextInput label="Nama" name="title" control={control} isDisabled={!isEdit && !isNew} />
            <TextInput
              type="number"
              label="Harga"
              name="price"
              control={control}
              isDisabled={!isEdit && !isNew}
            />

            <CustomCheckbox
              name="isFreeWifi"
              label="Gratis Wifi"
              control={control}
              isDisabled={!isEdit && !isNew}
            />
            <CustomCheckbox
              name="isFreeWaterElectric"
              label="Gratis Air & Listrik"
              control={control}
              isDisabled={!isEdit && !isNew}
            />
            <CustomCheckbox
              name="isPrivateBathroom"
              label="Kamar Mandi Pribadi"
              control={control}
              isDisabled={!isEdit && !isNew}
            />
          </div>
          <TextArea
            label="Deskripsi"
            name="description"
            control={control}
            isDisabled={!isEdit && !isNew}
          />

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
