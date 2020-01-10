# Twitter Candlestick feed archives

### Collects timeseries data from Binance and combines it with Twitter chatter regarding the base token including tweet text, sentiment and id data points.

## What can this datafeed be used for

1. Data-Analytics on the time-sheet data
This feed can be used to run analytics and time-series AI on token candlesticks data mapped to twitter chatter
relating to the token during the period of the candlestick. 


2. Data visualization on the time-series data
Create charts and graphs for technical analysis on the 

3. Generating trade signals 
Tradesignals can be generated using either twitter chatter volume, text, sentiment or candlestick data.

4. Permanent archives of historical price data mapped with crypto twitter texts
Although some free and propreitaty APIs exist, they are not easily auditable and do not combine candlestick data with twitter data on a real-time basis.



## Sample Queries

### Query all time-series for BTC
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
        },
        expr2: {
          op: "equals",
          expr1: "symbol",
          expr2: "BTC"
        }
      })
```

### Query all time-series data for BTC on 01-09-2020
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
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

### Query the time-series data for BTC on 05-01-2020 between 00:00 and 01:00 hours
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
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

### Query the time-series data for all tokens 05-01-2020 between 00:00 and 01:00 hours
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
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

### Query all time-series for all tokens which people are talking about on Twitter on 05-01-2020
```
arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
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


## Cron job 

Cron jobs will by default run on your system timezone

To switch to UTC, simply execute sudo dpkg-reconfigure tzdata, scroll to the bottom of the Continents list and select Etc or None of the above; in the second list, select UTC.

## Installation

Create src/wallet.json and paste your wallet apk file there

Create src/.env file and add the following environment variables

TWITTER_CONSUMER_KEY= Your_Twitter_Consumer_Key

TWITTER_CONSUMER_SECRET=Your_Twitter_Consumer_Secret

TWITTER_ACCESS_TOKEN_KEY=Your_Twitter_Access_Token_Key

TWITTER_ACCESS_TOKEN_SECRET=Your_Twitter_Access_Token_Secret

BINANCE_ACCESS_TOKEN_KEY=Your_Binance_Access_Token_Key

BINANCE_ACCESS_TOKEN_SECRET=Your_Binance_Access_Token_Secret

Run the following commands

```
cd src/
sudo npm install
npm start
```
