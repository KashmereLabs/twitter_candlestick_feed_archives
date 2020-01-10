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
    let hasTweets = "false";
    let avg_sentiment = null;
    let sentimentType = "";
    if (data.tweets.tweet_data && data.tweets.tweet_data.length > 0) {
      hasTweets = "true";
      avg_sentiment = 0;
      data.tweets.tweet_data.forEach(function(tweetItem) {
        avg_sentiment += tweetItem.sentiment.score;
      });
      if (avg_sentiment > 0) {
        sentimentType = "positive";
      } else {
        sentimentType = "negative";
      }
      avg_sentiment = avg_sentiment.toFixed(2);
    }

    dataTransaction.then(function(txResponse) {
      txResponse.addTag('Content-Type', 'text/json');
      txResponse.addTag('symbol', data.tweets.symbol);
      txResponse.addTag('start_time', data.start_time);
      txResponse.addTag('end_time', data.end_time);
      txResponse.addTag("hour", currentHour);
      txResponse.addTag("date", currentDate);
      txResponse.addTag("avg_sentiment", avg_sentiment);
      txResponse.addTag("has_tweets", hasTweets);
      txResponse.addTag("sentiment_type", sentimentType);
      return arweave.transactions.sign(txResponse, walletJWK).then(function(signedTransactionResponse) {
        return arweave.transactions.post(txResponse).then(function(postResponse) {
          console.log(`Added transaction for ${data.tweets.symbol}`);
        });
      });
    }).catch(function(err) {
      console.log(err);
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
