import {
  Path,
  PathValue,
  useFormContext as useFormContextOrigin,
} from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React from "react";

function useFormContext<FieldsType extends FieldValues>() {
  const form = useFormContextOrigin<FieldsType>();

  // useFormField is not shared function
  // because it uses form reference inside
  // if you modify this function don't forget
  // to change useFormField in useMutationForm too
  function useFormField<ValueType = any>(name: Path<FieldsType>) {
    const field = form.register(name);

    return React.useMemo(
      () => ({
        ...field,
        ref: field.ref,
        value: form.watch(name) as ValueType,
        onChange: (value: PathValue<FieldsType, Path<FieldsType>>) => {
          form.setValue(name, value);
        },
        error: form.formState.errors[name],
      }),
      [field]
    );
  }

  return React.useMemo(
    () => ({
      ...form,
      useFormField,
    }),
    [form.formState]
  );
}

export default useFormContext;
