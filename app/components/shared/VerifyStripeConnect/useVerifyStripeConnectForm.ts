import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useVerifyStripeConnectForm_StripeConnect$key } from "../../../artifacts/useVerifyStripeConnectForm_StripeConnect.graphql";

interface VerifyStripeConnectFields {
  stripeConnectId: string;
}

function useDefaultValues(
  optionFragmentRef: useVerifyStripeConnectForm_StripeConnect$key
): VerifyStripeConnectFields {
  const stripeConnect = useFragment(
    graphql`
      fragment useVerifyStripeConnectForm_StripeConnect on StripeConnect {
        id
      }
    `,
    optionFragmentRef
  );

  return React.useMemo(
    () => ({ stripeConnectId: stripeConnect.id }),
    [stripeConnect]
  );
}

const validationSchema = Yup.object().shape({
  stripeConnectId: Yup.string().required(),
});

export function useVerifyStripeConnectForm(
  stripeConnectRef: useVerifyStripeConnectForm_StripeConnect$key
) {
  return useMutationForm(
    graphql`
      mutation useVerifyStripeConnectForm_VerifyStripeConnectFormMutation(
        $input: VerifyStripeConnectInput!
      ) {
        verifyStripeConnect(input: $input) {
          stripeConnect {
            firm {
              ...stripeConnects_FirmFragment
            }
          }
          notification
          errors
        }
      }
    `,
    ({ stripeConnectId }) => ({ input: { stripeConnectId } }),
    {
      defaultValues: useDefaultValues(stripeConnectRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
