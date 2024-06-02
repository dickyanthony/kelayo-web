import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllTouristDestinationAPI,
  getListTouristDestinationByRoleAPI,
} from '../../../../api/touristDestination';
import { PrimaryButton, TableTouristDestination } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default (props) => {
  const { user } = props;
  const { openSnackbarError } = useSnackbar();
  const navigate = useNavigate();
  const [touristDestinationList, setTouristDestinationList] = useState([]);

  const [loading, setLoading] = useState(false);

  const signal = useRef();
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);
    const params = {};
    if (user.role !== 'admin') params.id = user.id;
    const api =
      user.role === 'admin' ? getAllTouristDestinationAPI : getListTouristDestinationByRoleAPI;
    api(params, signal.current?.signal)
      .then((res) => setTouristDestinationList(res))

      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="flex justify-end">
        <PrimaryButton
          className="mb-4"
          onClick={() => navigate('/setting/dashboard/add-tourist-destination')}
        >
          Tambah
        </PrimaryButton>
      </div>
      <TableTouristDestination data={touristDestinationList} loading={loading} onDelete={getList} />
    </div>
  );
};
