import { graphql } from "react-relay";

export default graphql`
  query query_VerifyCheckout_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        id
      }
    }
    booking(id: $id) {
      id
      account {
        id
      }
      event {
        title
      }
      ...VerifyBookingScene_BookingFragment
    }
  }
`;
