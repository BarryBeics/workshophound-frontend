// import React, { useEffect, useState } from "react";
// import { CircularProgress } from "@mui/material";
// import { GraphQLClient, gql } from "graphql-request";
// import MarketStatsTable from "./MarketStatsTable";
// import { graphqlEndpoint } from "../config";

// const client = new GraphQLClient(graphqlEndpoint);

// const READ_SYMBOLS = gql`query { readAvailableSymbols }`;

// const MARKET_STATS_QUERY = gql`
//   query readTickerStatsBySymbol($symbol: String!, $limit: Int!) {
//     readTickerStatsBySymbol($symbol: String!, $limit: Int!)  {
//       Symbol
//       PriceChange
//       PriceChangePct
//       QuoteVolume
//       Volume
//       TradeCount
//       HighPrice
//       LowPrice
//       LastPrice
//       LiquidityEstimate
//     }
//   }
// `;

// const MarketStatsContainer = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const symbolsRes = await client.request(READ_SYMBOLS);
//         console.log(symbolsRes)
//         const symbols = symbolsRes.readAvailableSymbols.slice(0, 100);

//         const allStats = await Promise.all(
//           symbols.map(async (symbol) => {
//             try {
//               const data = await client.request(MARKET_STATS_QUERY, {
//                 symbol,
//                 limit: 1,
//               });
//               const s = data.readTickerStatsBySymbol?.[0];
//               return s ? { id: symbol, ...s } : null;
//             } catch {
//               return null;
//             }
//           })
//         );
//         console.log("hello")

//         setRows(allStats.filter(Boolean));
//       } catch (err) {
//         console.error("Failed to load market stats", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading) return <CircularProgress />;
//   return <MarketStatsTable rows={rows} />;
// };

// export default MarketStatsContainer;
