import { useState, useEffect } from "react";
import UserRecipeUtils from "./utils/userRecipe";
import sidebarFilters from "./utils/sidebarFilters";
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
				<button className="text-gray-800 rounded-md font-semibold inline-flex justify-center items-center">
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
					<DropdownMenuMobile title="Filter by:">
						<div className="border-b border-gray-500 md:hidden"></div>
						{sidebarFilters &&
							sidebarFilters.map((item) => {
								return (
									<>
										<p className="text-gray-400 text-2xl font-semibold">
											{item.TITLE}
										</p>
										{item.filters &&
											item.filters.map((filter) => {
												return (
													<a
														onClick={() => {
															setCurrentRecipes(filter.SELECT_RECIPE);
															setSideBarActive(filter.INDEX);
															setSelectedRecipes(
																filter.SELECT_RECIPE === "allRecipes"
																	? allRecipes
																	: filter.SELECT_RECIPE === "allFavorites"
																	? allFavoriteRecipes
																	: filter.SELECT_RECIPE === "foodVilleRecipes"
																	? foodVilleRecipes
																	: filter.SELECT_RECIPE ===
																	  "foodVilleFavorites"
																	? foodVilleFavoriteRecipes
																	: filter.SELECT_RECIPE === "userRecipes"
																	? userRecipes
																	: filter.SELECT_RECIPE === "userFavorites"
																	? userFavoriteRecipes
																	: ""
															);
														}}
													>
														<li
															className={`text-xl text-gray-400 hover:bg-gray-300 ${
																sideBarActive === filter.INDEX
																	? "bg-gray-200"
																	: ""
															}`}
														>
															{filter.TITLE}
														</li>
													</a>
												);
											})}
									</>
								);
							})}

						<button
							onClick={() => setCreateRecipeShow(true)}
							className="bg-emerald-300 hover:bg-emerald-500 text-white font-medium rounded-md focus:outline-none p-2 mt-2"
						>
							Add New Recipe
						</button>
					</DropdownMenuMobile>
				</div>
			</nav>

			<div className="border-b border-gray-500 my-2  md:hidden"></div>

			<div className="h-screen p-4 sticky top-0 hidden md:block">
				{sidebarFilters &&
					sidebarFilters.map((item) => {
						return (
							<div className="py-2">
								<h1 className="text-gray-400 text-2xl font-semibold">
									{item.TITLE}
								</h1>
								<ul className="pl-4 text-center">
									{item.filters &&
										item.filters.map((filter) => {
											return (
												<a
													onClick={() => {
														setCurrentRecipes(filter.SELECT_RECIPE);
														setSideBarActive(filter.INDEX);
														setSelectedRecipes(
															filter.SELECT_RECIPE === "allRecipes"
																? allRecipes
																: filter.SELECT_RECIPE === "allFavorites"
																? allFavoriteRecipes
																: filter.SELECT_RECIPE === "foodVilleRecipes"
																? foodVilleRecipes
																: filter.SELECT_RECIPE === "foodVilleFavorites"
																? foodVilleFavoriteRecipes
																: filter.SELECT_RECIPE === "userRecipes"
																? userRecipes
																: filter.SELECT_RECIPE === "userFavorites"
																? userFavoriteRecipes
																: ""
														);
													}}
												>
													<li
														className={`text-xl text-gray-400 hover:bg-gray-300 ${
															sideBarActive === filter.INDEX
																? "bg-gray-200"
																: ""
														}`}
													>
														{filter.TITLE}
													</li>
												</a>
											);
										})}
								</ul>
							</div>
						);
					})}
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
											<h1 className="text-3xl mb-2">{recipe.name}</h1>
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
