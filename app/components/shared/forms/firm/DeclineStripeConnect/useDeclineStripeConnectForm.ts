import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useDeclineStripeConnectForm_StripeConnect$key } from "artifacts/useDeclineStripeConnectForm_StripeConnect.graphql";

interface DeclineStripeConnectFields {
  stripeConnectId: string;
}

function useDefaultValues(
  stripeConnectFragmentRef: useDeclineStripeConnectForm_StripeConnect$key
): DeclineStripeConnectFields {
  const stripeConnect = useFragment(
    graphql`
      fragment useDeclineStripeConnectForm_StripeConnect on StripeConnect {
        id
      }
    `,
    stripeConnectFragmentRef
  );

  return React.useMemo(
    () => ({ stripeConnectId: stripeConnect.id }),
    [stripeConnect]
  );
}

const validationSchema = Yup.object().shape({
  stripeConnectId: Yup.string().required(),
});

export function useDeclineStripeConnectForm(
  stripeConnectRef: useDeclineStripeConnectForm_StripeConnect$key,
  force: boolean = false
) {
  return useMutationForm(
    graphql`
      mutation useDeclineStripeConnectForm_DeclineStripeConnectFormMutation(
        $input: DeclineStripeConnectInput!
      ) {
        declineStripeConnect(input: $input) {
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
    ({ stripeConnectId }) => ({ input: { stripeConnectId, soft: !force } }),
    {
      defaultValues: useDefaultValues(stripeConnectRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
