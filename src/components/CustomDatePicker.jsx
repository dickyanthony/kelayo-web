import { DatePicker } from '@nextui-org/react';
import { Controller } from 'react-hook-form';

const CustomDatePicker = (props) => {
  const { label, name, control, onChange, required = false, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <DatePicker
          name={name}
          isRequired={required}
          fullWidth
          label={label}
          onChange={onChange}
          {...restProps}
          {...field}
        />
      )}
    />
  );
};

export default CustomDatePicker;
