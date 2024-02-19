import { graphql } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import useMutationForm from "lib/hooks/useMutationForm";
import { useCreateFirmForm_CreateFirmMutation } from "artifacts/useCreateFirmForm_CreateFirmMutation.graphql";

export interface CreateFirmFields {
  title: string;
  primaryEmail: string;
  paymentTypes: string[];
}

function useDefaultValues(): CreateFirmFields {
  return React.useMemo(
    () => ({
      title: "",
      primaryEmail: "",
      paymentTypes: ["stripe", "cash"],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  primaryEmail: Yup.string().email().required("Required"),
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
            ...FirmScene_FirmFragment
            ...FirmScene_CurrentFirmFragment
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
