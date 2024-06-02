import { Textarea } from '@nextui-org/react';
import { Controller } from 'react-hook-form';

export default function TextArea(props) {
  const {
    type = 'text',
    label = '',
    name = '',

    required = false,
    control,
    ...restProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Textarea
          required={required}
          type={type}
          label={label}
          name={name}
          id={name}
          {...restProps}
          {...field}
        />
      )}
    />
  );
}
