import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import useMutationForm from "lib/hooks/useMutationForm";
import { useUpdateFirmForm_FirmFragment$key } from "artifacts/useUpdateFirmForm_FirmFragment.graphql";
import { useUpdateFirmForm_UpdateFirmMutation } from "artifacts/useUpdateFirmForm_UpdateFirmMutation.graphql";
import { validatePhone } from "lib/utils/validations";

interface UpdateFirmFields {
  title: string;
  contactPerson: string | null;
  primaryEmail: string;
  primaryPhone: string | null;
  contacts: string | null;
  website: string | null;
  description: string | null;
  image: string | null;
  paymentTypes: string[];
  contractAddress: string | null;
}

function useDefaultValues(
  updateFirmFragmentRef: useUpdateFirmForm_FirmFragment$key
): UpdateFirmFields {
  const firm = useFragment<useUpdateFirmForm_FirmFragment$key>(
    graphql`
      fragment useUpdateFirmForm_FirmFragment on Firm {
        contactPerson
        contacts
        description
        image
        paymentTypes
        primaryEmail
        primaryPhone
        title
        website
        contractAddress
      }
    `,
    updateFirmFragmentRef
  );

  return React.useMemo(
    () => ({
      title: firm?.title || "",
      contactPerson: firm?.contactPerson || null,
      primaryEmail: firm?.primaryEmail || "",
      primaryPhone: firm?.primaryPhone || null,
      contacts: firm?.contacts || "",
      website: firm?.website || null,
      description: firm?.description || null,
      image: firm?.image || null,
      paymentTypes: firm?.paymentTypes.map(String) || [],
      contractAddress: firm?.contractAddress || null,
    }),
    [firm]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  contactPerson: Yup.string().nullable(),
  primaryEmail: Yup.string().email().required("Required"),
  primaryPhone: Yup.string()
    .test("validate-phone", "Invalid", validatePhone)
    .required("Required"),
  contacts: Yup.string().nullable(),
  website: Yup.string().nullable(),
  description: Yup.string().nullable(),
  image: Yup.string().nullable(),
  paymentTypes: Yup.array().required("Required"),
  contractAddress: Yup.string().nullable(),
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
