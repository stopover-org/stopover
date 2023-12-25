import { graphql } from "react-relay";

export default graphql`
  query query_SignInPage_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      status
    }
  }
`;
