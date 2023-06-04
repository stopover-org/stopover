import React from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { UseFormProps, UseFormReturn } from "react-hook-form/dist/types";
import {
  Disposable,
  GraphQLTaggedNode,
  MutationParameters,
  VariablesOf,
} from "relay-runtime";
import { useMutation } from "react-relay";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { UseMutationConfig } from "react-relay/relay-hooks/useMutation";

interface UseMutationFormProps<
  Fields extends FieldValues,
  MutationType extends MutationParameters
> extends UseFormProps<Fields>,
    Partial<UseMutationConfig<MutationType>> {
  onSubmit?: (
    mutation: (config: UseMutationConfig<MutationType>) => Disposable,
    // add context
    form: UseFormReturn<Fields>,
    ...rest: any
  ) => (values: Fields) => void;
  autosave?: boolean;
  autosaveTimeout?: number;
}

function useMutationForm<
  FieldsType extends FieldValues,
  MutationType extends MutationParameters
>(
  gql: GraphQLTaggedNode,
  variables: (values: FieldsType) => VariablesOf<MutationType>,
  {
    onSubmit: submitHandler,
    onCompleted,
    autosave,
    autosaveTimeout = 500,
    defaultValues,
    ...opts
  }: UseMutationFormProps<FieldsType, MutationType>
) {
  const [mutation] = useMutation<MutationType>(gql);
  const form = useForm<FieldsType>({ ...opts, defaultValues });

  function onSubmit(...rest: any) {
    if (submitHandler instanceof Function) {
      return submitHandler(mutation, form, ...rest);
    }
    return function submit(values: FieldsType) {
      mutation({
        variables: variables(values),
        onCompleted,
      });
    };
  }

  // useFormField is not shared function
  // because it uses form reference inside
  // if you modify this function don't forget
  // to change useFormField in useFormContext too
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
        error: form.formState.errors[name]?.message as string,
      }),
      [field]
    );
  }

  const requestRef = React.useRef<null | NodeJS.Timer>(null);
  const handleSubmit = (...rest: any) => form.handleSubmit(onSubmit(...rest));

  React.useEffect(() => {
    form.reset(defaultValues as FieldsType);
  }, [defaultValues]);

  const currentValues = React.useMemo(
    () => form.getValues(),
    [JSON.stringify(form.getValues())]
  );

  React.useEffect(() => {
    if (autosave) {
      if (requestRef.current) {
        return;
      }
      requestRef.current = setTimeout(() => {
        requestRef.current = null;

        handleSubmit()();
      }, autosaveTimeout);
    }
  }, [JSON.stringify(currentValues)]);

  return React.useMemo(
    () => ({
      ...form,
      handleSubmit,
      useFormField,
    }),
    [form.formState]
  );
}

export default useMutationForm;
