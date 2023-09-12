import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/_main.scss";

//Pages
import Navbar from "./pages/NavBar/NavBar";
import Homepage from "./pages/homepage/Homepage";
import SearchPage from "./pages/homepage/SearchPage";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import RecipePage from "./pages/userRecipe/RecipePage";
import PageNotFound from "./pages/PageNotFound";

//Test Page

function App() {
	//New code from here
	const [user, setUser] = useState(null);

	const [searchRecipes, setSearchRecipes] = useState([]);
	const [featuredRecipes, setFeaturedRecipes] = useState([]);

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);

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
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
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
						</div>
					}
				/>
				<Route
					exact
					path="/search/:keyword"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
							/>
							<SearchPage
								user={user}
								userId={userId}
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
								loading={loading}
								setLoading={setLoading}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
							{/* <Footer /> */}
						</div>
					}
				/>
				<Route
					exact
					path="/search-by-tag/:tag"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
							/>
							<SearchPage
								user={user}
								userId={userId}
								searchRecipes={searchRecipes}
								setSearchRecipes={setSearchRecipes}
								loading={loading}
								setLoading={setLoading}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
							{/* <Footer /> */}
						</div>
					}
				/>

				<Route
					exact
					path="/signIn"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
							/>
							<SignIn user={user} setUser={setUser} />
						</div>
					}
				/>
				<Route
					exact
					path="/signUp"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
							/>
							<SignUp user={user} setUser={setUser} />
						</div>
					}
				/>
				<Route
					exact
					path="/savedrecipes"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
								setLoading={setLoading}
								setCurrentPage={setCurrentPage}
							/>
							<RecipePage user={user} />
						</div>
					}
				/>
				<Route
					path="*"
					element={
						<div className="min-h-screen bg-gray-100">
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
							<PageNotFound />
						</div>
					}
				/>
				<Route
					exact
					path="/test"
					element={
						<>
							<Navbar
								user={user}
								setUser={setUser}
								userName={userName}
								setSearchRecipes={setSearchRecipes}
							/>
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
