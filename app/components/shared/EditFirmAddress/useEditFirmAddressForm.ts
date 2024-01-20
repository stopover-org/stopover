import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";

import { useEditFirmAddressForm_AddressFragment$key } from "artifacts/useEditFirmAddressForm_AddressFragment.graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditFirmAddressForm_UpdateFirmMutation } from "artifacts/useEditFirmAddressForm_UpdateFirmMutation.graphql";
import useMutationForm from "lib/hooks/useMutationForm";

interface EditFirmAddressFormFields {
  fullAddress: string;
  country: string;
  region: string;
  city: string;
  street: string;
  houseNumber: string;
  latitude?: number;
  longitude?: number;
}

function useDefaultValues(
  addressFragmentRef: useEditFirmAddressForm_AddressFragment$key
): EditFirmAddressFormFields {
  const address = useFragment(
    graphql`
      fragment useEditFirmAddressForm_AddressFragment on Address {
        fullAddress
        country
        region
        city
        street
        houseNumber
        latitude
        longitude
      }
    `,
    addressFragmentRef
  );

  return React.useMemo(
    () => ({
      fullAddress: address?.fullAddress || "",
      country: address?.country || "",
      region: address?.region || "",
      city: address?.city || "",
      street: address?.street || "",
      houseNumber: address?.houseNumber || "",
      latitude: address?.latitude || undefined,
      longitude: address?.longitude || undefined,
    }),
    [address]
  );
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  region: Yup.string().nullable(),
  city: Yup.string().required("Required"),
  street: Yup.string().nullable(),
  houseNumber: Yup.string().nullable(),
});

export function useEditFirmAddressForm(
  addressFragmentRef: useEditFirmAddressForm_AddressFragment$key,
  onSuccess?: () => void
) {
  return useMutationForm<
    EditFirmAddressFormFields,
    useEditFirmAddressForm_UpdateFirmMutation
  >(
    graphql`
      mutation useEditFirmAddressForm_UpdateFirmMutation(
        $input: UpdateFirmInput!
      ) {
        updateFirm(input: $input) {
          firm {
            ...FirmSection_FirmFragment
            address {
              id
            }
          }
          notification
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(addressFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}
