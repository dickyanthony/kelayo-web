/* eslint-disable no-unused-vars */
/*global some_unused_var*/
import React from "react";
import { Button } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

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
  const superSmall = useMediaQuery({ maxWidth: "730px" });
  const cutText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className={`flex flex-wrap gap-4 items-center ${containerStyle}`}>
      <Button variant="bordered" startContent={icon} {...restProps}>
        {superSmall ? cutText(children, 5) : children}
      </Button>
    </div>
  );
}
