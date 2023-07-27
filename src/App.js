import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/_main.scss";

//Pages
import Navbar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer";
import Homepage from "./pages/homepage/Homepage";
import SearchPage from "./pages/homepage/SearchPage";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import RecipePage from "./pages/userRecipe/RecipePage";

function App() {
	//New code from here
	const [user, setUser] = useState(null);

	const [searchRecipes, setSearchRecipes] = useState([]);
	const [featuredRecipes, setFeaturedRecipes] = useState([]);

	const userData = JSON.parse(localStorage.getItem("userData"));
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (userData) {
			setUser(true);
			setUserId(userData[0].userId);
			setUserName(userData[0].userName);
		}
	}, [user]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<Homepage
								user={user}
								userId={userId}
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
								featuredRecipes={featuredRecipes}
								setFeaturedRecipes={setFeaturedRecipes}
							/>
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					exact
					path="/search/:keyword"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<SearchPage
								user={user}
								userId={userId}
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
							/>
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					exact
					path="/search-by-tag/:tag"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<SearchPage
								user={user}
								userId={userId}
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
							/>
							{/* <Footer /> */}
						</>
					}
				/>

				<Route
					exact
					path="/signIn"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<SignIn user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/signUp"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<SignUp user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/savedrecipes"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<RecipePage user={user} />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
