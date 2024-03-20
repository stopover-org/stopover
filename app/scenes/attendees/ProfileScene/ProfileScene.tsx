import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { ProfileScene_AccountFragment$key } from "artifacts/ProfileScene_AccountFragment.graphql";
import EditProfileForm from "components/shared/EditProfileForm";
import Typography from "components/v2/Typography";

interface ProfileSceneProps {
  accountFragmentRef: ProfileScene_AccountFragment$key;
}

const ProfileScene = ({ accountFragmentRef }: ProfileSceneProps) => {
  const account = useFragment(
    graphql`
      fragment ProfileScene_AccountFragment on Account {
        ...EditProfileForm_AccountFragment
      }
    `,
    accountFragmentRef
  );
  const { t } = useTranslation();

  return (
    <>
      <Typography paddingLeft="10px" fontSize="32px">
        {t("layout.header.myProfile")}
      </Typography>
      <EditProfileForm accountFragmentRef={account} />
    </>
  );
};

export default React.memo(ProfileScene);
