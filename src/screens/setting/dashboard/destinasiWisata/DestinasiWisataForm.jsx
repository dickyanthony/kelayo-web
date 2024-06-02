import { useEffect, useState, useRef } from 'react';
import { Card, Image } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  CustomCheckbox,
  CustomSelect,
  PrimaryButton,
  TextArea,
  TextInput,
  UseSnackbar,
} from '../../../../components';
import DefaultMale from '../../../../assets/default-male.jpeg';

import { EditIcon } from '../../../../assets/EditIcon';
import '../../../../css/AvatarStyle.css';
import {
  getDetailTouristDestinationAPI,
  updateTouristDestinationAPI,
} from '../../../../api/touristDestination';

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
      location: '',
      type: '',
      image1: '',
      image2: '',
      image3: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const signal = useRef();

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);

    getDetailTouristDestinationAPI(id, signal.current?.signal)
      .then((res) => {
        let imageBlob1, imageBlob2, imageBlob3, imageBlob4;

        if (res.image1) {
          imageBlob1 = URL.createObjectURL(
            new Blob([new Uint8Array(res.image1.data)], { type: 'image/jpeg' })
          );
        }

        if (res.image2) {
          imageBlob2 = URL.createObjectURL(
            new Blob([new Uint8Array(res.image2.data)], { type: 'image/jpeg' })
          );
        }

        if (res.image3) {
          imageBlob3 = URL.createObjectURL(
            new Blob([new Uint8Array(res.image3.data)], { type: 'image/jpeg' })
          );
        }

        reset({
          ...res,
          image1: imageBlob1 ?? '',
          image2: imageBlob2 ?? '',
          image3: imageBlob3 ?? '',
        });

        setImage1(imageBlob1 ?? '');
        setImage2(imageBlob2 ?? '');
        setImage3(imageBlob3 ?? '');
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('description', data.description);
    formData.append('type', data.type);
    if (!isEdit) formData.append('userId', user.id);

    const previousImage1 = getValues('image1');
    if (image1 && image1 !== previousImage1) {
      formData.append('image1', image1);
    }

    const previousImage2 = getValues('image2');
    if (image2 && image2 !== previousImage2) {
      formData.append('image2', image2);
    }

    const previousImage3 = getValues('image3');
    if (image3 && image3 !== previousImage3) {
      formData.append('image3', image3);
    }

    updateTouristDestinationAPI(formData, signal.current?.signal)
      .then(() => {
        if (!isNew) getDetail();
        if (isNew) {
          reset({
            id: '',
            image: '',
            title: '',
            price: 0,
            description: '',
            location: '',
            type: '',
            image1: '',
            image2: '',
            image3: '',
          });
          setImage1('');
          setImage2('');
          setImage3('');
        }
        openSnackbarSuccess(isNew ? 'Destinasi Wisata ditambahkan' : 'Destinasi Wisata diperbarui');
      })
      .catch((err) => openSnackbarError(err));
  };

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 500 * 1024) {
        openSnackbarError('Batas ukuran gambar adalah 500 KB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (imageNumber) {
          case 1:
            setImage1(reader.result);
            break;
          case 2:
            setImage2(reader.result);
            break;
          case 3:
            setImage3(reader.result);
            break;

          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageUpload = ({
    src,
    defaultSrc,
    width,
    imageNumber,
    isEdit,
    isNew,
    handleImageChange,
    className = '',
  }) => (
    <div className="w-full flex justify-center items-center my-2 relative group">
      <Image
        isBlurred
        width={width}
        className={className}
        src={src !== '' ? src : defaultSrc}
        alt="destinasi-wisata"
      />
      {(isEdit || isNew) && (
        <div
          className={`absolute w-[${width}px] rounded-lg h-full flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10`}
        >
          <EditIcon className="text-white" />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleImageChange(e, imageNumber)}
          />
        </div>
      )}
    </div>
  );

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full mt-4 md:w-[579px] h-full flex flex-col items-center md:ml-4">
        <div className="text-2xl text-center font-bold mt-4 md:mb-0">
          {isEdit ? 'Edit ' : isNew ? 'Tambah' : 'Lihat '} {getValues('title')}
        </div>
        <div className="w-5/6 flex flex-wrap justify-center flex-col gap-4">
          <ImageUpload
            src={image1}
            defaultSrc={DefaultMale}
            width={240}
            imageNumber={1}
            isEdit={isEdit}
            isNew={isNew}
            handleImageChange={handleImageChange}
          />
          <div className="flex flex-row justify-between">
            {[image2, image3].map((image, index) => (
              <ImageUpload
                key={index}
                src={image}
                defaultSrc={DefaultMale}
                width={106}
                imageNumber={index + 2}
                isEdit={isEdit}
                isNew={isNew}
                handleImageChange={handleImageChange}
                className={'h-24 object-cover'}
              />
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Nama" name="title" control={control} isDisabled={!isEdit && !isNew} />
            <TextInput
              label="Lokasi"
              name="location"
              control={control}
              isDisabled={!isEdit && !isNew}
            />
            <TextInput
              type="number"
              label="Harga"
              name="price"
              control={control}
              isDisabled={!isEdit && !isNew}
            />

            <CustomSelect
              className="w-full"
              options={[
                { label: 'Wisata Alam', value: 'wisata_alam' },
                { label: 'Wisata Budaya', value: 'wisata_budaya' },
                { label: 'Wisata Kuliner', value: 'wisata_kuliner' },
              ]}
              control={control}
              label="Tipe"
              name="type"
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
