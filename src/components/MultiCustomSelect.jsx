import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Controller } from 'react-hook-form';

const MultiCustomSelect = (props) => {
  const {
    label = '',
    name,
    required = false,
    control,
    options = [],
    selectionMode = 'multiple',
    isDisabled = false,
    ...restProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Select
          label={label}
          name={name}
          required={required}
          selectedKeys={field.value || []}
          className="max-w-xs"
          onSelectionChange={(keys) => {
            field.onChange([...keys]);
          }}
          selectionMode={selectionMode}
          {...restProps}
          isDisabled={isDisabled}
        >
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

export default MultiCustomSelect;
