import { useEffect, useRef, useState } from 'react';
import {
  getAllLodgingReservationAPI,
  getListLodgingReservationByRoleAPI,
} from '../../../../api/lodgingReservation';
import { TableLodgingReservation } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default (props) => {
  const { user } = props;
  const { openSnackbarError } = useSnackbar();
  const [lodgingReservationList, setLodgingReservationList] = useState([]);

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
      user.role === 'admin' ? getAllLodgingReservationAPI : getListLodgingReservationByRoleAPI;
    api(params, signal.current?.signal)
      .then((res) => setLodgingReservationList(res))

      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return <TableLodgingReservation data={lodgingReservationList} loading={loading} />;
};
