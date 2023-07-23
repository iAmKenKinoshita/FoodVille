import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//UserUtils
import UserUtils from "./user/utils/userUtils";

//Styling
import "../styles/pages/_navBar.scss";

//Bootstrap

//Logo
import FVLogo from "../images/FoodVille.png";

export default function NavBar(props) {
	const navigate = useNavigate();
	const { user, setUser, userName } = props;

	return (
		//New Code

		<nav className="bg-white py-4">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						{/* Your logo as an image */}
						<img src={FVLogo} alt="Your Logo" className="h-8 w-auto" />

						{/* Navigation Links */}
						<div className="hidden md:block ml-4 flex items-center space-x-4">
							<a
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Home
							</a>
							<a
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								About
							</a>
							<a
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Services
							</a>
							<a
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Contact
							</a>
						</div>
					</div>

					{/* Sign In Button */}
					<div className="hidden md:block">
						<a
							href="#"
							className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
						>
							Sign In
						</a>
					</div>
				</div>
			</div>
		</nav>

		// <nav className="is-primary" role="navigation" aria-label="main navigation">
		// 	<div className="navbar-brand">
		// 		<a className="navbar-item" onClick={() => navigate("/")}>
		// 			<img src={FVLogo} width="190px" />
		// 		</a>

		// 		<a
		// 			role="button"
		// 			className="navbar-burger"
		// 			aria-label="menu"
		// 			aria-expanded="false"
		// 			data-target="navbarBasicExample"
		// 			onClick={() => {
		// 				let navBurger = document.querySelector(".navbar-burger");
		// 				navBurger.classList.toggle("is-active");
		// 				let navBar = document.querySelector("#navbarBasicExample");
		// 				navBar.classList.toggle("is-active");
		// 			}}
		// 		>
		// 			<span aria-hidden="true"></span>
		// 			<span aria-hidden="true"></span>
		// 			<span aria-hidden="true"></span>
		// 		</a>
		// 	</div>

		// 	<div id="navbarBasicExample" className="navbar-menu">
		// 		<div className="navbar-start">
		// 			<a
		// 				className="navbar-item"
		// 				onClick={() => {
		// 					navigate("/");
		// 					let width = window.innerWidth;
		// 					if (width <= 1023) {
		// 						let navBurger = document.querySelector(".navbar-burger");
		// 						navBurger.classList.toggle("is-active");
		// 						let navBar = document.querySelector("#navbarBasicExample");
		// 						navBar.classList.toggle("is-active");
		// 					}
		// 				}}
		// 			>
		// 				<span class="icon">
		// 					<i class="fas fa-home"></i>
		// 				</span>
		// 				<strong>Home</strong>
		// 			</a>

		// 			{user === true ? (
		// 				<a
		// 					class="navbar-item"
		// 					onClick={() => {
		// 						navigate("/recipes");
		// 						let width = window.innerWidth;
		// 						if (width <= 1023) {
		// 							let navBurger = document.querySelector(".navbar-burger");
		// 							navBurger.classList.toggle("is-active");
		// 							let navBar = document.querySelector("#navbarBasicExample");
		// 							navBar.classList.toggle("is-active");
		// 						}
		// 					}}
		// 				>
		// 					<span class="icon">
		// 						<i class="fas fa-utensils"></i>
		// 					</span>
		// 					<strong>Recipes</strong>
		// 				</a>
		// 			) : (
		// 				""
		// 			)}
		// 		</div>

		// 		<div className="navbar-end">
		// 			{user === true ||
		// 			window.location.pathname === "/signIn" ||
		// 			window.location.pathname === "/signUp" ? (
		// 				""
		// 			) : (
		// 				<>
		// 					<div className="navbar-item">
		// 						<a
		// 							className="button is-primary"
		// 							onClick={() => {
		// 								navigate("/signIn");
		// 								let width = window.innerWidth;
		// 								if (width <= 1023) {
		// 									let navBurger = document.querySelector(".navbar-burger");
		// 									navBurger.classList.toggle("is-active");
		// 									let navBar = document.querySelector(
		// 										"#navbarBasicExample"
		// 									);
		// 									navBar.classList.toggle("is-active");
		// 								}
		// 							}}
		// 						>
		// 							<strong>Sign In</strong>
		// 						</a>
		// 					</div>
		// 				</>
		// 			)}

		// 			{user === true ? (
		// 				//With hover
		// 				// <div className="navbar-item has-dropdown is-hoverable">
		// 				// 	<a className="navbar-link">
		// 				// 		<span class="icon">
		// 				// 			<i class="fas fa-user"></i>
		// 				// 		</span>
		// 				// 		<strong>{userName}</strong>
		// 				// 	</a>

		// 				// 	<div className="navbar-dropdown is-right">
		// 				// 		{/* <a className="navbar-item">My Profile</a> */}
		// 				// 		<a
		// 				// 			className="navbar-item"
		// 				// 			onClick={() => {
		// 				// 				UserUtils.signOut();
		// 				// 				setUser(false);
		// 				// 				navigate("/");
		// 				// 				let width = window.innerWidth;
		// 				// 				if (width <= 1023) {
		// 				// 					let navBurger = document.querySelector(".navbar-burger");
		// 				// 					navBurger.classList.toggle("is-active");
		// 				// 					let navBar = document.querySelector(
		// 				// 						"#navbarBasicExample"
		// 				// 					);
		// 				// 					navBar.classList.toggle("is-active");
		// 				// 				}
		// 				// 			}}
		// 				// 		>
		// 				// 			Log Out
		// 				// 		</a>
		// 				// 	</div>
		// 				// </div>

		// 				<div className="navbar-item">
		// 					<a
		// 						className="navbar-item logout"
		// 						onClick={() => {
		// 							UserUtils.signOut();
		// 							setUser(false);
		// 							navigate("/");
		// 							let width = window.innerWidth;
		// 							if (width <= 1023) {
		// 								let navBurger = document.querySelector(".navbar-burger");
		// 								navBurger.classList.toggle("is-active");
		// 								let navBar = document.querySelector("#navbarBasicExample");
		// 								navBar.classList.toggle("is-active");
		// 							}
		// 						}}
		// 					>
		// 						<strong>Log Out</strong>
		// 					</a>
		// 				</div>
		// 			) : (
		// 				""
		// 			)}
		// 		</div>
		// 	</div>
		// </nav>
	);
}
