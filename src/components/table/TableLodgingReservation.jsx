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
import { formatNumberWithSeparator } from '../../utils/numberConverter';

import React, { useState, useRef } from 'react';
import useSnackbar from '../Snackbar';
import { deleteLodgingReservationAPI } from '../../api/lodgingReservation';
import { useNavigate } from 'react-router-dom';
const columns = [
  { name: 'DIBUAT OLEH', uid: 'name' },
  { name: 'JUDUL', uid: 'title' },
  { name: 'HARGA', uid: 'price' },
  { name: 'GRATIS AIR & LISTRIK', uid: 'isFreeWaterElectric' },
  { name: 'GRATIS WIFI', uid: 'isFreeWifi' },
  { name: 'KAMAR MANDI PRIBADI', uid: 'isPrivateBathroom' },
  { name: 'AKSI', uid: 'actions' },
];

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

const UncheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  );
};

export default (props) => {
  const { data = [], loading = false, onDelete } = props;
  const { openSnackbarSuccess, openSnackbarError } = useSnackbar();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const signal = useRef();
  const rowsPerPage = 4;

  const pages = Math.ceil(data.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const deleteLodgingReservation = (id) => {
    setIsLoading(true);
    deleteLodgingReservationAPI({ id }, signal.current?.signal)
      .then(() => {
        openSnackbarSuccess('Penginapan berhasil dihapus');
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
          </div>
        );
      case 'price':
        return (
          <p className="text-bold text-sm capitalize">{formatNumberWithSeparator(tour.price)}</p>
        );
      case 'isFreeWifi':
        return (
          <p className="text-bold text-sm capitalize">
            {tour.isFreeWifi ? <CheckIcon /> : <UncheckIcon />}
          </p>
        );
      case 'isFreeWaterElectric':
        return (
          <p className="text-bold text-sm capitalize">
            {tour.isFreeWaterElectric ? <CheckIcon /> : <UncheckIcon />}
          </p>
        );
      case 'isPrivateBathroom':
        return (
          <p className="text-bold text-sm capitalize">
            {tour.isPrivateBathroom ? <CheckIcon /> : <UncheckIcon />}
          </p>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Penginapan">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/detail-lodging-reservation/${tour.id}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Penginapan">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/edit-lodging-reservation/${tour.id}`)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus Penginapan">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteLodgingReservation(tour.id)}
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
      className="max-w-screen-xl md:min-w-screen-xl"
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
            total={pages}
            onChange={(page) => setPage(page)}
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
