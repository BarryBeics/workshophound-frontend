import { graphqlEndpoint } from "../config";
import { GraphQLClient } from "graphql-request";
import { READ_ALL_STRATEGIES_QUERY } from "../graph/strategies/queries";
import { CREATE_STRATEGY_MUTATION } from "../graph/strategies/mutations";

const client = new GraphQLClient(graphqlEndpoint);

export const readAllStrategies = async () => {
  try {
    const data = await client.request(READ_ALL_STRATEGIES_QUERY);
    return data.readAllStrategies;
  } catch (error) {
    console.error("Error fetching strategies:", error);
    throw error;
  }
};


export const createStrategy = async (variables) => {
  try {
    const data = await client.request(CREATE_STRATEGY_MUTATION, variables);
    return data;
  } catch (error) {
    console.error("Error creating strategy:", error);
    throw error;
  }
};