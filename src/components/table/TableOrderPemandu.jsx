import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Avatar, OrderPDF } from '..';

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerticalDotsIcon } from '../../assets/VerticalDotsIcon';
import useSnackbar from '../Snackbar';

import { pdf } from '@react-pdf/renderer';
import { updateOrderLodgingReservationAPI } from '../../api/orderLodgingReservationAPI';
import { formatDateToDDMMYYYY } from '../../utils/dateConverter';
import { formatNumberWithSeparator } from '../../utils/numberConverter';

import { ChatIcon } from '../../assets/Chat.jsx';
import { PrintIcon } from '../../assets/Print.jsx';
import { ProcessIcon } from '../../assets/Process.jsx';
import { CompleteIcon } from '../../assets/Complete.jsx';

const statusColorMap = {
  1: 'warning',
  2: 'primary',
  3: 'success',
};
const columns = [
  { name: 'AKSI', uid: 'actions' },
  { name: 'PEMESAN', uid: 'order', minWidth: 300 },
  { name: 'PEMANDU', uid: 'pemandu' },
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

  const handleChatPress = (phoneNumber) => {
    const url = `https://wa.me/${phoneNumber}`;
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
          return (
            <DropdownItem
              startContent={
                <ProcessIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
              }
              onPress={() => updateStatus(item, 2)}
            >
              Diproses
            </DropdownItem>
          );

        case 2:
          return (
            <DropdownItem
              startContent={
                <CompleteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
              }
              onPress={() => updateStatus(item, 3)}
            >
              Selesai
            </DropdownItem>
          );

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
      case 'pemandu':
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
                {renderStatusButton(tour)}
                <DropdownItem
                  startContent={
                    <PrintIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                  onPress={() => handleOpenPDF(tour)}
                >
                  Print Tiket
                </DropdownItem>
                {user?.role !== 'normal' && (
                  <DropdownItem
                    startContent={
                      <ChatIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                    }
                    onPress={() => handleChatPress(tour.hp)}
                  >
                    Chat WA
                  </DropdownItem>
                )}

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
