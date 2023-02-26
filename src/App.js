import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import Navbar from "./pages/NavBar";
import Homepage from "./pages/homepage/Homepage";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import RecipePage from "./pages/userRecipe/RecipePage";

import Footer from "./pages/Footer";
import Recipe from "./pages/userRecipe/Recipe";

import User from "./pages/UnusedPages/User";

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

	const [userRecipes, setUserRecipes] = useState(null);

	const userData = JSON.parse(localStorage.getItem("userData"));

	useEffect(() => {
		if (userData) {
			setUser(true);
		}
	}, [user]);

	//For search recipes

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<>
							<Navbar user={user} setUser={setUser} />
							<Homepage />
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					exact
					path="/signIn"
					element={
						<>
							<Navbar user={user} setUser={setUser} />
							<SignIn user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/signUp"
					element={
						<>
							<Navbar user={user} setUser={setUser} />
							<SignUp user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/recipe"
					element={
						<>
							<Navbar user={user} setUser={setUser} />
							<Recipe user={user} />
						</>
					}
				/>
				<Route
					exact
					path="/recipes"
					element={
						<>
							<Navbar user={user} setUser={setUser} />
							<RecipePage user={user} />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
