import { Pagination } from "@nextui-org/react";

export default function CustomPagination(props) {
  const { initial = 1, total = 5, onChange = () => {} } = props;
  return <Pagination total={total} initialPage={initial} onChange={onChange} />;
}
