import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

//Pages
import Navbar from "./pages/NavBar";
import Homepage from "./pages/homepage/Homepage";
import Footer from "./pages/Footer";
import Recipe from "./pages/userRecipe/Recipe";
import User from "./pages/user/User";

function App() {
	// const [currentView, setCurrentView] = useState("home");

	// useEffect(() => {
	// 	if (currentView === "home") {
	// 		setCurrentView(<Homepage />);
	// 	} else if (currentView === "recipes") {
	// 		setCurrentView(<Recipe />);
	// 	} else if (currentView === "user") {
	// 		setCurrentView(<User setCurrentView={setCurrentView} />);
	// 	}
	// });

	//New code from here
	const [user, setUser] = useState(null);
	const [searchRecipes, setSearchRecipes] = useState(null);
	const [userRecipes, setUserRecipes] = useState(null);

	useEffect(() => {
		if (!user) {
			console.log("No user get");
		}
	});

	//For search recipes

	return (
		// <>
		// 	<Container>
		// 		<Navbar setCurrentView={setCurrentView} />
		// 		{currentView}
		// 	</Container>
		// </>

		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<>
							<Navbar />
							<Homepage />
							<Footer />
						</>
					}
				/>
				<Route />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
