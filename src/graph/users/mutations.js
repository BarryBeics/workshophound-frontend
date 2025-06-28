// graph/users/mutations.js
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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;



export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;
