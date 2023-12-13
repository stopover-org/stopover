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
  contractAddress: string | null;
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
      contractAddress: "",
    }),
    []
  );
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  contactPerson: Yup.string(),
  country: Yup.string().required("Required"),
  region: Yup.string(),
  city: Yup.string().required("Required"),
  street: Yup.string(),
  houseNumber: Yup.string(),
  fullAddress: Yup.string(),
  primaryEmail: Yup.string().email().required("Required"),
  primaryPhone: Yup.string()
    .test("validate-phone", "invalid", validatePhone)
    .required("Required"),
  contacts: Yup.string(),
  website: Yup.string(),
  description: Yup.string(),
  image: Yup.string(),
  paymentTypes: Yup.array().required("Required"),
  contractAddress: Yup.string().nullable(),
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
