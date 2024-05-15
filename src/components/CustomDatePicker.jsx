import { DatePicker } from "@nextui-org/react";

const CustomDatePicker = (props) => {
  const { label, onChange, ...restProps } = props;
  return (
    <DatePicker fullWidth label={label} onChange={onChange} {...restProps} />
  );
};

export default CustomDatePicker;
