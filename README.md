# Twitter Candlestick feed archives

## Collects timeseries data from Binance and combines it with Twitter chatter regarding the base token including tweet text, sentiment and id data points.



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


Cron jobs will by default run on your system timezone

To switch to UTC, simply execute sudo dpkg-reconfigure tzdata, scroll to the bottom of the Continents list and select Etc or None of the above; in the second list, select UTC.

