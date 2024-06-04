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
import { deleteTransportationAPI } from '../../api/transportationAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { formatNumberWithSeparator } from '../../utils/numberConverter';
const columns = [
  { name: 'NAMA', uid: 'name' },
  { name: 'HARGA', uid: 'price' },
  { name: 'AKSI', uid: 'actions' },
];

export default (props) => {
  const { data = [], loading = false, onDelete, hideEdit = false, hideDelete = false } = props;
  const { id } = useParams();

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

    const deleteTransportation = (id) => {
      setIsLoading(true);
      deleteTransportationAPI({ id }, signal.current?.signal)
        .then(() => {
          openSnackbarSuccess('Transportasi berhasil dihapus');
          onDelete();
        })
        .catch((err) => openSnackbarError(err))
        .finally(() => setIsLoading(false));
    };

    switch (columnKey) {
      case 'name':
        return <p className="text-bold text-sm capitalize">{tour.name}</p>;
      case 'price':
        return (
          <p className="text-bold text-sm capitalize">{formatNumberWithSeparator(tour.price)}</p>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Transportasi">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() =>
                  navigate(
                    `/setting/dashboard/detail-rent-transportation/${id}/detail-transportation/${tour.id}`
                  )
                }
              >
                <EyeIcon />
              </span>
            </Tooltip>
            {!hideEdit && (
              <Tooltip content="Edit Transportasi">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    navigate(
                      `/setting/dashboard/edit-rent-transportation/${id}/edit-transportation/${tour.id}`
                    )
                  }
                >
                  <EditIcon />
                </span>
              </Tooltip>
            )}

            {!hideDelete && (
              <Tooltip color="danger" content="Hapus Transportasi">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteTransportation(tour.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            )}
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
