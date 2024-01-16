import { Moment } from "moment";
import React from "react";
import { graphql, useFragment } from "react-relay";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditProfileForm_AccountFragment$key } from "../../../../artifacts/useEditProfileForm_AccountFragment.graphql";
import { validatePhone } from "../../../../lib/utils/validations";
import { momentTransform } from "../../../../lib/utils/transforms";
import useMutationForm from "../../../../lib/hooks/useMutationForm";

export interface EditProfileFields {
  primaryEmail: string;
  primaryPhone: string;
  name: string;
  lastName: string;
  country: string;
  city: string;
  region: string;
  dateOfBirth: Moment | null;
}

function useDefaultValues(
  accountFragmentRef: useEditProfileForm_AccountFragment$key
) {
  const account = useFragment(
    graphql`
      fragment useEditProfileForm_AccountFragment on Account {
        primaryEmail
        primaryPhone
        name
        dateOfBirth
        address {
          country
          region
          city
        }
      }
    `,
    accountFragmentRef
  );

  return React.useMemo(
    () => ({
      primaryEmail: account.primaryEmail || "",
      primaryPhone: account.primaryPhone || "",
      name: account.name || "",
      country: account.address?.country || "",
      city: account.address?.city || "",
      region: account.address?.region || "",
      dateOfBirth: account.dateOfBirth || null,
    }),
    [account]
  );
}

const validationSchema = Yup.object().shape({
  primaryEmail: Yup.string().email().required("Required"),
  primaryPhone: Yup.string()
    .test("validate-phone", "invalid", validatePhone)
    .required("Required"),
  name: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
  dateOfBirth: Yup.date().transform(momentTransform).nullable(),
});

export function useEditProfileForm(
  accountFragmentRef: useEditProfileForm_AccountFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useEditProfileForm_UpdateProfileMutation(
        $input: UpdateAccountInput!
      ) {
        updateAccount(input: $input) {
          account {
            ...ProfileScene_AccountFragment
          }
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(accountFragmentRef),
      resolver: yupResolver(validationSchema),
      autosave: true,
    }
  );
}
