import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

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
			setCurrentView(<User setCurrentView={setCurrentView} />);
		}
	});

	return (
		<>
			<Container>
				<Navbar setCurrentView={setCurrentView} />
				{currentView}
			</Container>
		</>
	);
}

export default App;
