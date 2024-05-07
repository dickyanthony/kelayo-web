import React from "react";
import { Checkbox as NextCheckbox } from "@nextui-org/react";

export function SmallCheckbox(props) {
  const { children, ...restProps } = props;
  return (
    <NextCheckbox size="sm" {...restProps}>
      {children}
    </NextCheckbox>
  );
}

export function MedimumCheckbox(props) {
  const { children, ...restProps } = props;
  return (
    <NextCheckbox size="md" {...restProps}>
      {children}
    </NextCheckbox>
  );
}
export function LargeCheckbox(props) {
  const { children, ...restProps } = props;
  return (
    <NextCheckbox size="lg" {...restProps}>
      {children}
    </NextCheckbox>
  );
}
