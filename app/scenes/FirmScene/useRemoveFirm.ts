import React from "react";
import { graphql } from "react-relay";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useMutationForm from "../../lib/hooks/useMutationForm";
import { useRemoveFirm_RemoveFirmMutation } from "./__generated__/useRemoveFirm_RemoveFirmMutation.graphql";

interface RemoveFirmFields {}

function useDefaultValues(): RemoveFirmFields {
  return React.useMemo(() => ({}), []);
}

const validationSchema = Yup.object().shape({});

export function useRemoveFirm() {
  const router = useRouter();
  return useMutationForm<RemoveFirmFields, useRemoveFirm_RemoveFirmMutation>(
    graphql`
      mutation useRemoveFirm_RemoveFirmMutation($input: RemoveFirmInput!) {
        removeFirm(input: $input) {
          firm {
            id
          }
        }
      }
    `,
    () => ({ input: {} }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.removeFirm?.firm?.id) {
          router.replace("/events");
        }
      },
    }
  );
}
