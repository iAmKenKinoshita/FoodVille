import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import RecipeList from "./components/userRecipe/RecipeList"

function App() {
	const [hello, setHello] = useState("");

	// useEffect(() => {
	// 	fetch("/")
	// 		.then((res) => res.json())
	// 		.then((data) => console.log(data));
	// }, []);

	///fasdfasdfags

	return (
		<>
			<RecipeList/>


			{/* <button
				onClick={(e) => {
					fetch("/myrecipe/list")
						.then((res) => res.json())
						.then((data) => setHello(data.hello));
				}}
			>
				Click here
			</button> */}
			{hello}
			
		</>
	);
}

export default App;
