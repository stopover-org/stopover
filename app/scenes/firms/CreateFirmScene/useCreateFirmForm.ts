import { graphql } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useCreateFirmForm_CreateFirmMutation } from "../../../artifacts/useCreateFirmForm_CreateFirmMutation.graphql";

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
  contractAddress: string;
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
  country: Yup.string().required("Required"),
  primaryEmail: Yup.string().email().required("Required"),
  image: Yup.string().nullable(),
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
    (values) => ({
      input: {
        ...values,
      },
    }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.createFirm?.firm?.id) {
          router.replace("/my-firm/dashboard");
        }
      },
    }
  );
}
