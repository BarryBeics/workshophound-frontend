// Graph
import { gql } from "graphql-request";

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

