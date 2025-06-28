// graph/strategies/queries.js
import { gql } from "graphql-request";

export const READ_ALL_STRATEGIES_QUERY = gql`
  query {
    readAllStrategies {
      BotInstanceName
      CreatedOn
      TakeProfitPercentage
      StopLossPercentage
      IncrementsATR
      ATRtollerance
      MovingAveMomentum
      TradeDuration
      LongSMADuration
      ShortSMADuration
      WINCounter
      LOSSCounter
      TIMEOUTGainCounter
      TIMEOUTLossCounter
      NetLossCounter
      AccountBalance
    }
  }
`;
