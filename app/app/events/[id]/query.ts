import { graphql } from "react-relay";

export default graphql`
  query query_EventPage_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    event(id: $id) {
      id
      ...EventScene_EventFragment
    }
  }
`;
