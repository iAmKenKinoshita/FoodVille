import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//UserUtils
import UserUtils from "../user/utils/userUtils";

//HomapageUtils
import HomepageUtils from "../homepage/utils/homepageUtils";

//Categories
import categories from "./categories";

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
			<button className="text-gray-800 hover:underline px-3 py-2 rounded-md text-sm font-semibold">
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

const DropdownMenuMobile = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleLinkClick = (event) => {
		event.stopPropagation();
	};

	return (
		<div onClick={handleClick} className="text-center font-serif">
			<div className="grid place-content-center ">
				<button className="text-gray-800 hover:underline rounded-md font-semibold">
					{title}
				</button>
				{/* <div className={`arrow ${isOpen ? "arrow-down" : "arrow-up"}`} /> */}
			</div>

			{isOpen && (
				<div>
					<ul className="">{children}</ul>
				</div>
			)}
		</div>
	);
};

export default function NavBar(props) {
	const navigate = useNavigate();
	const { user, setUser, userName, setSearchRecipes } = props;
	const [query, setQuery] = useState("");

	const handleKeyPress = async (event) => {
		if (event.key === "Enter" && query) {
			await HomepageUtils.searchRecipe(setSearchRecipes, query);
			navigate(`/search/${query}`);
		}
	};

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const [isListOpen, setIsListOpen] = useState(false);

	const toggleList = () => {
		setIsListOpen(!isListOpen);
	};

	return (
		<nav className="pt-2  fixed top-0 left-0 w-full z-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="">
							<img src={FVLogo} alt="Food Ville Logo" className="h-8 w-auto" />
						</Link>

						<div className="hidden md:flex ml-4 space-x-4">
							{categories.map((category) => {
								return (
									<DropdownMenu title={category.TITLE}>
										{category.ITEMS.map((item) => {
											return (
												<li>
													<Link
														to={`/search-by-tag/${item.name}`}
														onClick={() => {
															HomepageUtils.searchRecipeByCategory(
																setSearchRecipes,
																item.name
															);
														}}
														className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
													>
														{item.display_name}
													</Link>
												</li>
											);
										})}
									</DropdownMenu>
								);
							})}
						</div>
					</div>
					<div className="block m-3">
						<input
							type="text"
							placeholder="Search..."
							class="ml-2 px-3 py-2 text-gray-800 bg-white bg-opacity-30 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 border border-gray-300 "
							onChange={(e) => setQuery(e.target.value)}
							onKeyUp={handleKeyPress}
						/>
					</div>

					<div className="hidden md:block">
						{user === true ? (
							<Link
								to={"/savedrecipes"}
								className="text-gray-800 hover:bg-gray-200 mx-1 px-3 py-2 rounded-md text-sm font-medium"
							>
								Saved Recipes
							</Link>
						) : (
							""
						)}
						{user === true ||
						window.location.pathname === "/signIn" ||
						window.location.pathname === "/signUp" ? (
							""
						) : (
							<button
								className="text-gray-800 hover:bg-gray-200 mx-1 px-3 py-2 rounded-md text-sm font-medium"
								onClick={() => {
									navigate("/signIn");
								}}
							>
								Sign In
							</button>
						)}

						{user === true ? (
							<button
								onClick={async () => {
									await UserUtils.signOut();
									setUser(false);
									navigate("/");
								}}
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Log Out
							</button>
						) : (
							""
						)}
					</div>
					<div className="md:hidden flex items-center">
						<button
							className="text-gray-800 focus:outline-none"
							onClick={toggleMobileMenu}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isMobileMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="md:hidden">
					{categories.map((category) => {
						return (
							<DropdownMenuMobile title={category.TITLE}>
								<div className="border-b border-gray-500 my-2 mx-20"></div>
								{category.ITEMS.map((item) => {
									return (
										<li>
											<Link
												to={`/search-by-tag/${item.name}`}
												onClick={() => {
													toggleMobileMenu();
													// HomepageUtils.searchRecipeByCategory(
													// 	setSearchRecipes,
													// 	item.name
													// );
												}}
												className="block text-gray-800 hover:bg-gray-200"
											>
												{item.display_name}
											</Link>
										</li>
									);
								})}
								<div className="border-b border-gray-500 my-2 mx-20"></div>
							</DropdownMenuMobile>
						);
					})}

					<div className="border-b border-gray-500 my-2 mx-3"></div>

					<div>
						{user === true ? (
							<Link
								to={"/savedrecipes"}
								onClick={() => {
									toggleMobileMenu();
								}}
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Saved Recipes
							</Link>
						) : (
							""
						)}
						{user === true ||
						window.location.pathname === "/signIn" ||
						window.location.pathname === "/signUp" ? (
							""
						) : (
							<button
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md  font-medium"
								onClick={() => {
									toggleMobileMenu();
									navigate("/signIn");
								}}
							>
								Sign In
							</button>
						)}
					</div>

					<div>
						{user === true ? (
							<button
								onClick={async () => {
									await UserUtils.signOut();
									setUser(false);
									toggleMobileMenu();
									navigate("/");
								}}
								className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								Log Out
							</button>
						) : (
							""
						)}
					</div>

					{/* <a href="/" className="block p-4">
						Home
					</a>
					<a href="/about" className="block p-4">
						About
					</a>
					<a href="/contact" className="block p-4">
						Contact
					</a> */}
				</div>
			)}
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
