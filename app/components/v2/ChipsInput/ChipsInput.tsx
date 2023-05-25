import React from "react";
import { Chip, ChipDelete, FormHelperText, Stack } from "@mui/joy";
import Input from "../Input";
import { InputProps } from "../Input/Input";

interface BaseChipsInputProps {}

interface ChipsInputProps
  extends Omit<InputProps, keyof BaseChipsInputProps>,
    BaseChipsInputProps {}

const ChipsInput = ({ hint, value, onChange, ...props }: ChipsInputProps) => {
  const chips = React.useMemo(
    () => (value ? value.split(/\s*,\s*/) : []).filter(Boolean),
    [value]
  );
  const [newChip, setNewChip] = React.useState("");
  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      event.stopPropagation();

      switch (event.code) {
        case "Enter":
        case "Comma":
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
        onKeyUp={handleKeyPress}
        hint={false}
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
};

export default React.memo(ChipsInput);
