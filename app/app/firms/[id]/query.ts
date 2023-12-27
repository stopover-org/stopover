import { graphql } from "react-relay";

export default graphql`
  query query_AttendeesFirm_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    firm(id: $id) {
      id
      title
      ...FirmScene_CurrentFirmFragment
    }
  }
`;
