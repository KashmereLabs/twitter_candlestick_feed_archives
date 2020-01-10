var express = require('express');
var router = express.Router();

const TransactionQuery = require('../models/TransactionQuery');


router.get('/time_series', function(req, res) {
  TransactionQuery.queryDataBySymbol("BTC").then(function(dataResponse) {
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
});

router.get('/time_series_with_tweets', function(req, res) {
  TransactionQuery.queryDataForSymbolsWithTweets().then(function(dataResponse) {
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
});

router.get('/time_series_for_symbol_on_date', function(req, res) {
  TransactionQuery.queryDataBySymbolOnDate("BTC", "01-10-2020").then(function(dataResponse) {
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
})

module.exports = router;
