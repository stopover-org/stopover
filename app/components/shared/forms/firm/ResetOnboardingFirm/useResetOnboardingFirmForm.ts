import { graphql } from "react-relay";
import useMutationForm from "lib/hooks/useMutationForm";
import { useResetOnboardingFirmForm_PopulateDummyMutation } from "artifacts/useResetOnboardingFirmForm_PopulateDummyMutation.graphql";

export function useResetOnboardingFirmForm(onSuccess?: () => void) {
  return useMutationForm<{}, useResetOnboardingFirmForm_PopulateDummyMutation>(
    graphql`
      mutation useResetOnboardingFirmForm_PopulateDummyMutation(
        $input: PopulateDummyInput!
      ) {
        populateDummy(input: $input) {
          firm {
            id
          }
          errors
          notification
        }
      }
    `,
    () => ({
      input: {},
    }),
    {
      onCompleted: onSuccess,
    }
  );
}
