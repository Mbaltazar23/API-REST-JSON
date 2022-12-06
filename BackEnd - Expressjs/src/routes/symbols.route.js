//We obtain the methods and the router to be able to create the routes
const { Router } = require("express");
const {getSymbols, getSymbol } = require("../controllers/symbols.controllers")

//We instantiate this constant variable to create the routes
const router = Router();

//We create the routes to connect with the constants of the controller called
router.get("/", getSymbols);
router.get("/:symbol", getSymbol);

//We export the router to use it in the index.js
module.exports = router;
