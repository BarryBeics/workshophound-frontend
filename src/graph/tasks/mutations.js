// graph/tasks/mutations.js
import { gql } from "graphql-request";

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      sop
      labels
      assignedTo
      dueDate
      status
    }
  }
`;

