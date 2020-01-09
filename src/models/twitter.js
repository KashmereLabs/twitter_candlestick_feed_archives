var Twitter = require('twitter');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

module.exports = {
  getTweetsForSymbol: function(symbol, maxId, anHourAgoTimeStamp) {
    const client = getTwitterClient();
    return new Promise((resolve, reject) => {
      let tweetQuery = "%23" + symbol + "%20OR%20" + "%24" + symbol + "%23" + symbol.toLowerCase() + "%20OR%20" + "%24" + symbol.toLowerCase();



      let queryParams = { q: tweetQuery, lang: 'en', result_type: 'recent' };
      if (maxId !== -1) {
        queryParams.since_id = maxId;
      }
      client.get('search/tweets', queryParams, function(error, tweets, response) {
        if (tweets) {
          console.log("***");
          console.log(tweets);
          let max_id = -1;
          if (tweets.search_metadata && tweets.search_metadata.max_id) {
            max_id = tweets.search_metadata.max_id;
          }

          const statusList = tweets.statuses;
          let tweetDataList = [];
          if (statusList) {
            console.log(symbol);
            console.log(statusList);

            tweetDataList = extractTweetData(statusList, anHourAgoTimeStamp);
          }
          resolve({ "symbol": symbol, "tweet_data": tweetDataList, "max_id": max_id });
        }
        else {
          reject(error);
        }
      });

    });
  }
}


function getTwitterClient() {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  return client;
}



function extractTweetData(tweetList, tsFilter) {

  let tokenTweetData = tweetList.map(function(tweet) {
    let tweetCreatedAtDate = new Date(tweet.created_at);
    let tweetCreatedTimeStamp = tweetCreatedAtDate.getTime();
    if (tweet.text && tweetCreatedTimeStamp >= tsFilter) {
      return ({ "text": tweet.text, "id": tweet.id, "sentiment": extractTweetSentiment(tweet.text), "created_at": tweetCreatedAtDate })
    }
    else {
      return null;
    }
  }).filter(Boolean);
  return tokenTweetData;
}

function extractTweetSentiment(tweetText) {
  let sentimentData = sentiment.analyze(tweetText);

  if (sentiment) {
    return { "score": sentimentData.score, "comparative": sentimentData.comparative };
  }
  else {
    return null;
  }
}
