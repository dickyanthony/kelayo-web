import React from "react";
import { Button } from "@nextui-org/react";

export function PrimaryButton(props) {
  const { children, ...restProps } = props;
  return (
    <Button color="primary" {...restProps}>
      {children}
    </Button>
  );
}

export function ButtonWithLeftIcon(props) {
  const { icon, children, containerStyle, ...restProps } = props;
  return (
    <div className={`flex gap-4 items-center ${containerStyle}`}>
      <Button variant="bordered" startContent={icon} {...restProps}>
        {children}
      </Button>
    </div>
  );
}
