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
import { Avatar } from '..';

import React, { useState, useRef } from 'react';
import useSnackbar from '../Snackbar';
import { deleteTourGuideAPI } from '../../api/tourGuide';
import { useNavigate } from 'react-router-dom';
import { VerticalDotsIcon } from '../../assets/VerticalDotsIcon';

const statusColorMap = {
  selesai: 'success',
  ambilDiTempat: 'danger',
  menungguKonfirmasi: 'warning',
};
const columns = [
  { name: 'AKSI', uid: 'actions' },
  { name: 'PEMESAN', uid: 'order' },
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

  const renderCell = React.useCallback((tour, columnKey) => {
    const cellValue = tour[columnKey];

    switch (columnKey) {
      case 'order':
        return <Avatar user={tour} name={cellValue} />;
      case 'penginapan':
        return <Avatar user={tour} name={cellValue} />;
      case 'name':
        return <p className="text-bold text-sm capitalize">asd</p>;
      case 'hp':
        return <p className="text-bold text-sm capitalize">asd</p>;
      case 'start':
        return <p className="text-bold text-sm capitalize">asd</p>;
      case 'end':
        return <p className="text-bold text-sm capitalize">asd</p>;
      case 'price':
        return <p className="text-bold text-sm capitalize">asd</p>;
      // case 'image':
      //   return (
      //     <Image
      //       src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      //       alt="bukti-pembayaran"
      //     />
      //   );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap['selesai']} size="sm" variant="flat">
            {'cellValue'}
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
                <DropdownItem>Bukti Pembayaran</DropdownItem>
                <DropdownItem>Print Tiket</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
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
