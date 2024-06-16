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
import { deleteTouristDestinationAPI } from '../../api/touristDestination';
import useSnackbar from '../Snackbar';
import { useNavigate } from 'react-router-dom';
const columns = [
  { name: 'DIBUAT OLEH', uid: 'name' },
  { name: 'JUDUL', uid: 'title' },
  { name: 'LOKASI', uid: 'location' },
  { name: 'HARGA', uid: 'price' },
  { name: 'AKSI', uid: 'actions' },
];

export default (props) => {
  const { data = [], loading = false, onDelete } = props;
  const navigate = useNavigate();
  const { openSnackbarSuccess, openSnackbarError } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const signal = useRef();
  const rowsPerPage = 4;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const deleteTouristDestination = (id) => {
    setIsLoading(true);
    deleteTouristDestinationAPI({ id }, signal.current?.signal)
      .then(() => {
        openSnackbarSuccess('Destinasi wisata berhasil dihapus');
        onDelete();
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setIsLoading(false));
  };

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];

    const Type = () => {
      switch (tour.type) {
        case 'wisata_alam':
          return 'Wisata Alam';

        case 'wisata_budaya':
          return 'Wisata Budaya';

        case 'wisata_kuliner':
          return 'Wisata Kuliner';

        default:
          return '';
      }
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
      case 'location':
        return <p className="text-bold text-sm capitalize">{tour.location}</p>;
      case 'price':
        return (
          <p className="text-bold text-sm capitalize">{formatNumberWithSeparator(tour.price)}</p>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Destinasi Wisata">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/detail-tourist-destination/${tour.id}`)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit Destinasi Wisata">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/setting/dashboard/edit-tourist-destination/${tour.id}`)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus Destinasi Wisata">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteTouristDestination(tour.id)}
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
