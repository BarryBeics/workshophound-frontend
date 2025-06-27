// Graph
import { gql, GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../../config";

const client = new GraphQLClient(graphqlEndpoint);


export const  READ_HISTORIC_PRICE_QUERY  = gql`
    query readPriceData($symbol: String!, $limit: Int!) {
        readHistoricPrice(symbol: $symbol, limit: $limit) {
        Pair {
            Symbol
            Price
            PercentageChange
        }
        Timestamp
        }
    }
    `;
