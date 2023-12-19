import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useConnectStripeForm_CreateStripeAccountMutation } from "../../../artifacts/useConnectStripeForm_CreateStripeAccountMutation.graphql";

interface ConnectStripeFields {}

function useDefaultValues(): ConnectStripeFields {
  return React.useMemo(() => ({}), []);
}

const validationSchema = Yup.object().shape({});

export function useConnectStripeForm() {
  const router = useRouter();
  return useMutationForm<
    ConnectStripeFields,
    useConnectStripeForm_CreateStripeAccountMutation
  >(
    graphql`
      mutation useConnectStripeForm_CreateStripeAccountMutation(
        $input: CreateStripeAccountInput!
      ) {
        createStripeAccount(input: $input) {
          setupAccountUrl
          notification
          errors
        }
      }
    `,
    () => ({ input: {} }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.createStripeAccount?.setupAccountUrl) {
          router.push(result.createStripeAccount?.setupAccountUrl);
        }
      },
    }
  );
}
