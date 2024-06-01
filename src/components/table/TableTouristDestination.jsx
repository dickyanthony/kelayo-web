import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from '@nextui-org/react';
import { EyeIcon } from '../../assets/EyeIcon';
import { EditIcon } from '../../assets/EditIcon';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { Avatar } from '..';

import React from 'react';
const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'TITLE', uid: 'title' },
  { name: 'LOCATION', uid: 'location' },
  { name: 'PRICE', uid: 'price' },
  { name: 'ACTIONS', uid: 'actions' },
];

const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Technical Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Senior Developer',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'Community Manager',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Sales Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
];

export { columns, users };

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

export default (props) => {
  const { item = [] } = props;
  console.log('item==>', item);
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    const Type = () => {
      switch (user.type) {
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
        return <Avatar user={user} name={cellValue} />;
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.title}</p>
            <p className="text-bold text-sm capitalize text-default-400">{Type()}</p>
          </div>
        );
      case 'location':
        return <p className="text-bold text-sm capitalize">{user.location}</p>;
      case 'price':
        return (
          <p className="text-bold text-sm capitalize">{formatNumberWithSeparator(user.price)}</p>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
      aria-label="Example table with custom cells"
      selectionMode="single"
      showSelectionCheckboxes={false}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={item}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
