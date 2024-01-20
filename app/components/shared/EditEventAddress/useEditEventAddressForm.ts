import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditEventAddressForm_UpdateFirmMutation } from "artifacts/useEditEventAddressForm_UpdateFirmMutation.graphql";
import useMutationForm from "lib/hooks/useMutationForm";
import { useEditEventAddressForm_EventFragment$key } from "artifacts/useEditEventAddressForm_EventFragment.graphql";

interface EditEventAddressFormFields {
  eventId: string;
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
  addressFragmentRef: useEditEventAddressForm_EventFragment$key
): EditEventAddressFormFields {
  const event = useFragment(
    graphql`
      fragment useEditEventAddressForm_EventFragment on Event {
        id
        address {
          fullAddress
          country
          region
          city
          street
          houseNumber
          latitude
          longitude
        }
      }
    `,
    addressFragmentRef
  );

  return React.useMemo(
    () => ({
      eventId: event.id,
      fullAddress: event?.address?.fullAddress || "",
      country: event?.address?.country || "",
      region: event?.address?.region || "",
      city: event?.address?.city || "",
      street: event?.address?.street || "",
      houseNumber: event?.address?.houseNumber || "",
      latitude: event?.address?.latitude || undefined,
      longitude: event?.address?.longitude || undefined,
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  region: Yup.string().nullable(),
  city: Yup.string().required("Required"),
  street: Yup.string().nullable(),
  houseNumber: Yup.string().nullable(),
});

export function useEditEventAddressForm(
  eventFragmentRef: useEditEventAddressForm_EventFragment$key,
  onSuccess?: () => void
) {
  return useMutationForm<
    EditEventAddressFormFields,
    useEditEventAddressForm_UpdateFirmMutation
  >(
    graphql`
      mutation useEditEventAddressForm_UpdateFirmMutation(
        $input: UpdateEventInput!
      ) {
        updateEvent(input: $input) {
          event {
            ...GeneralInformation_EventFragment
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
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}
