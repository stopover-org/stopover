import React from "react";
import * as Yup from "yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateInterestForm_CreateInterestMutation } from "artifacts/useCreateInterestForm_CreateInterestMutation.graphql";

export interface CreateInterestFormFields {
  title: string;
  slug: string;
  preview: string;
  description: string;
}

function useDefaultValues(): CreateInterestFormFields {
  return React.useMemo(
    () => ({ title: "", slug: "", preview: "", description: "" }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  slug: Yup.string().required(),
  preview: Yup.string().required(),
});

export function useCreateInterestForm(onComplete: () => void) {
  return useMutationForm<
    CreateInterestFormFields,
    useCreateInterestForm_CreateInterestMutation
  >(
    graphql`
      mutation useCreateInterestForm_CreateInterestMutation(
        $input: CreateInterestInput!
      ) {
        createInterest(input: $input) {
          interest {
            title
            slug
            preview
          }
          notification
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}
