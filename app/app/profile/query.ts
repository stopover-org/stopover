import { graphql } from "react-relay";

export default graphql`
  query query_Profile_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      status
      account {
        ...ProfileScene_AccountFragment
      }
    }
  }
`;
