var schedule = require('node-schedule');
var exchange = require('../models/Exchange');
var twitter = require('../models/Twitter');
var permaweb = require('../models/PermaWeb');

var currentDataList = [];

module.exports = {
  startApiQuery: function() {

    var j = schedule.scheduleJob('0 * * * *', function() {
      let currentTimeStamp = new Date().getTime();

      exchange.getExchangeBaseSymbols().then(function(exchangeResponse) {
        var newDataList = [];
        let i = 0;


        const HOUR = 1000 * 60 * 60;
        const anHourAgoTimeStamp = currentTimeStamp - HOUR;

        function getTweetTrends() {

          setTimeout(function() {
            const currentSymbol = exchangeResponse[i];
            let previewSymbolIndex = currentDataList.find((cd) => (cd.symbol === currentSymbol));

            let prevMaxId = -1;
            if (previewSymbolIndex) {
              prevMaxId = previewSymbolIndex.max_id;
            }
            twitter.getTweetsForSymbol(currentSymbol, prevMaxId, currentTimeStamp, anHourAgoTimeStamp).then(function(tweetResponse) {

              exchange.fetchOLCV(currentSymbol).then(function(olcvResponse) {
                let dataResponse = Object.assign({}, { "ticker": olcvResponse }, { "tweets": tweetResponse }, { 'start_time': anHourAgoTimeStamp, 'end_time': currentTimeStamp });

                let tickerEnd = { "symbol": currentSymbol, "max_id": tweetResponse.max_id };
                newDataList.push(tickerEnd);

                if (i === exchangeResponse.length - 1) {
                  currentDataList = newDataList;
                }
                permaweb.persistData(dataResponse);
              });
            });
            i++;
            if (i < exchangeResponse.length) {
              getTweetTrends();
            }
            else {
              console.log("finished current query cycle");
            }
          }, 1000);
        }
        getTweetTrends();
      });
    });
  }
}
