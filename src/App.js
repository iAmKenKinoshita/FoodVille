import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import Navbar from "./pages/NavBar";
import CatBar from "./pages/CatBar";
import Homepage from "./pages/homepage/Homepage";
import Homepage2 from "./pages/homepage/Homepage2";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import RecipePage from "./pages/userRecipe/RecipePage";

import Footer from "./pages/Footer";

function App() {
	//New code from here
	const [user, setUser] = useState(null);

	const [searchRecipes, setSearchRecipes] = useState([]);

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
							<Navbar user={user} setUser={setUser} userName={userName} />
							<Homepage2
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
							<Navbar user={user} setUser={setUser} userName={userName} />
							<SignIn user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/signUp"
					element={
						<>
							<Navbar user={user} setUser={setUser} userName={userName} />
							<SignUp user={user} setUser={setUser} />
						</>
					}
				/>
				<Route
					exact
					path="/recipes"
					element={
						<>
							<Navbar user={user} setUser={setUser} userName={userName} />
							<RecipePage user={user} />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
