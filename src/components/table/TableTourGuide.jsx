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
import { deleteTourGuideAPI } from '../../api/tourGuide';
import { useNavigate } from 'react-router-dom';
const columns = [
  { name: 'DIBUAT OLEH', uid: 'name' },
  { name: 'PEMANDU', uid: 'title' },
  { name: 'DOMISILI', uid: 'domisili' },
  { name: 'UMUR', uid: 'age' },
  { name: 'AKSI', uid: 'actions' },
];

export default (props) => {
  const { data = [], loading = false, onDelete } = props;
  const { openSnackbarSuccess, openSnackbarError } = useSnackbar();
  const navigate = useNavigate();
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

  const deleteTourGuide = (id) => {
    setIsLoading(true);
    deleteTourGuideAPI({ id }, signal.current?.signal)
      .then(() => {
        openSnackbarSuccess('Pemandu wisata berhasil dihapus');
        onDelete();
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setIsLoading(false));
  };

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];

    switch (columnKey) {
      case 'name':
        return <Avatar user={tour} name={cellValue} />;
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{tour.title}</p>
            <p className="text-bold text-sm capitalize text-default-400">{tour.status}</p>
          </div>
        );
      case 'domisili':
        return <p className="text-bold text-sm capitalize">{tour.domisili}</p>;
      case 'age':
        return <p className="text-bold text-sm capitalize">{tour.age}</p>;
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Pemandu Wisata">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/detail-tour-guide/${tour.id}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Pemandu Wisata">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/edit-tour-guide/${tour.id}`)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus Pemandu Wisata">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteTourGuide(tour.id)}
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
