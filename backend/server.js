const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config({ path: "../.env.local" });

//Routes
const indexRoutes = require("./routes/homepage");
const userRecipeRoutes = require("./routes/userRecipe");
const userRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname, "../build")));

app.use(express.json());

app.use("/home", indexRoutes);
app.use("/userRecipe", userRecipeRoutes);
app.use("/user", userRoutes);

//Other Requests

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
