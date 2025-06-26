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


export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      labels
      assignedTo
      dueDate
      deferDate
      department
      projectId
      duration
      createdAt
      updatedAt
    }
  }
`;



export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      status
    }
  }
`;


export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      title
      description
      labels
      assignedTo
      dueDate
      status
      sop
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;


export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;