import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { useEditProfileForm } from "./components/useEditProfileForm";
import { EditProfileForm_AccountFragment$key } from "../../../artifacts/EditProfileForm_AccountFragment.graphql";

interface EditProfileFormProps {
  accountFragmentRef: EditProfileForm_AccountFragment$key;
}

const EditProfileForm = ({ accountFragmentRef }: EditProfileFormProps) => {
  const account = useFragment(
    graphql`
      fragment EditProfileForm_AccountFragment on Account {
        ...useEditProfileForm_AccountFragment
      }
    `,
    accountFragmentRef
  );
  const form = useEditProfileForm(account);

  return (
    <FormProvider {...form}>
      <form>content</form>
    </FormProvider>
  );
};

export default React.memo(EditProfileForm);
