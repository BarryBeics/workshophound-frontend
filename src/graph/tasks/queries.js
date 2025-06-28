// graph/tasks/queries.js
import { gql } from "graphql-request";

export const GET_SOP_PROJECT_IDS = gql`
  query {
    readProjectsFilter(filter: { sop: true }) {
      id
    }
  }
`;


export const READ_PROJECTS_FILTER_QUERY = gql`
  query ReadProjectsFilter($sop: Boolean!) {
    readProjectsFilter(filter: { sop: $sop }) {
      id
      title
      description
      labels
      assignedTo
      dueDate
      status
      tasks {
        id
      }
    }
  }
`;  


export const READ_ALL_TASKS_QUERY = gql`
  query {
    readAllTasks {
      id
    title
    status
    labels
    assignedTo
    department
    duration
    projectId
    }
  }
`;


export const READ_PROJECT_QUERY = gql`
  query ReadSingleProjectById($id: ID!) {
    readSingleProjectById(id: $id) {
      id
    title
    sop
    description
    labels
    assignedTo
    dueDate
    status
    createdAt
    updatedAt
    tasks {
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
  }
`;

