import React from "react";
import * as Yup from "yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditInterestForm_UpdateInterestMutation } from "artifacts/useEditInterestForm_UpdateInterestMutation.graphql";
import { useEditInterestForm_InterestFragment$key } from "artifacts/useEditInterestForm_InterestFragment.graphql";

export interface EditInterestFormFields {
  title: string;
  slug: string;
  preview: string;
  description: string;
  interestId: string;
}

function useDefaultValues(
  interestFragmentRef: useEditInterestForm_InterestFragment$key
): EditInterestFormFields {
  const interest = useFragment<useEditInterestForm_InterestFragment$key>(
    graphql`
      fragment useEditInterestForm_InterestFragment on Interest {
        originalTitle
        slug
        preview
        description
        id
      }
    `,
    interestFragmentRef
  );
  return React.useMemo(
    () => ({
      title: interest.originalTitle,
      slug: interest.slug,
      preview: interest.preview || "",
      description: interest.description || "",
      interestId: interest.id,
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  slug: Yup.string().required(),
  description: Yup.string().required(),
  preview: Yup.string().required(),
});

export function useEditInterestForm(
  interestFragmentRef: useEditInterestForm_InterestFragment$key,
  onComplete: () => void
) {
  return useMutationForm<
    EditInterestFormFields,
    useEditInterestForm_UpdateInterestMutation
  >(
    graphql`
      mutation useEditInterestForm_UpdateInterestMutation(
        $input: UpdateInterestInput!
      ) {
        updateInterest(input: $input) {
          interest {
            ...useEditInterestForm_InterestFragment
          }
          notification
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(interestFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}
