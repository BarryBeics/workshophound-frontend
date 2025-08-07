// graph/avatar/mutations.js
import { gql } from "graphql-request";

export const CREATE_AVATAR_MUTATION = gql`
  mutation createAvatar($filename: String!) {
    createAvatar(input: { filename: $filename }) {
      id
      filename
    }
  }
`;

export const ASSIGN_AVATAR_MUTATION = gql`
  mutation assignAvatarToUser($email: String!, $filename: String!) {
    assignAvatarToUser(input: { email: $email, filename: $filename }) {
      avatar
    }
  }
`;

export const UNASSIGN_AVATAR_MUTATION = gql`
  mutation unassignAvatar($filename: String!) {
    unassignAvatar(input: { filename: $filename }) {
      success
    }
  }
`;

