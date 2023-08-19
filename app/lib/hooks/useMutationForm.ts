import React from "react";
import { FieldError, Path, PathValue, useForm } from "react-hook-form";
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
import { toast } from "sonner";

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
  targetName?: string;
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
    targetName,
    ...opts
  }: UseMutationFormProps<FieldsType, MutationType>
) {
  const [mutation] = useMutation<MutationType>(gql);
  const form = useForm<FieldsType>({ ...opts, defaultValues });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(
    form.formState.isSubmitting
  );

  function onSubmit(...rest: any) {
    if (submitHandler instanceof Function) {
      return submitHandler(mutation, form, ...rest);
    }
    return function submit(values: FieldsType) {
      setIsSubmitting(true);

      mutation({
        variables: variables(values),
        onError: (...errorRest) => {
          setIsSubmitting(false);

          if (opts.onError instanceof Function) {
            opts.onError(...errorRest);
          }
        },
        onCompleted: (...completedRest) => {
          setIsSubmitting(false);

          // eslint-disable-next-line prefer-destructuring
          if (!targetName) targetName = Object.keys(completedRest[0])[0];

          if (
            targetName &&
            // @ts-ignore
            completedRest[0][targetName] &&
            // @ts-ignore
            completedRest[0][targetName].notification
          ) {
            // @ts-ignore
            toast.message(completedRest[0][targetName].notification);
          }

          if (
            targetName &&
            // @ts-ignore
            completedRest[0][targetName] &&
            // @ts-ignore
            completedRest[0][targetName].errors
          ) {
            // @ts-ignore
            completedRest[0][targetName].errors.forEach((err) => {
              // @ts-ignore
              toast.error(err);
            });
          }

          if (completedRest[0]) {
            if (onCompleted instanceof Function) {
              onCompleted(...completedRest);
            }
          }
        },
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
        error: form.formState.errors?.[name] as FieldError,
      }),
      [field]
    );
  }

  const requestRef = React.useRef<null | NodeJS.Timer>(null);
  const handleSubmit = (...rest: any) => form.handleSubmit(onSubmit(...rest));

  React.useEffect(() => {
    if (autosave) return;
    requestRef.current = null;

    form.reset(defaultValues as FieldsType);
  }, [defaultValues]);

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
  }, [JSON.stringify(form.getValues())]);

  const {
    isDirty,
    isLoading,
    isSubmitted,
    isSubmitSuccessful,
    isValidating,
    isValid,
    submitCount,
    dirtyFields,
    touchedFields,
    errors,
  } = form.formState;

  return React.useMemo(
    () => ({
      ...form,
      formState: {
        isDirty,
        isLoading,
        isSubmitted,
        isSubmitSuccessful,
        isSubmitting,
        isValidating,
        isValid,
        submitCount,
        dirtyFields,
        touchedFields,
        errors,
      },
      handleSubmit,
      useFormField,
    }),
    [form.formState]
  );
}

export default useMutationForm;
