import { Slider } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const CustomSlider = (props) => {
  const { control, name = "", label = "", ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Slider name={name} label={label} {...restProps} {...field} />
      )}
    />
  );
};

export default CustomSlider;
