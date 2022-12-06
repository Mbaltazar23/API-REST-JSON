//We require the json file named historical.json
const historicals = require("../data/historical.json");

//We instantiate an asynchronous variable where we get the data from the json file
const getHistoricals = async (req, res) => {
  res.json(historicals);
};

//We instantiate an asynchronous constant where we obtain the parameter to search for the symbol that is selected from the history, including whether or not it is in lowercase.
const getHistoricalSymbol = (req, res) => {
  const { symbol: symbolParam } = req.params;

  const symbolFound = historicals.historicalStockList.find(
    (symbol) => symbol.symbol.toLowerCase() === symbolParam.toLowerCase()
  );

  //Once the parameter is obtained and validated, we check if it is one that exists or not and we show the answer
  if (!symbolFound) {
    res.json({
      message: "Symbol not found",
    });
  }

  res.json(symbolFound);
};

//We export the modules to use these constants
module.exports = { getHistoricals, getHistoricalSymbol };
