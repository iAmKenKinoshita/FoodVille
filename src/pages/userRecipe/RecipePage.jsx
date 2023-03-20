import { useState, useEffect } from "react";

//Styling
import "../../styles/pages/_recipepage.scss";

//Icons
import FVIcon from "../../images/FVIcon.png";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

import CreateNewRecipe from "./CreateNewRecipe";
import RecipeDetailsModal from "./RecipeDetailsModal";
import EditRecipeModal from "./EditRecipeModal";

function RecipePage(props) {
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
		<div>
			<div className="columns">
				<div className="column is-1 sidebar">
					<aside className="menu">
						<p className="menu-label">Recipes</p>
						<ul className="menu-list">
							<li>
								<a
									className="is-active"
									onClick={(e) => {
										UserRecipeUtils.toggleSideBarIsActive(e);
										setSelectedRecipes(allRecipes);
										setCurrentRecipes("allRecipes");
									}}
								>
									All
								</a>
							</li>
							<li>
								<a
									onClick={(e) => {
										UserRecipeUtils.toggleSideBarIsActive(e);
										setSelectedRecipes(allFavoriteRecipes);
										setCurrentRecipes("allFavorites");
									}}
								>
									Favorites
								</a>
							</li>
						</ul>
						<p className="menu-label">Food Ville's</p>
						<ul className="menu-list">
							<ul className="menu-list">
								<li>
									<a
										onClick={(e) => {
											UserRecipeUtils.toggleSideBarIsActive(e);
											setSelectedRecipes(foodVilleRecipes);
											setCurrentRecipes("foodVilleRecipes");
										}}
									>
										All
									</a>
								</li>
								<li>
									<a
										onClick={(e) => {
											UserRecipeUtils.toggleSideBarIsActive(e);
											setSelectedRecipes(foodVilleFavoriteRecipes);
											setCurrentRecipes("foodVilleFavorites");
										}}
									>
										Favorites
									</a>
								</li>
							</ul>
						</ul>
						<p className="menu-label">Your Recipes</p>
						<ul className="menu-list">
							<ul className="menu-list">
								<li>
									<a
										onClick={(e) => {
											UserRecipeUtils.toggleSideBarIsActive(e);
											setSelectedRecipes(userRecipes);
											setCurrentRecipes("userRecipes");
										}}
									>
										All
									</a>
								</li>
								<li>
									<a
										onClick={(e) => {
											UserRecipeUtils.toggleSideBarIsActive(e);
											setSelectedRecipes(userFavoriteRecipes);
											setCurrentRecipes("userFavorites");
										}}
									>
										Favorites
									</a>
								</li>
							</ul>
						</ul>
						<button
							className="button is-link new-recipe"
							onClick={() => setCreateRecipeShow(true)}
						>
							+ New Recipe
						</button>
					</aside>
				</div>
				<div className="column recipe-holder">
					<div className="tile is-ancestor is-flex-wrap-wrap">
						{selectedRecipes &&
							selectedRecipes.map((recipe, index) => {
								return (
									<div className="tile is-parent is-3">
										<article className="tile is-child box card">
											<div className="card-image">
												<figure className="image is-4by3">
													<img
														src={
															recipe.image_url
																? recipe.image_url
																: "https://bulma.io/images/placeholders/256x256.png"
														}
														alt="Placeholder image"
													/>
												</figure>
											</div>
											<div className="card-content">
												<div className="media">
													<div className="media-content">
														<p className="title is-4">{recipe.name}</p>
														{/* <p class="subtitle is-6">@johnsmith</p> */}
													</div>
													<div className="media-left">
														{recipe.is_fv ? (
															<figure className="image is-48x48">
																<img src={FVIcon} alt="Placeholder image" />
															</figure>
														) : (
															""
														)}
													</div>
												</div>
											</div>

											<footer className="card-footer buttons">
												<a
													onClick={() => {
														setSingleRecipeShow(true);
														setSelectedRecipe(selectedRecipes[index]);
													}}
													className="card-footer-item button is-primary"
												>
													Details
												</a>
												<a
													onClick={async () => {
														await UserRecipeUtils.addOrRemoveFavorite(
															recipe.id,
															recipe.is_favorite
														);
														UserRecipeUtils.handleFavorite(
															recipe,
															currentRecipes,
															setSelectedRecipes,
															allRecipes,
															setAllFavoriteRecipes,
															setFoodVilleRecipes,
															setFoodVilleFavoriteRecipes,
															setUserRecipes,
															setUserFavoriteRecipes
														);
													}}
													className="card-footer-item button is-primary"
												>
													{!recipe.is_favorite
														? "Add to Favorites"
														: "Remove from Favorites"}
												</a>
												<OverlayTrigger
													trigger="focus"
													placement="top"
													overlay={UserRecipeUtils.deletePopover(
														recipe.id,
														currentRecipes,
														setSelectedRecipes,
														allRecipes,
														setAllRecipes,
														setAllFavoriteRecipes,
														setFoodVilleRecipes,
														setFoodVilleFavoriteRecipes,
														setUserRecipes,
														setUserFavoriteRecipes
													)}
												>
													<a
														href="#"
														className="card-footer-item button is-danger"
													>
														Delete
													</a>
												</OverlayTrigger>
											</footer>
										</article>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			<CreateNewRecipe
				show={createRecipeShow}
				onHide={() => setCreateRecipeShow(false)}
			/>
			<RecipeDetailsModal
				show={singleRecipeShow}
				onHide={() => setSingleRecipeShow(false)}
				selectedRecipe={selectedRecipe}
				setEditRecipeShow={setEditRecipeShow}
			/>
			<EditRecipeModal
				show={editRecipeShow}
				onHide={() => setEditRecipeShow(false)}
				selectedRecipe={selectedRecipe}
			/>
		</div>
	);
}

export default RecipePage;
