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
    ...opts
  }: UseMutationFormProps<FieldsType, MutationType>
) {
  const [mutation] = useMutation<MutationType>(gql);
  const form = useForm<FieldsType>(opts);

  function onSubmit(...rest: any) {
    if (submitHandler instanceof Function) {
      return submitHandler(mutation, form, ...rest);
    }
    return function submit(values: FieldsType) {
      mutation({
        variables: values,
        onCompleted,
      });
    };
  }

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
      handleSubmit: (...rest: any) => form.handleSubmit(onSubmit(...rest)),
      useFormField,
    }),
    []
  );
}

export default useMutationForm;
