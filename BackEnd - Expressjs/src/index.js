//We instantiate the express, morgan and cors objects to be able to make a correct connection when installing the dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//We instantiate the express method
const app = express();

//settings of port 9090
app.set("port", process.env.PORT || 9090);
app.set("json spaces", 2);

//middlewares: Will allow us to exchange information
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Paths to routes of routes and to run it enter the command : npm run dev
app.use("/api/symbols", require("./routes/symbols.route"));
app.use("/api/historical", require("./routes/historical.route"));

//Start the server
app.listen(9090, () => {
  console.log(`Server an port ${app.get("port")}`);
});
