import { gql } from "graphql-request";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
      invitedBy
      role
      password
    }
  }
`;