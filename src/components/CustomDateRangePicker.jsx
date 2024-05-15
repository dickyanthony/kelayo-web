import { DateRangePicker } from "@nextui-org/react";

const CustomDateRangePicker = (props) => {
  const { label, onChange, ...restProps } = props;
  return (
    <DateRangePicker
      fullWidth
      label={label}
      onChange={onChange}
      {...restProps}
    />
  );
};

export default CustomDateRangePicker;
