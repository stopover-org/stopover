import {
  Path,
  PathValue,
  useFormContext as useFormContextOrigin,
} from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React from "react";

function useFormContext<FieldsType extends FieldValues>() {
  const form = useFormContextOrigin<FieldsType>();

  function useFormField(name: Path<FieldsType>) {
    const field = form.register(name);

    return React.useMemo(
      () => ({
        ...field,
        ref: field.ref,
        value: form.watch(name),
        onChange: (value: PathValue<FieldsType, Path<FieldsType>>) => {
          form.setValue(name, value);
        },
        error: form.formState.errors[name]?.message,
      }),
      [field]
    );
  }

  return React.useMemo(
    () => ({
      ...form,
      useFormField,
    }),
    []
  );
}

export default useFormContext;
