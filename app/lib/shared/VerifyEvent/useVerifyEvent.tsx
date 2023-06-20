import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../hooks/useMutationForm";

interface VerifyEventFields {}

function useDefaultValues(): VerifyEventFields {}

const validationSchema = Yup.object().shape({});

export function useVerifyEvent() {
  return useMutationForm(
    graphql`
      mutation useVerifyEvent_VerifyEventMutation($input: VerifyEventInput!) {
        verifyEvent(input: $input) {
          event {
            id
            ...EventScene_EventFragment
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
