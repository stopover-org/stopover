import React from "react";
import { Chip, ChipDelete, FormHelperText, Stack } from "@mui/joy";
import Input from "../Input";
import { InputProps } from "../Input/Input";

interface BaseChipsInputProps {}

interface ChipsInputProps
  extends Omit<InputProps, keyof BaseChipsInputProps>,
    BaseChipsInputProps {}

const ChipsInput = React.forwardRef(
  (
    { hint, value, onChange, ...props }: ChipsInputProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const chips = React.useMemo(
      () => (value ? value.split(/\s*,\s*/) : []).filter(Boolean),
      [value]
    );
    const [newChip, setNewChip] = React.useState("");
    const handleKeyPress = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.code) {
          case "Enter":
          case "Comma":
            event.preventDefault();

            event.stopPropagation();
            if (onChange instanceof Function) {
              onChange(`${chips.join(", ")}, ${newChip}`, event as any);
            }
            setNewChip("");
            break;
          default:
            break;
        }
      },
      [onChange, chips, newChip]
    );

    const removeChip = React.useCallback(
      (index: number) => () => {
        if (onChange instanceof Function) {
          onChange(
            [
              ...chips.slice(0, index),
              ...chips.slice(index + 1, chips.length),
            ].join(", ")
          );
        }
      },
      [onChange, chips]
    );
    return (
      <>
        <Input
          {...props}
          value={newChip}
          onChange={setNewChip}
          onKeyDown={handleKeyPress}
          hint={false}
          ref={ref}
        />
        <FormHelperText>
          <Stack flexDirection="row" flexWrap="wrap">
            {chips.map((chip, index) => (
              <Chip
                key={`${chip}-${index}`}
                size="sm"
                variant="outlined"
                endDecorator={<ChipDelete onDelete={removeChip(index)} />}
              >
                {chip}
              </Chip>
            ))}
          </Stack>
        </FormHelperText>
        <FormHelperText>{hint}</FormHelperText>
      </>
    );
  }
);

export default React.memo(ChipsInput);
