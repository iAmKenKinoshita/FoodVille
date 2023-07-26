import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//UserUtils
import UserUtils from "../user/utils/userUtils";

//HomapageUtils
import HomepageUtils from "../homepage/utils/homepageUtils";

//Categories
import categories from "./categories";

//Styling
// import "../styles/pages/_navBar.scss";

//Logo
import FVLogo from "../../images/FoodVille.png";

const DropdownMenu = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	return (
		<div
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<button className="text-gray-800 hover:underline px-3 py-2 rounded-md text-sm font-medium">
				{title}
			</button>
			{isOpen && (
				<ul className="absolute z-10 top-8 left-0 bg-white border border-gray-300 rounded-md">
					{children}
				</ul>
			)}
		</div>
	);
};

export default function NavBar(props) {
	const navigate = useNavigate();
	const { user, setUser, userName, setSearchRecipes } = props;
	return (
		<nav className="py-4 fixed top-0 left-0 w-full z-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<a onClick={() => navigate("/")}>
							<img src={FVLogo} alt="Your Logo" className="h-8 w-auto" />
						</a>

						<div className="hidden md:flex ml-4 space-x-4">
							<DropdownMenu title="Meal">
								{categories.MEALS.map((meal) => {
									return (
										<li>
											<a
												onClick={() => {
													HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														meal.name
													);
													navigate("/search");
												}}
												href="#"
												className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												{meal.display_name}
											</a>
										</li>
									);
								})}
							</DropdownMenu>

							<DropdownMenu title="Cuisine">
								{categories.CUISINE.map((cuisine) => {
									return (
										<li>
											<a
												onClick={() => {
													HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														cuisine.name
													);
													navigate("/search");
												}}
												href="#"
												className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												{cuisine.display_name}
											</a>
										</li>
									);
								})}
							</DropdownMenu>
							<DropdownMenu title="Diet">
								{categories.DIET.map((diet) => {
									return (
										<li>
											<a
												onClick={() => {
													HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														diet.name
													);
													navigate("/search");
												}}
												href="#"
												className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												{diet.display_name}
											</a>
										</li>
									);
								})}
							</DropdownMenu>
							<DropdownMenu title="Method">
								{categories.METHOD.map((method) => {
									return (
										<li>
											<a
												onClick={() => {
													HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														method.name
													);
													navigate("/search");
												}}
												href="#"
												className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												{method.display_name}
											</a>
										</li>
									);
								})}
							</DropdownMenu>
							<DropdownMenu title="Seasonal">
								{categories.SEASONAL.map((seasonal) => {
									return (
										<li>
											<a
												onClick={async () => {
													await HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														seasonal.name
													);
													navigate("/search");
												}}
												href="#"
												className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												{seasonal.display_name}
											</a>
										</li>
									);
								})}
							</DropdownMenu>
						</div>
					</div>

					<div className="hidden md:block">
						<input
							type="text"
							placeholder="Search..."
							class="px-4 py-2 text-gray-800 bg-white bg-opacity-30 rounded-full focus:outline-none focus:ring focus:ring-red-400 border border-gray-300"
						/>

						{user === true ? (
							<a
								onClick={() => {
									navigate("/recipes");
								}}
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Saved Recipes
							</a>
						) : (
							""
						)}
						{user === true ||
						window.location.pathname === "/signIn" ||
						window.location.pathname === "/signUp" ? (
							""
						) : (
							<a
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
								onClick={() => {
									navigate("/signIn");
								}}
							>
								Sign In
							</a>
						)}

						{user === true ? (
							<a
								onClick={async () => {
									await UserUtils.signOut();
									console.log("log out button");
									setUser(false);
									navigate("/");
								}}
								href="#"
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Log Out
							</a>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</nav>
	);

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
}
