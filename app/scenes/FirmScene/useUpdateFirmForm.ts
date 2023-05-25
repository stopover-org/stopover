import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../lib/hooks/useMutationForm";
import { useUpdateFirmForm_FirmFragment$key } from "./__generated__/useUpdateFirmForm_FirmFragment.graphql";

interface UpdateFirmFields {
  id: string;
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
}

function useDefaultValues(
  updateFirmFragmentRef: useUpdateFirmForm_FirmFragment$key
): UpdateFirmFields {
  const firm = useFragment(
    graphql`
      fragment useUpdateFirmForm_FirmFragment on Firm {
        id
        title
        contactPerson
        country
        region
        street
        fullAddress
        primaryEmail
        primaryPhone
        contacts
        website
        description
        city
        houseNumber
      }
    `,
    updateFirmFragmentRef
  );

  return React.useMemo(
    () => ({
      id: firm.id,
      title: firm.title,
      contactPerson: firm.contactPerson,
      country: firm.country,
      region: firm.region,
      street: firm.street,
      fullAddress: firm.fullAddress,
      primaryEmail: firm.primaryEmail,
      primaryPhone: firm.primaryPhone,
      contacts: firm.contacts,
      website: firm.website,
      description: firm.description,
      city: firm.city,
      houseNumber: firm.houseNumber,
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
  primaryPhone: Yup.string().required(),
  contacts: Yup.string(),
  website: Yup.string(),
  description: Yup.string(),
});

export function useUpdateFirmForm(
  formFragmentRef: useUpdateFirmForm_FirmFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useUpdateFirmForm_UpdateFirmMutation($input: UpdateFirmInput!) {
        updateFirm(input: $input) {
          firm {
            id
          }
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(formFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
