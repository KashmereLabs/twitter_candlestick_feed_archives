const Arweave = require('arweave/node');
const walletJWK = require('../wallet.json');

module.exports = {
  getDecodedTransactionData: function(dataList) {
    const arweave = getArweave();
    let dataPromiseList = dataList.map(function(dataItem) {
      return arweave.transactions.getData(dataItem, { decode: true, string: true });
    });
    return Promise.all(dataPromiseList).then(function(promiseDataResponse) {
      return promiseDataResponse.map(function(dataString) {
        return JSON.parse(dataString);
      });
    });
  },

  queryDataBySymbol(symbol) {
    const arweave = getArweave();
    return arweave.wallets.jwkToAddress(walletJWK).then((address) => {
      return arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
        },
        expr2: {
          op: "equals",
          expr1: "symbol",
          expr2: symbol
        }
      }).then(function(walletTxnResponse) {
        return walletTxnResponse;
      });
    });
  },

  queryDataBySymbolOnDate(symbol, date) {
    const arweave = getArweave();
    return arweave.wallets.jwkToAddress(walletJWK).then((address) => {
      return arweave.arql({
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
            expr2: symbol
          },
          expr2: {
            op: "equals",
            expr1: "date",
            expr2: date
          }
        }
      }).then(function(walletTxnResponse) {
        return walletTxnResponse;
      }).catch(function(err) {
        console.log(err);
      });
    });
  },

  queryDataBySymbolOnDateAndHour(symbol, date, hour) {
    const arweave = getArweave();
    return arweave.wallets.jwkToAddress(walletJWK).then((address) => {
      return arweave.arql({
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
            expr2: symbol
          },
          expr2: {
            op: "and",
            expr1: {
              op: "equals",
              expr1: "date",
              expr2: date
            },
            expr2: {
              op: "equals",
              expr1: "hour",
              expr2: hour
            }
          }
        }
      }).then(function(walletTxnResponse) {
        return walletTxnResponse;
      });
    });
  },

  queryDataForSymbolsWithTweets() {
    const arweave = getArweave();
    return arweave.wallets.jwkToAddress(walletJWK).then((address) => {
      return arweave.arql({
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address
        },
        expr2: {
          op: "equals",
          expr1: "has_tweets",
          expr2: "true"
        }
      }).then(function(walletTxnResponse) {
        return walletTxnResponse;
      });
    });
  },



}

function getArweave() {
  const instance = Arweave.init({
    host: 'arweave.net',
    protocol: 'https'
  });
  return instance;
}
