import React, { useRef, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Spinner,
} from '@nextui-org/react';
import { EyeIcon } from '../../assets/EyeIcon';
import { EditIcon } from '../../assets/EditIcon';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { Avatar, UseSnackbar } from '..';

import { useNavigate } from 'react-router-dom';
import { deleteUserAPI } from '../../api/user/userAPI';
const columns = [
  { name: 'NAMA', uid: 'name' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'GENDER', uid: 'gender' },
  { name: 'PERAN', uid: 'role' },
  { name: 'AKSI', uid: 'actions' },
];

export default (props) => {
  const { data = [], loading = false, onDelete } = props;
  const navigate = useNavigate();
  const { openSnackbarSuccess, openSnackbarError } = UseSnackbar();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const signal = useRef();
  const rowsPerPage = 4;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const deleteUser = (id) => {
    setIsLoading(true);
    deleteUserAPI({ id }, signal.current?.signal)
      .then(() => {
        openSnackbarSuccess('Pengguna berhasil dihapus');
        onDelete();
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setIsLoading(false));
  };

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];

    const Role = () => {
      switch (tour.role) {
        case 'admin':
          return 'Admin';

        case 'penyedia_penginapan':
          return 'Penyedia Penginapan';

        case 'penyedia_transportasi':
          return 'Penyedia Transportasi';

        case 'destinasi_wisata':
          return 'Destinasi Wisata';

        case 'pemandu_wisata':
          return 'Pemandu Wisata';

        case 'normal':
          return 'Normal';

        default:
          return '';
      }
    };

    switch (columnKey) {
      case 'name':
        return <Avatar user={tour} name={cellValue} />;
      case 'email':
        return <p className="text-bold text-sm capitalize">{tour.email}</p>;
      case 'gender':
        return (
          <p className="text-bold text-sm capitalize">
            {tour.gender === 1 ? 'Laki-Laki' : 'Perempuan'}
          </p>
        );
      case 'role':
        return <p className="text-bold text-sm capitalize">{Role()}</p>;
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/detail-account/${tour.id}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/edit-account/${tour.id}`)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteUser(tour.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      className="max-w-screen-xl md:min-w-[1034px]"
      aria-label="Example table with custom cells"
      selectionMode="single"
      showSelectionCheckboxes={false}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        loadingContent={<Spinner />}
        loadingState={loading || isLoading ? 'loading' : 'idle'}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
