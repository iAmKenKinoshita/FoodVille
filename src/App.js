import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import Recipe from "./components/userRecipe/Recipe";
import Navbar from "./components/NavBar";
import Homepage from "./components/homepage/Homepage";

function App() {
	const [currentView, setCurrentView] = useState("home");

	useEffect(() => {
		if (currentView === "home") {
			setCurrentView(<Homepage />);
		} else if (currentView === "recipes") {
			setCurrentView(<Recipe />);
		}
	});

	return (
		<>
			<Navbar setCurrentView={setCurrentView} />
			<div>------</div>
			{currentView}
		</>
	);
}

export default App;
