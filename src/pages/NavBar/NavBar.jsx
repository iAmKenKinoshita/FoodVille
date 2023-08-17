import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
			<button className="text-gray-800 hover:underline py-2 rounded-md text-sm font-semibold">
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

	// const handleLinkClick = (event) => {
	// 	event.stopPropagation();
	// };

	return (
		<div onClick={handleClick} className="text-center font-serif p-1">
			<div className="grid place-content-center ">
				<button className="text-gray-800 hover:underline rounded-md font-semibold inline-flex">
					{title}
					<svg
						className={`ml-1 ${isOpen ? "transform rotate-180" : ""}`}
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path d="M8 11.293l4.646-4.647a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L8 11.293z" />
					</svg>
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
	const {
		user,
		setUser,
		userName,
		setSearchRecipes,
		setLoading,
		setCurrentPage,
	} = props;
	const [query, setQuery] = useState("");

	const handleKeyPress = async (event) => {
		if (event.key === "Enter" && query) {
			setCurrentPage(0);
			setLoading(true);
			navigate(`/search/${query}`);
			await HomepageUtils.searchRecipe(setSearchRecipes, query);
			setLoading(false);
		}
	};

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="pt-2  fixed top-0 left-0 w-full z-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="">
						<img src={FVLogo} alt="Food Ville Logo" className="h-8 w-auto" />
					</Link>
					<div className="hidden md:flex pl-3 space-x-9">
						{categories.map((category) => {
							return (
								<DropdownMenu title={category.TITLE}>
									{category.ITEMS.map((item) => {
										return (
											<li>
												<Link
													to={`/search-by-tag/${item.name}`}
													onClick={async () => {
														setCurrentPage(0);
														setLoading(true);
														await HomepageUtils.searchRecipeByCategory(
															setSearchRecipes,
															item.name
														);
														setLoading(false);
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
					<div className="block my-3">
						<input
							type="text"
							placeholder="Search..."
							class="ml-2 px-3 py-2 text-gray-800 bg-white bg-opacity-30 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 border border-gray-300 w-11/12 md:full"
							onChange={(e) => setQuery(e.target.value)}
							onKeyUp={handleKeyPress}
						/>
					</div>
					<div className="hidden md:flex text-center">
						{user === true ? (
							<Link
								to={"/savedrecipes"}
								className="text-gray-800 hover:bg-gray-200 py-2 rounded-md text-sm font-medium"
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
								className="text-gray-800 hover:bg-gray-200 py-2 rounded-md text-sm font-medium"
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
								className="text-gray-800 hover:bg-gray-200 ml-3 py-2 rounded-md text-sm font-medium"
							>
								Log Out
							</button>
						) : (
							""
						)}
					</div>

					{/* Mobile */}

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
					<div className="border-b border-gray-500 my-2 mx-3"></div>
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
													HomepageUtils.searchRecipeByCategory(
														setSearchRecipes,
														item.name
													);
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
							<div>
								<button
									className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md  font-medium"
									onClick={() => {
										toggleMobileMenu();
										navigate("/signIn");
									}}
								>
									Sign In
								</button>
								<div className="border-b border-gray-500 my-2 mx-3"></div>
							</div>
						)}
					</div>

					<div>
						{user === true ? (
							<div>
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
								<div className="border-b border-gray-500 my-2 mx-3"></div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
