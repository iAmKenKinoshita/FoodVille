import { useState, useEffect } from "react";

//Icons
import FVIcon from "../../images/FVIcon.png";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

import CreateNewRecipe from "./CreateNewRecipe";
import RecipeDetailsModal from "./RecipeDetailsModal";
import EditRecipeModal from "./EditRecipeModal";

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
				<button className="text-gray-800 hover:underline rounded-md font-semibold inline-flex justify-center items-center">
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
			</div>

			{isOpen && (
				<div>
					<ul className="">{children}</ul>
				</div>
			)}
		</div>
	);
};

function RecipePage(props) {
	const [sideBarActive, setSideBarActive] = useState(0);

	const [createRecipeShow, setCreateRecipeShow] = useState(false);
	const [singleRecipeShow, setSingleRecipeShow] = useState(false);
	const [editRecipeShow, setEditRecipeShow] = useState(false);

	const [currentRecipes, setCurrentRecipes] = useState("allRecipes");
	const [selectedRecipes, setSelectedRecipes] = useState(null);
	//For All Recipes
	const [allRecipes, setAllRecipes] = useState(null);
	const [allFavoriteRecipes, setAllFavoriteRecipes] = useState(null);
	//For FoodVille Recipes
	const [foodVilleRecipes, setFoodVilleRecipes] = useState(null);
	const [foodVilleFavoriteRecipes, setFoodVilleFavoriteRecipes] =
		useState(null);
	//For UserRecipes
	const [userFavoriteRecipes, setUserFavoriteRecipes] = useState(null);
	const [userRecipes, setUserRecipes] = useState(null);

	//For RecipeDetails
	const [selectedRecipe, setSelectedRecipe] = useState("");

	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData[0].userId;

	useEffect(() => {
		UserRecipeUtils.getRecipes(
			userId,
			setSelectedRecipes,
			setAllRecipes,
			setAllFavoriteRecipes,
			setFoodVilleRecipes,
			setFoodVilleFavoriteRecipes,
			setUserRecipes,
			setUserFavoriteRecipes
		);
	}, []);

	return (
		<div className="max-w-5xl md:max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 font-serif pt-20 md:flex">
			<nav className="md:hidden">
				<div className="mx-auto justify-between items-center space-x-4 font-serif">
					<DropdownMenuMobile title="Recipes">
						<div className="border-b border-gray-500 md:hidden"></div>
						<a
							onClick={() => {
								setSideBarActive(0);
								setSelectedRecipes(allRecipes);
								setCurrentRecipes("allRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 pt-2 hover:bg-gray-300 ${
									sideBarActive === 0 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(1);
								setSelectedRecipes(allFavoriteRecipes);
								setCurrentRecipes("allFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 1 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
						<p className="text-lg font-semibold">Food Ville's</p>
						<a
							onClick={() => {
								setSideBarActive(2);
								setSelectedRecipes(foodVilleRecipes);
								setCurrentRecipes("foodVilleRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 2 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(3);
								setSelectedRecipes(foodVilleFavoriteRecipes);
								setCurrentRecipes("foodVilleFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 3 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
						<p className="text-lg font-semibold">Your Recipes</p>
						<a
							onClick={() => {
								setSideBarActive(4);
								setSelectedRecipes(userRecipes);
								setCurrentRecipes("userRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 4 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(5);
								setSelectedRecipes(userFavoriteRecipes);
								setCurrentRecipes("userFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 5 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
						<button
							onClick={() => setCreateRecipeShow(true)}
							className="bg-emerald-300 hover:bg-emerald-500 text-white font-medium rounded-md focus:outline-none p-2 mt-4"
						>
							Add New Recipe
						</button>
					</DropdownMenuMobile>
					{/* <DropdownMenuMobile title="Food Ville's">
						<div className="border-b border-gray-500 my-2  md:hidden"></div>
						<a>
							<li>All</li>
						</a>
						<a>
							<li>Favorites</li>
						</a>
					</DropdownMenuMobile>
					<DropdownMenuMobile title="Your Recipes">
						<div className="border-b border-gray-500 my-2  md:hidden"></div>
						<a>
							<li>asdas</li>
						</a>
					</DropdownMenuMobile> */}
				</div>
			</nav>

			<div className="border-b border-gray-500 my-2  md:hidden"></div>

			<div className="h-screen p-4 sticky top-0 hidden md:block">
				<div className="py-2">
					<h1 className="text-gray-400 text-2xl font-semibold">Recipes</h1>
					<ul className="pl-4 text-center">
						<a
							onClick={() => {
								setSideBarActive(0);
								setSelectedRecipes(allRecipes);
								setCurrentRecipes("allRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 0 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(1);
								setSelectedRecipes(allFavoriteRecipes);
								setCurrentRecipes("allFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 1 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
					</ul>
				</div>
				<div className="py-2">
					<h1 className="text-gray-400 text-2xl font-semibold">Food Ville's</h1>
					<ul className="pl-4 text-center">
						<a
							onClick={() => {
								setSideBarActive(2);
								setSelectedRecipes(foodVilleRecipes);
								setCurrentRecipes("foodVilleRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 2 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(3);
								setSelectedRecipes(foodVilleFavoriteRecipes);
								setCurrentRecipes("foodVilleFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 3 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
					</ul>
				</div>
				<div className="pt-2 pb-5">
					<h1 className="text-gray-400 text-2xl font-semibold">Your Recipes</h1>
					<ul className="pl-4 text-center">
						<a
							onClick={() => {
								setSideBarActive(4);
								setSelectedRecipes(userRecipes);
								setCurrentRecipes("userRecipes");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 4 ? "bg-gray-200" : ""
								}`}
							>
								All
							</li>
						</a>
						<a
							onClick={() => {
								setSideBarActive(5);
								setSelectedRecipes(userFavoriteRecipes);
								setCurrentRecipes("userFavorites");
							}}
						>
							<li
								className={`text-xl text-gray-400 hover:bg-gray-300 ${
									sideBarActive === 5 ? "bg-gray-200" : ""
								}`}
							>
								Favorites
							</li>
						</a>
					</ul>
				</div>
				<button
					onClick={() => setCreateRecipeShow(true)}
					className="bg-emerald-300 hover:bg-emerald-500 text-white font-medium rounded-md focus:outline-none p-2 mt-4"
				>
					Add New Recipe
				</button>
			</div>

			<div className="flex-1 p-4">
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:py-3 py-5">
					{selectedRecipes &&
						selectedRecipes.map((recipe, index) => {
							return (
								<div
									onClick={() => {
										setSingleRecipeShow(true);
										setSelectedRecipe(selectedRecipes[index]);
									}}
									className="hover:border-2 border-red-500 p-2 bg-white shadow-md"
								>
									<div className="p-2">
										<img
											src={
												recipe.image_url ||
												"https://bulma.io/images/placeholders/256x256.png"
											}
											alt="foodimage"
											className="w-full h-36 object-cover rounded-t-lgr"
										/>
										<div className="mt-2">
											<h1 className="text-red-600 pb-">
												{/* {recipe.tags.find((tagname) => tagname.type === "meal")
													?.display_name || ""} */}
											</h1>
											<h1 className="text-3xl mb-2">{recipe.name}</h1>
											{/* {recipe.total_time_minutes &&
											recipe.total_time_minutes < 60 ? (
												<div className="flex">
													<svg
														className="meta-text__icon h-6 w-6 mr-2"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<circle cx="12" cy="12" r="10" />
														<path d="M12 6v6l4 2" />
													</svg>
													<span className="text-gray-600">
														{recipe.total_time_minutes} minutes
													</span>
												</div>
											) : (
												""
											)} */}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<CreateNewRecipe
				show={createRecipeShow}
				onHide={() => setCreateRecipeShow(false)}
				userId={userId}
				setSelectedRecipes={setSelectedRecipes}
				setAllRecipes={setAllRecipes}
				setAllFavoriteRecipes={setAllFavoriteRecipes}
				setFoodVilleRecipes={setFoodVilleRecipes}
				setFoodVilleFavoriteRecipes={setFoodVilleFavoriteRecipes}
				setUserRecipes={setUserRecipes}
				setUserFavoriteRecipes={setUserFavoriteRecipes}
				setCreateRecipeShow={setCreateRecipeShow}
			/>
			<RecipeDetailsModal
				show={singleRecipeShow}
				onHide={() => setSingleRecipeShow(false)}
				setEditRecipeShow={setEditRecipeShow}
				selectedRecipe={selectedRecipe}
				currentRecipes={currentRecipes}
				setSelectedRecipes={setSelectedRecipes}
				allRecipes={allRecipes}
				setAllFavoriteRecipes={setAllFavoriteRecipes}
				setFoodVilleRecipes={setFoodVilleRecipes}
				setAllRecipes={setAllRecipes}
				setFoodVilleFavoriteRecipes={setFoodVilleFavoriteRecipes}
				setUserRecipes={setUserRecipes}
				setUserFavoriteRecipes={setUserFavoriteRecipes}
				setSingleRecipeShow={setSingleRecipeShow}
			/>
			<EditRecipeModal
				show={editRecipeShow}
				onHide={() => setEditRecipeShow(false)}
				selectedRecipe={selectedRecipe}
				setEditRecipeShow={setEditRecipeShow}
			/>
		</div>
	);
}

export default RecipePage;
