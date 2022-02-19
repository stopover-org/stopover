import {gql} from "@apollo/client";

export const CURRENT_USER = gql`
  query currentUserQuery {
    currentUser {
      id
      account {
        id
        name
        primaryPhone
      }
    }
  }
`