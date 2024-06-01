import { useEffect, useRef, useState } from 'react';
import { getAllUserAPI } from '../../../../api/user/userAPI';
import { TableAccount } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default () => {
  const { openSnackbarError } = useSnackbar();
  const [accountList, setAccountList] = useState([]);

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

    getAllUserAPI(params, signal.current?.signal)
      .then((res) => setAccountList(res))

      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return <TableAccount data={accountList} loading={loading} />;
};
