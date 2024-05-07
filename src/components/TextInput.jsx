import { Input } from "@nextui-org/react";

export default function TextInput(props) {
  const { type = "text", label = "", ...restProps } = props;
  return <Input type={type} label={label} {...restProps} />;
}
