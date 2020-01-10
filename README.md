# Twitter Candlestick feed archives

**Collects timeseries data from Binance, combines it with Twitter chatter for the base token including tweet text and sentiment data points and archives it to Arweave permaweb.**

## What can this datafeed be used for

1. Data-Analytics on the time-sheet data

This feed can be used to run analytics and time-series AI on token candlesticks data mapped to twitter chatter during the period of the candlestick and used to create predictions on the dataset. 

2. Data visualization on the time-series data

It can also be used to create charts and graphs for technical analysis and visualization combining candestick data with tweet data during the same time period.

3. Generating trade signals 

Trade signals can be generated using either twitter chatter volume, text, sentiment or candlestick data.

4. Permanent archives of historical price data mapped with crypto twitter texts

Although some free and propreitaty APIs exist, they are not easily auditable and do not combine candlestick data with twitter data on a real-time basis. Furthermore they usually don't provide archives
beyond a certain time in the past. This feed can be used to query data starting from 01-10-2020 to potentially any time in the future. 

## Sample Queries

### Query all time-series for BTC

```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o"
        },
        expr2: {
          op: "equals",
          expr1: "symbol",
          expr2: "BTC"
        }
      })
```
**Sample Response**
```
[{"ticker":[[1578661260000,7887.67,7891.59,7880.25,7880.26,82.399311],
           [1578661320000,7880.26,7894.47,7879.35,7891.83,36.428714],
           [1578661380000,7891.84,7897.89,7891.79,7895.14,80.449343],
          ...
          ],
 "tweets":{"symbol":"BTC",
          "tweet_data":
          [{"text":"Top 10 Mentions on Twitter in the last hour - $BTC $ETH $XRP $LTC $BSV $EOS $BCH $LINK $USDT $VET \n\nMore on… https://t.co/NjtxdphUcC","id":1215634430049554400,"sentiment":{"score":2,"comparative":0.07692307692307693},"created_at":"2020-01-10T14:00:08.000Z"},
           {"text":"$BTC : +0.55%📈 7907$\nTop (last h):\n$CCA : +8.87%📈 58564st\n$ZB : +2.12%📈 2655st\n$LEO : +1.72%📈 11138st\n$BTM : +1.65%… https://t.co/NlS3rhYo6d","id":1215634421224743000,"sentiment":{"score":10,"comparative":0.3225806451612903},"created_at":"2020-01-10T14:00:06.000Z"},
           {"text":"Whales are buying $XMR\nLast Price: 0.00737100 (Binance)\nAlerts in last 7 days: 2\n\n#BTC #Binance #XMR https://t.co/j2kD0kjIbF","id":1215634411959595000,"sentiment":{"score":0,"comparative":0},"created_at":"2020-01-10T14:00:03.000Z"},
           ...
          ],
          "max_id":1215634430049554400},
          "start_time":1578661200008,
          "end_time":1578664800008}
```


### Query all time-series data for BTC on 01-09-2020
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o"
        },
        expr2: {
          op: "and",
          expr1: {
            op: "equals",
            expr1: "symbol",
            expr2: "BTC"
          },
          expr2: {
            op: "equals",
            expr1: "date",
            expr2: "01-09-2020"
          }
        }
      })
```
**Sample Response**


### Query the time-series data for BTC on 05-01-2020 between 00:00 and 01:00 hours
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o"
        },
        expr2: {
          op: "and",
          expr1: {
            op: "equals",
            expr1: "symbol",
            expr2: "BTC"
          },
          expr2: {
            op: "and",
            expr1: {
              op: "equals",
              expr1: "date",
              expr2: "01-09-2020"
            },
            expr2: {
              op: "equals",
              expr1: "hour",
              expr2: "01"
            }
          }
        }
      })
```
**Sample Response**


### Query the time-series data for all tokens 05-01-2020 between 00:00 and 01:00 hours
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o"
        },
        expr2: {
          op: "and",
          expr1: {
            op: "equals",
            expr1: "date",
            expr2: "05-01-2020"
          },
          expr2: {
            op: "equals",
            expr1: "hour",
            expr2: "01"
          }
        }
      })
```
**Sample Response**


### Query all time-series for all tokens which people are talking about on Twitter on 05-01-2020
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o"
        },
        expr2: {
          op: "and",
          expr1: {
            op: "equals",
            expr1: "date",
            expr2: "05-01-2020"
          },
          expr2: {
            op: "equals",
            expr1: "has_tweets",
            expr2: true
          }
        }
      })
```
**Sample Response**


_To view more information regarding how a ARQL query can be constructed check out src/models/TransactionQuery.js._
_For information regarding how the raw json can be retrieved and parsed from the ARQL response check out src/routes/query.js_

## Cron job 
The system aggregates the data at the start of every hour, during which it queries the candlestick data for the past hour and the twitter data for the past hour.

It further cleans and normalizes the data and archives it into Arweave permaweb.

Cron jobs will by default run on your system timezone

To switch to UTC, simply execute sudo dpkg-reconfigure tzdata, scroll to the bottom of the Continents list and select Etc or None of the above; in the second list, select UTC.

## Deployment wallet address

Wallet address for current live deployment is `h1pAFHXyRnrUsOI2m0g4g69IH-2cA4dPCsy45O3vq6o`

## Installation

Create src/wallet.json and paste your wallet apk file there

Create src/.env file and add the following environment variables

TWITTER_CONSUMER_KEY= Your_Twitter_Consumer_Key

TWITTER_CONSUMER_SECRET=Your_Twitter_Consumer_Secret

TWITTER_ACCESS_TOKEN_KEY=Your_Twitter_Access_Token_Key

TWITTER_ACCESS_TOKEN_SECRET=Your_Twitter_Access_Token_Secret

BINANCE_ACCESS_TOKEN_KEY=Your_Binance_Access_Token_Key

BINANCE_ACCESS_TOKEN_SECRET=Your_Binance_Access_Token_Secret

**Run the following commands**

```
cd src/
sudo npm install
npm start
```
