import { Slider } from '@nextui-org/react';
import { Controller } from 'react-hook-form';

const CustomSlider = (props) => {
  const {
    control,
    required = false,
    min = 0,
    max = 0,
    name = '',
    label = '',
    ...restProps
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => {
        return (
          <Slider
            name={name}
            label={label}
            minValue={min}
            maxValue={max}
            defaultValue={[min, max]}
            {...restProps}
            {...field}
          />
        );
      }}
    />
  );
};

export default CustomSlider;
