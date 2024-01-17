import * as Yup from "yup";
import React from "react";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";

interface VerifyFirmFields {}

function useDefaultValues(): VerifyFirmFields {
  return React.useMemo(() => ({}), []);
}

const validationSchema = Yup.object().shape({});

export function useVerifyFirm() {
  return useMutationForm(
    graphql`
      mutation useVerifyFirm_VerifyFirmMutation($input: VerifyFirmInput!) {
        verifyFirm(input: $input) {
          firm {
            ...FirmSection_FirmFragment
          }
          errors
          notification
        }
      }
    `,
    () => ({ input: {} }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
    }
  );
}
