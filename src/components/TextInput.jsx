import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashedFilledIcon";
import { Controller, useFormContext } from "react-hook-form";

export default function TextInput(props) {
  const {
    type = "text",
    label = "",
    name = "",
    passwordInput = false,
    control,
    ...restProps
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (passwordInput) {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            label={label}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            name={name}
            id={name}
            {...restProps}
            {...field}

            // className="max-w-xs"
          />
        )}
      />
    );
  } else {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
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
}
