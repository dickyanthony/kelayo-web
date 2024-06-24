import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllOrderTransportationAPI,
  getAllOrderTransportationByUserIdAPI,
} from '../../../../api/orderTransportationAPI';
import { PrimaryButton, TableOrderTransportasi } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const { openSnackbarError } = useSnackbar();
  const [tourGuideList, setTourGuideList] = useState([]);

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
    if (user.role === 'normal') params.userId = user.id;
    if (user.role === 'penyedia_transportasi') params.transportationUserId = user.id;
    const api =
      user.role !== 'normal' ? getAllOrderTransportationAPI : getAllOrderTransportationByUserIdAPI;
    api(params, signal.current?.signal)
      .then((res) => setTourGuideList(res))
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return (
    <TableOrderTransportasi user={user} data={tourGuideList} loading={loading} getList={getList} />
  );
};
