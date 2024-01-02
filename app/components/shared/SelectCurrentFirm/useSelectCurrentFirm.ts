import React from "react";
import { graphql, useFragment } from "react-relay";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useSelectCurrentFirm_AccountFragment$key } from "../../../artifacts/useSelectCurrentFirm_AccountFragment.graphql";

interface SelectCurrentFirmFields {
  firmId?: string;
}

function useDefaultValues(
  accountFragmentRef: useSelectCurrentFirm_AccountFragment$key
): SelectCurrentFirmFields {
  const account = useFragment(
    graphql`
      fragment useSelectCurrentFirm_AccountFragment on Account {
        firm {
          id
        }
      }
    `,
    accountFragmentRef
  );

  return React.useMemo(() => ({ firmId: account?.firm?.id }), [account]);
}

const validationSchema = Yup.object().shape({
  firmId: Yup.string().required(),
});

export function useSelectCurrentFirm(
  accountFragmentRef: useSelectCurrentFirm_AccountFragment$key
) {
  const router = useRouter();
  return useMutationForm(
    graphql`
      mutation useSelectCurrentFirm_SetCurrentFirmMutation(
        $input: SetCurrentFirmInput!
      ) {
        setCurrentFirm(input: $input) {
          account {
            firm {
              id
              title
            }
          }
          errors
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(accountFragmentRef),
      resolver: yupResolver(validationSchema),
      autosave: true,
      onCompleted() {
        router.refresh();
      },
    }
  );
}
