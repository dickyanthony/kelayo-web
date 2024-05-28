import { Pagination } from '@nextui-org/react';

export default function CustomPagination(props) {
  const { initial = 1, totalPage = 5, onChange = () => {} } = props;
  return (
    <Pagination
      className="mt-8 flex justify-center"
      total={totalPage}
      initialPage={initial}
      onChange={onChange}
    />
  );
}
