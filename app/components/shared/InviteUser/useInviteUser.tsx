import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";

interface InviteUserFields {
  email: string;
}

function useDefaultValues(): InviteUserFields {
  return React.useMemo(() => ({ email: "" }), []);
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export function useInviteUser(onComplete?: () => void) {
  return useMutationForm(
    graphql`
      mutation useInviteUser_InviteUserMutation($input: InviteUserInput!) {
        inviteUser(input: $input) {
          account {
            user {
              status
            }
          }
          errors
          notification
        }
      }
    `,
    ({ email }) => ({ input: { email: email.toLowerCase() } }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted: (result: any) => {
        if (result.inviteUser.account) {
          onComplete();
        }
      },
    }
  );
}
