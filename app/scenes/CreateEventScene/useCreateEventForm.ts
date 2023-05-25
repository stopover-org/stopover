import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../lib/hooks/useMutationForm";

interface CreateEventFields {
  title: string;
  description: string;
  houseNumber: string;
  street: string;
  city: string;
  country: string;
  region: string;
  fullAddress: string;
}

function useDefaultValues(): CreateEventFields {
  return React.useMemo(
    () => ({
      title: "",
      description: "",
      houseNumber: "",
      street: "",
      city: "",
      country: "",
      region: "",
      fullAddress: "",
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  houseNumber: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
  region: Yup.string(),
  fullAddress: Yup.string(),
});

export function useCreateEventForm() {
  return useMutationForm(
    graphql`
      mutation useCreateEventForm_CreateEventMutation(
        $input: CreateEventInput!
      ) {
        createEvent(input: $input) {
          event {
            id
          }
        }
      }
    `,
    ({ image, ...values }) => ({
      input: {
        ...values,
        base64Image: image,
      },
    }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
    }
  );
}
