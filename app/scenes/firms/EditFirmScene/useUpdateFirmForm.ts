import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useUpdateFirmForm_FirmFragment$key } from "../../../artifacts/useUpdateFirmForm_FirmFragment.graphql";
import { useUpdateFirmForm_UpdateFirmMutation } from "../../../artifacts/useUpdateFirmForm_UpdateFirmMutation.graphql";
import { validatePhone } from "../../../lib/utils/validations";

interface UpdateFirmFields {
  title: string;
  contactPerson: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  fullAddress: string | null;
  primaryEmail: string;
  primaryPhone: string | null;
  contacts: string | null;
  website: string | null;
  description: string | null;
  image: string | null;
  paymentTypes: string[];
}

function useDefaultValues(
  updateFirmFragmentRef: useUpdateFirmForm_FirmFragment$key
): UpdateFirmFields {
  const firm = useFragment(
    graphql`
      fragment useUpdateFirmForm_FirmFragment on Firm {
        city
        contactPerson
        contacts
        country
        description
        fullAddress
        houseNumber
        image
        paymentTypes
        primaryEmail
        primaryPhone
        region
        street
        title
        website
      }
    `,
    updateFirmFragmentRef
  );

  return React.useMemo(
    () => ({
      title: firm?.title,
      contactPerson: firm?.contactPerson,
      country: firm?.country,
      region: firm?.region,
      street: firm?.street,
      fullAddress: firm?.fullAddress,
      primaryEmail: firm?.primaryEmail,
      primaryPhone: firm?.primaryPhone,
      contacts: firm?.contacts,
      website: firm?.website,
      description: firm?.description,
      city: firm?.city,
      houseNumber: firm?.houseNumber,
      image: firm?.image,
      paymentTypes: firm?.paymentTypes.map(String),
    }),
    [firm]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  contactPerson: Yup.string(),
  country: Yup.string().required(),
  region: Yup.string(),
  city: Yup.string().required(),
  street: Yup.string(),
  houseNumber: Yup.string(),
  fullAddress: Yup.string(),
  primaryEmail: Yup.string().email().required(),
  primaryPhone: Yup.string()
    .test("validate-phone", "invalid", validatePhone)
    .required(),
  contacts: Yup.string(),
  website: Yup.string(),
  description: Yup.string(),
  image: Yup.string().nullable(),
  paymentTypes: Yup.array().required("Required"),
});

export function useUpdateFirmForm(
  formFragmentRef: useUpdateFirmForm_FirmFragment$key
) {
  const router = useRouter();
  return useMutationForm<
    UpdateFirmFields,
    useUpdateFirmForm_UpdateFirmMutation
  >(
    graphql`
      mutation useUpdateFirmForm_UpdateFirmMutation($input: UpdateFirmInput!) {
        updateFirm(input: $input) {
          firm {
            id
          }
        }
      }
    `,
    ({ image, ...values }) => ({
      input: {
        ...values,
        image,
      },
    }),
    {
      defaultValues: useDefaultValues(formFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.updateFirm?.firm?.id) {
          router.push("/my-firm");
        }
      },
    }
  );
}
