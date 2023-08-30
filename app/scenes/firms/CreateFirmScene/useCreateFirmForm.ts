import { graphql } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useCreateFirmForm_CreateFirmMutation } from "../../../artifacts/useCreateFirmForm_CreateFirmMutation.graphql";
import { validatePhone } from "../../../lib/utils/validations";

export interface CreateFirmFields {
  title: string;
  contactPerson: string;
  country: string;
  region: string;
  city: string;
  street: string;
  houseNumber: string;
  fullAddress: string;
  primaryEmail: string;
  primaryPhone: string;
  contacts: string;
  website: string;
  description: string;
  image: string;
  paymentTypes: string[];
}

function useDefaultValues(): CreateFirmFields {
  return React.useMemo(
    () => ({
      title: "",
      contactPerson: "",
      country: "",
      region: "",
      city: "",
      street: "",
      houseNumber: "",
      fullAddress: "",
      primaryEmail: "",
      primaryPhone: "",
      contacts: "",
      website: "",
      description: "",
      image: "",
      paymentTypes: ["stripe", "cash"],
    }),
    []
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
  image: Yup.string(),
  paymentTypes: Yup.array().required("Required"),
});

export function useCreateFirmForm() {
  const router = useRouter();
  return useMutationForm<
    CreateFirmFields,
    useCreateFirmForm_CreateFirmMutation
  >(
    graphql`
      mutation useCreateFirmForm_CreateFirmMutation($input: CreateFirmInput!) {
        createFirm(input: $input) {
          firm {
            id
          }
          notification
          errors
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
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.createFirm?.firm?.id) {
          router.replace("/my-firm");
        }
      },
    }
  );
}
