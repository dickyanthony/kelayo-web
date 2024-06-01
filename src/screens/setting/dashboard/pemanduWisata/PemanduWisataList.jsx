import { useEffect, useRef, useState } from 'react';
import { getAllTourGuideAPI, getListTourGuideByRoleAPI } from '../../../../api/tourGuide';
import { TableTourGuide } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default (props) => {
  const { user } = props;
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
    if (user.role !== 'admin') params.id = user.id;
    const api = user.role === 'admin' ? getAllTourGuideAPI : getListTourGuideByRoleAPI;
    api(params, signal.current?.signal)
      .then((res) => setTourGuideList(res))
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return <TableTourGuide data={tourGuideList} loading={loading} />;
};
