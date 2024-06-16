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
import { Avatar } from '..';

import React, { useState, useRef } from 'react';
import useSnackbar from '../Snackbar';
import { deleteRentTransportationAPI } from '../../api/rentTransportation';
import { useNavigate } from 'react-router-dom';
const columns = [
  { name: 'DIBUAT OLEH', uid: 'name' },
  { name: 'JUDUL', uid: 'title' },
  { name: 'AKSI', uid: 'actions' },
];

export default (props) => {
  const { data = [], loading = false, onDelete } = props;
  const { openSnackbarSuccess, openSnackbarError } = useSnackbar();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 4;
  const signal = useRef();
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];

    const Type = () => {
      switch (tour.type) {
        case 1:
          return 'Mobil';

        case 2:
          return 'Motor';

        default:
          return '';
      }
    };

    const deleteRentTransportation = (id) => {
      setIsLoading(true);
      deleteRentTransportationAPI({ id }, signal.current?.signal)
        .then(() => {
          openSnackbarSuccess('Transportasi berhasil dihapus');
          onDelete();
        })
        .catch((err) => openSnackbarError(err))
        .finally(() => setIsLoading(false));
    };

    switch (columnKey) {
      case 'name':
        return <Avatar user={tour} name={cellValue} />;
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{tour.title}</p>
            <p className="text-bold text-sm capitalize text-default-400">{Type()}</p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Penyedia Penginapan">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/detail-rent-transportation/${tour.id}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Penyedia Penginapan">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/edit-rent-transportation/${tour.id}`)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus Penyedia Transportasi">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteRentTransportation(tour.id)}
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
        emptyContent={'Tidak ada data'}
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
