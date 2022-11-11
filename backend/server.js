const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config({ path: "../.env.local" });


//Routes
const indexRoutes = require("./routes/index");
const myRecipe = require("./routes/myrecipe")

app.use(express.static(path.join(__dirname, "../build")));

app.use(express.json());

//Get request
app.use(indexRoutes);
app.use("/myrecipe", myRecipe)

//Other Requests

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
