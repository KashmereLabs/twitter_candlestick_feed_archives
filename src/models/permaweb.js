const Arweave = require('arweave/node');
const walletJWK = require('../wallet.json');
var moment = require('moment');

module.exports = {
  persistData: function(data) {

    let dataString = JSON.stringify(data);
    let arweave = getArweave();
    let dataTransaction = arweave.createTransaction({
      data: dataString
    }, walletJWK);
    var currentDate = moment(data.end_time).format("MM-DD-YYYY");
    var currentHour = moment(data.end_time).format("HH");
      
    dataTransaction.then(function(txResponse) {
      txResponse.addTag('Content-Type', 'text/json');
      txResponse.addTag('symbol', data.tweets.symbol);
      txResponse.addTag('start_time', data.start_time);
      txResponse.addTag('end_time', data.end_time);
      txResponse.addTag("hour", currentHour);
      txResponse.addTag("date", currentDate);
      txResponse.addTag("avg_sentiment", "");
      return arweave.transactions.sign(txResponse, walletJWK).then(function(signedTransactionResponse) {
        return arweave.transactions.post(txResponse).then(function(postResponse) {
          console.log(`Added transaction for ${data.tweets.symbol}`);
        });
      });
    }).catch(function(err) {
      console.log(err);
    });
  },

  queryData(symbol) {
    const arweave = getArweave();
    return arweave.wallets.jwkToAddress(walletJWK).then((address) => {
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
          expr2: symbol
        }
      }).then(function(walletTxnResponse) {
        console.log(walletTxnResponse);
        return walletTxnResponse;
      });
    });

  }
}

function getArweave() {
  const instance = Arweave.init({
    host: 'arweave.net',
    protocol: 'https'
  });
  return instance;
}
