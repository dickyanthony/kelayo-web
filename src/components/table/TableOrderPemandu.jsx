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
  Chip,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { EyeIcon } from '../../assets/EyeIcon';
import { EditIcon } from '../../assets/EditIcon';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { Avatar, OrderPDF } from '..';

import React, { useState, useRef } from 'react';
import useSnackbar from '../Snackbar';
import { deleteTourGuideAPI } from '../../api/tourGuide';
import { useNavigate } from 'react-router-dom';
import { VerticalDotsIcon } from '../../assets/VerticalDotsIcon';

import { pdf } from '@react-pdf/renderer';
import { updateOrderLodgingReservationAPI } from '../../api/orderLodgingReservationAPI';
import { formatNumberWithSeparator } from '../../utils/numberConverter';
import { formatDateToDDMMYYYY } from '../../utils/dateConverter';
const statusColorMap = {
  1: 'warning',
  2: 'primary',
  3: 'success',
};
const columns = [
  { name: 'AKSI', uid: 'actions' },
  { name: 'PEMESAN', uid: 'order', minWidth: 300 },
  { name: 'PENGiNAPAN', uid: 'penginapan' },
  { name: 'NAMA', uid: 'name' },
  { name: 'HP', uid: 'hp' },
  { name: 'TANGGAL MULAI', uid: 'start' },
  { name: 'TANGGAL BERAKHIR', uid: 'end' },
  { name: 'TOTAL', uid: 'price' },
  // { name: 'BUKTI PEMBAYARAN', uid: 'image' },
  { name: 'STATUS', uid: 'status' },
];

export default (props) => {
  const { data = [], user, loading = false, onDelete, getList } = props;
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

  const handleOpenPDF = async (tour) => {
    const doc = <OrderPDF order={tour} />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const updateStatus = (item, status) => {
    setIsLoading(true);
    const params = { id: item.id, status: status };
    updateOrderLodgingReservationAPI(params)
      .then(() => {
        getList();
        openSnackbarSuccess('Status Berhasil Diupdate');
      })
      .catch((err) => openSnackbarError(err))
      .finally(() => setIsLoading(false));
  };

  const getStatusText = (status) => {
    switch (status) {
      // selesai: 'success',
      // ambilDiTempat: 'danger',
      // menungguKonfirmasi: 'warning'
      case 1:
        return 'Menunggu Konfirmasi';

      case 2:
        return 'Silahkan Print Tiket';

      case 3:
        return 'Selesai';

      default:
        'Terima Kasih';
    }
  };

  const renderStatusButton = (item) => {
    if (user.role !== 'normal') {
      switch (item.status) {
        case 1:
          return <DropdownItem onPress={() => updateStatus(item, 2)}>Diproses</DropdownItem>;

        case 2:
          return <DropdownItem onPress={() => updateStatus(item, 3)}>Selesai</DropdownItem>;

        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];
    const fullName = (tour.first_name ?? '') + ' ' + (tour.last_name ?? '');

    switch (columnKey) {
      case 'order':
        return <Avatar user={tour.account} name={cellValue} />;
      case 'penginapan':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{tour.product.title}</p>
            <p className="text-bold text-sm capitalize text-default-400 line-clamp-2">
              {tour.product.description}
            </p>
          </div>
        );

      case 'name':
        return <p className="text-bold text-sm capitalize">{fullName}</p>;
      case 'hp':
        return <p className="text-bold text-sm capitalize">{tour.hp}</p>;
      case 'start':
        return <p className="text-bold text-sm capitalize">{formatDateToDDMMYYYY(tour.start)}</p>;
      case 'end':
        return <p className="text-bold text-sm capitalize">{formatDateToDDMMYYYY(tour.end)}</p>;
      case 'price':
        return (
          <p className="text-bold text-sm capitalize">
            Rp {formatNumberWithSeparator(tour.total_price)}
          </p>
        );

      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[tour.status]} size="sm" variant="flat">
            {getStatusText(tour.status)}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {/* <DropdownItem>Bukti Pembayaran</DropdownItem> */}
                {renderStatusButton(tour)}
                <DropdownItem onPress={() => handleOpenPDF(tour)}>Print Tiket</DropdownItem>
                {/* <DropdownItem>Delete</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      className="max-w-screen-2xl md:min-w-[1034px]"
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
          <TableColumn
            key={column.uid}
            minWidth={column.minWidth}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
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
