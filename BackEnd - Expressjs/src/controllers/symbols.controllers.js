//We require the json file named symbols.json
const symbols = require("../data/symbols.json");

//We instantiate an asynchronous variable where we get the data from the json file
const getSymbols = async (req, res) => {
    res.json(symbols)
}

//We instantiate an asynchronous constant where we obtain the parameter to search for the symbol that is selected, including whether or not it is in lowercase.
const getSymbol = async (req, res) => {
    const { symbol: symbolParam } = req.params;
    const symbolFound = symbols.symbolsList.find(
      (symbol) => symbol.symbol.toLocaleLowerCase() === symbolParam.toLocaleLowerCase()
    );
  
    //Once the parameter is obtained and validated, we check if it is one that exists or not and we show the answer
    if(!symbolFound){
      res.json({
        message: 'Symbol not found'
      })
    }

    res.json(symbolFound)
}

//We export the modules to use these constants
module.exports = { getSymbols, getSymbol }