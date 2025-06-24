import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../config";
import { useAuth } from "../auth/AuthContext"; // optional: if you use token auth

const useGraphQLClient = () => {
  const { token } = useAuth() || {}; // optional if you store auth token

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const client = new GraphQLClient(graphqlEndpoint, {
    headers,
  });

  return client;
};

export default useGraphQLClient;
