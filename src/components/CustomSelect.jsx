import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const CustomSelect = (props) => {
  const { label = "", control, options = [], ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select label={label} {...restProps} {...field}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default CustomSelect;