import { useState, useEffect } from "react";

//Icons
import FVIcon from "../../images/FVIcon.png";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

import CreateNewRecipe from "./CreateNewRecipe";
import RecipeDetailsModal from "./RecipeDetailsModalTest";
import EditRecipeModal from "./EditRecipeModal";

function RecipePageTest(props) {
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
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 font-serif pt-24 flex">
			<div className="h-screen p-4 sticky top-0">
				{/* Sidebar content */}
				<div className="py-2">
					<h1 className="text-gray-400 text-2xl font-semibold">Recipes</h1>
					<ul className="pl-4 text-center">
						<li className="text-xl text-gray-400 bg-gray-200">All</li>
						<li className="text-xl text-gray-400">Favorites</li>
					</ul>
				</div>
				<div className="py-2">
					<h1 className="text-gray-400 text-2xl font-semibold">Food Ville's</h1>
					<ul className="pl-4 text-center">
						<li className="text-xl text-gray-400">All</li>
						<li className="text-xl text-gray-400">Favorites</li>
					</ul>
				</div>
				<div className="pt-2 pb-5">
					<h1 className="text-gray-400 text-2xl font-semibold">Your Recipes</h1>
					<ul className="pl-4 text-center">
						<li className="text-xl text-gray-400">All</li>
						<li className="text-xl text-gray-400">Favorites</li>
					</ul>
				</div>
				<button
					onClick={() => setCreateRecipeShow(true)}
					className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md focus:outline-none p-2"
				>
					Add New Recipe
				</button>
			</div>
			<div className="flex-1 p-4">
				<div className="grid grid-cols-3 gap-3 py-3">
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
				selectedRecipe={selectedRecipe}
				setEditRecipeShow={setEditRecipeShow}
				currentRecipes={currentRecipes}
				selectedRecipes={selectedRecipes}
				allRecipes={allRecipes}
				setAllRecipes={setAllRecipes}
				setAllFavoriteRecipes={setAllFavoriteRecipes}
				setFoodVilleRecipes={setFoodVilleRecipes}
				setFoodVilleFavoriteRecipes={setFoodVilleFavoriteRecipes}
				setUserRecipes={setUserRecipes}
				setUserFavoriteRecipes={setUserFavoriteRecipes}
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

export default RecipePageTest;
