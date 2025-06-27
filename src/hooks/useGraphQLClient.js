import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../config";
import { useAuth } from "../auth/AuthContext";

const useGraphQLClient = () => {
  const { token } = useAuth() || {};

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const client = useMemo(() => {
    return new GraphQLClient(graphqlEndpoint, { headers });
  }, [token]); // only re-creates if token changes

  return client;
};

export default useGraphQLClient;
