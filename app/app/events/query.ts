import { graphql } from "react-relay";

export default graphql`
  query query_EventsPage_Query($filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...EventsScene_EventsPaginationFragment
    ...EventsScene_InterestsFragment
  }
`;
