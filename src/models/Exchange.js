var ccxt = require('ccxt');



module.exports = {
  getExchangeBaseSymbols: function() {
    const binance = getBinance();
    let marketTickerList = [];
    return binance.fetchMarkets().then(function(marketApiResponse) {
      marketApiResponse.forEach(function(listItem) {
        let baseSymbol = listItem.base;
        let quoteSymbol = listItem.quote;
        if (quoteSymbol === 'USDT' && marketTickerList.indexOf(baseSymbol) === -1) {
          marketTickerList.push(baseSymbol);
        }
      });
      let sortedMarketTickerList = marketTickerList.sort((a, b) => (
        a.localeCompare(b)
      ));
      return sortedMarketTickerList;
    })
  },

  fetchOLCV(symbol) {
    let pair = `${symbol}/USDT`;
    const binance = getBinance();
    return binance.fetchOHLCV(pair, '1m', undefined, 60).then(function(olcvDataResponse) {
      return olcvDataResponse;
    });
  },

  getTicketForSymbol(symbol) {

  }
}


function getBinance() {
  let binance = new ccxt.binance({
    apiKey: process.env.BINANCE_ACCESS_TOKEN_KEY,
    secret: process.env.BINANCE_ACCESS_TOKEN_SECRET,
  });
  return binance;
}
