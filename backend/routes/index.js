const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4a0f4158b8msh4c2e002dd23f7b9p15ff75jsn13b73e5788bb",
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
	},
};

router.get("/", indexController.getIndex);

router.get("/hello", (req, res) => {
	fetch(
		"https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",
		options
	)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));

	console.log("HELLO");
	res.send([{ Hello: "hello" }]);
});

module.exports = router;
