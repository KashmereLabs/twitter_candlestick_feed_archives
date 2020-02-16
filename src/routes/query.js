var express = require('express');
var router = express.Router();
const TransactionQuery = require('../models/TransactionQuery');

router.get('/time_series', function(req, res) {
  let { symbol } = req.query;
  if (!symbol) {
    symbol = "BTC";
  }
  TransactionQuery.queryDataBySymbol(symbol).then(function(dataResponse) {
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
  let { symbol, date } = req.query;
  if (!symbol) {
    symbol = "BTC";
  }
  if (!date) {
    date = "01-10-2020";
  }
  TransactionQuery.queryDataBySymbolOnDate(symbol, date).then(function(dataResponse) {
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
});


router.get('/time_series_for_symbol_on_date_hour', function(req, res) {
  let { symbol, date, hour } = req.query;
  if (!symbol) {
    symbol = "BTC";
  }
  if (!date) {
    date = "01-10-2020";
  }
  if (!hour) {
    hour = "00";
  }

  TransactionQuery.queryDataBySymbolOnDateAndHour(symbol, date, hour).then(function(dataResponse) {
    
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
  });
})


router.get(`/time_series_symbol_on_date_time`, function(req, res){
  const {date, symbol} = req.query;

  var easternTime = new Date(date).toLocaleString("en-US", {timeZone: "America/New_York"});
  
easternTime = new Date(easternTime);

    var dd = easternTime.getDate();
    if (dd < "10") {
      dd = "0" + dd;
    }
    var mm = easternTime.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    var yyyy = easternTime.getFullYear();
    const dateString = mm + '-' + dd + '-' + yyyy;
    let hour = easternTime.getHours();

  
  if (!symbol) {
    symbol = "BTC";
  }
  if (!dateString) {
    date = "01-10-2020";
  }
  if (!hour) {
    hour = "00";
  }
  
  console.log(dateString);
  console.log(hour);

  TransactionQuery.queryDataBySymbolOnDateAndHour(symbol, dateString, hour).then(function(dataResponse) {
    console.log(dataResponse);
    if (dataResponse && dataResponse.length > 0) {
      console.log(dataResponse);
    TransactionQuery.getDecodedTransactionData(dataResponse).then(function(decodedData) {
      res.send({ "message": "success", "data": decodedData });
    });
    } else {
      res.send({ "message": "success", "data": [] });
    }
  });

});

module.exports = router;
