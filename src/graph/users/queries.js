import { gql } from "graphql-request";

export const READ_USER_BY_EMAIL = gql`
  query ReadUserByEmail($email: String!) {
    readUserByEmail(email: $email) {
      id
      firstName
      lastName
      email
      mobileNumber
      verifiedEmail
      verifiedMobile
      role
      openToTrade
      binanceAPI
      preferredContactMethod
      notes
      invitedBy
      joinedBallot
      isPaidMember
      isDeleted
    }
  }
`;

export const READ_ADMINS = gql`
  query ReadUsersByRole($role: UserRole!) {
    readUsersByRole(role: $role) {
      id
      firstName
      lastName
    }
  }
`;


export const GET_ALL_USERS_QUERY = gql`
  query {
    readAllUsers {
      id
      firstName
      lastName
      email
      role
    }
  }
`;


