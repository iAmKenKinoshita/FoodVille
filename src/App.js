import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Navbar from "./components/NavBar";
import Homepage from "./components/homepage/Homepage";
import Recipe from "./components/userRecipe/Recipe";
import User from "./components/user/User";

function App() {
	const [currentView, setCurrentView] = useState("home");

	useEffect(() => {
		if (currentView === "home") {
			setCurrentView(<Homepage />);
		} else if (currentView === "recipes") {
			setCurrentView(<Recipe />);
		} else if (currentView === "user") {
			setCurrentView(<User />);
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
