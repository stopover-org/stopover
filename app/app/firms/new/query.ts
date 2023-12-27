import { graphql } from "react-relay";

export default graphql`
  query query_NewFirm_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        id
        firm {
          id
        }
      }
    }
  }
`;
