var express = require('express');
var router = express.Router();
var exchange = require('../models/exchange');
var twitter = require('../models/twitter');
var permaweb = require('../models/permaweb');
const TransactionQuery = require('../models/TransactionQuery');

let currentDataList = [];

/* GET home page. */
router.get('/available_trends', function(req, res, next) {

  exchange.getExchangeBaseSymbols().then(function(exchangeResponse) {
    var newDataList = [];
    let i = 0;
    let currentTimeStamp = new Date().getTime();

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

  res.send({ "message": "started query" });


});


router.get('/time_series', function(req, res) {
  TransactionQuery.queryDataBySymbol("BTC").then(function(dataResponse) {
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
});

module.exports = router;
