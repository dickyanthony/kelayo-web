import { Controller } from 'react-hook-form';
import { Checkbox } from '@nextui-org/react';

export default (props) => {
  const { label = '', name, required = false, control, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Checkbox
          name={name}
          isSelected={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          radius="full"
          {...restProps}
        >
          {label}
        </Checkbox>
      )}
    />
  );
};
