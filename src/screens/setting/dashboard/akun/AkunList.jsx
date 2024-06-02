import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUserAPI } from '../../../../api/user/userAPI';
import { PrimaryButton, TableAccount } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default () => {
  const { openSnackbarError } = useSnackbar();
  const navigate = useNavigate();
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
  return (
    <div>
      <div className="flex justify-end">
        <PrimaryButton className="mb-4" onClick={() => navigate('/setting/dashboard/add-account')}>
          Tambah
        </PrimaryButton>
      </div>
      <TableAccount data={accountList} loading={loading} onDelete={getList} />
    </div>
  );
};
