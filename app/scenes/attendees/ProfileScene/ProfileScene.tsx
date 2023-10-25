import React from "react"
import { graphql, useFragment } from "react-relay"
import { ProfileScene_AccountFragment$key } from "../../../artifacts/ProfileScene_AccountFragment.graphql"
import EditProfileForm from "../../../components/shared/EditProfileForm"

interface ProfileSceneProps {
	accountFragmentRef: ProfileScene_AccountFragment$key
}

const ProfileScene = ({accountFragmentRef}: ProfileSceneProps) => {
	const account = useFragment(graphql`
		fragment ProfileScene_AccountFragment on Account {
			...EditProfileForm_AccountFragment
		}
	`, accountFragmentRef)

	return (
		<EditProfileForm accountFragmentRef={account} />
	)
}

export default React.memo(ProfileScene)