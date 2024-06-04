import { useEffect, useState, useRef } from 'react';
import { Card, Image } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CustomCheckbox,
  PrimaryButton,
  TextArea,
  TextInput,
  UseSnackbar,
  CustomSelect,
  TableTransportation,
} from '../../../../components';
import DefaultMale from '../../../../assets/default-male.jpeg';

import { EditIcon } from '../../../../assets/EditIcon';
import '../../../../css/AvatarStyle.css';
import {
  getDetailRentTransportationAPI2,
  updateRentTransportationAPI,
} from '../../../../api/rentTransportation';
import { getTransportationAPI } from '../../../../api/transportationAPI';

export default (props) => {
  const { isEdit, isNew } = props;
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      id: '',
      image: '',
      name: '',
      type: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const signal = useRef();
  const ctrl = useRef();
  const [transportationList, setTransportationList] = useState([]);

  useEffect(() => {
    if (id) {
      getDetail();
      getList();
    }
  }, [id]);

  const getList = () => {
    if (ctrl.current) ctrl.current.abort();
    ctrl.current = new AbortController();

    setLoading(true);
    const params = { id: id };

    getTransportationAPI(params, ctrl.current?.signal)
      .then((res) => setTransportationList(res))

      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };

  const getDetail = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);

    getDetailRentTransportationAPI2(id, signal.current?.signal)
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
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.name);
    formData.append('type', data.type);
    if (!isEdit) formData.append('userId', user.id);

    const previousImage = getValues('image');
    if (image && image !== previousImage) {
      formData.append('image', image);
    }

    updateRentTransportationAPI(formData, signal.current?.signal)
      .then(() => {
        if (!isNew) getDetail();
        if (isNew) {
          reset({
            id: '',
            image: '',
            title: '',
            price: 0,
            type: '',
          });
          setImage('');
        }
        openSnackbarSuccess(
          isNew ? 'Penyewaan Transportasi ditambahkan' : 'Penyewaan Transportasi diperbarui'
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
    <div className="flex flex-col justify-center items-center">
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
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <TextInput
                label="Nama"
                name="name"
                control={control}
                isDisabled={!isEdit && !isNew}
              />
              <CustomSelect
                className="w-full"
                options={[
                  { label: 'Mobil', value: 1 },
                  { label: 'Motor', value: 2 },
                ]}
                control={control}
                label="Jenis Transportasi"
                name="type"
                required
                isDisabled={!isEdit && !isNew}
              />
            </div>

            {(isEdit || isNew) && (
              <PrimaryButton
                className="h-12 text-md w-full mt-4 mb-4"
                onClick={handleSubmit(onSubmit)}
              >
                Simpan
              </PrimaryButton>
            )}
          </div>
        </Card>
      </form>
      {id && (
        <div className="mt-8">
          {isEdit && (
            <div className="flex justify-end">
              <PrimaryButton
                className="mb-4"
                onClick={() =>
                  navigate(`/setting/dashboard/rent-transportation/${id}/add-transportation/`)
                }
              >
                Tambah
              </PrimaryButton>
            </div>
          )}

          <TableTransportation
            data={transportationList}
            loading={loading}
            onDelete={getList}
            hideEdit={!isEdit}
            hideDelete={!isEdit}
          />
        </div>
      )}
    </div>
  );
};
