import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useUpdateFirmSettings_FirmFragment$key } from "artifacts/useUpdateFirmSettings_FirmFragment.graphql";
import { useUpdateFirmSettings_UpdateFirmMutation } from "artifacts/useUpdateFirmSettings_UpdateFirmMutation.graphql";

interface UpdateFirmSettingsFields {
  margin: string;
  availablePaymentMethods: string[];
}

function useDefaultValues(
  firmFragmentRef: useUpdateFirmSettings_FirmFragment$key
): UpdateFirmSettingsFields {
  const firm = useFragment<useUpdateFirmSettings_FirmFragment$key>(
    graphql`
      fragment useUpdateFirmSettings_FirmFragment on Firm {
        margin
        availablePaymentMethods
      }
    `,
    firmFragmentRef
  );

  return React.useMemo(
    () => ({
      margin: firm.margin!.toString(),
      availablePaymentMethods: firm.availablePaymentMethods as string[],
    }),
    [firm]
  );
}

const validationSchema = Yup.object().shape({
  margin: Yup.string().required("Required"),
  availablePaymentMethods: Yup.array().required("Required"),
});

export function useUpdateFirmSettings(
  firmFragmentRef: useUpdateFirmSettings_FirmFragment$key
) {
  return useMutationForm<
    UpdateFirmSettingsFields,
    useUpdateFirmSettings_UpdateFirmMutation
  >(
    graphql`
      mutation useUpdateFirmSettings_UpdateFirmMutation(
        $input: UpdateFirmInput!
      ) {
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
        margin: parseInt(values.margin, 10),
      },
    }),
    {
      defaultValues: useDefaultValues(firmFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
