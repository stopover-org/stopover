import React from "react";
import { graphql } from "react-relay";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../lib/hooks/useMutationForm";

interface RemoveFirmFields {}

function useDefaultValues(): RemoveFirmFields {
  return React.useMemo(() => ({}), []);
}

const validationSchema = Yup.object().shape({});

export function useRemoveFirm() {
  return useMutationForm(
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
    }
  );
}
