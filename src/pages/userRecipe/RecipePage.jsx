import { useState, useEffect } from "react";

//Styling
import "../../styles/pages/_recipepage.scss";

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

	const [selectedRecipes, setSelectedRecipes] = useState(null);
	//For All Recipes
	const [allRecipes, setAllRecipes] = useState(null);
	//For FoodVille Recipes
	const [foodVilleRecipes, setFoodVilleRecipes] = useState(null);
	//For UserRecipes
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
			setFoodVilleRecipes,
			setUserRecipes
		);
		// fetch(`userRecipe/recipes/1`)
		// 	.then((result) => result.json())
		// 	.then((data) => setAllRecipes(data));
	}, []);

	return (
		<div>
			<div className="columns">
				<div className="column is-1 sidebar">
					<aside class="menu">
						<p class="menu-label">Recipes</p>
						<ul class="menu-list">
							<li>
								<a
									onClick={() => {
										setSelectedRecipes(allRecipes);
									}}
								>
									All
								</a>
							</li>
							<li>
								<a>Favorites</a>
							</li>
						</ul>
						<p class="menu-label">Food Ville's</p>
						<ul class="menu-list">
							<ul class="menu-list">
								<li>
									<a
										onClick={() => {
											setSelectedRecipes(foodVilleRecipes);
										}}
									>
										All
									</a>
								</li>
								<li>
									<a>Favorites</a>
								</li>
							</ul>
						</ul>
						<p class="menu-label">Your Recipes</p>
						<ul class="menu-list">
							<ul class="menu-list">
								<li>
									<a
										onClick={() => {
											setSelectedRecipes(userRecipes);
										}}
									>
										All
									</a>
								</li>
								<li>
									<a>Favorites</a>
								</li>
							</ul>
						</ul>
						<button
							class="button is-link"
							onClick={() => setCreateRecipeShow(true)}
						>
							+ New Recipe
						</button>
					</aside>
				</div>
				<div className="column recipe-holder">
					<div class="tile is-ancestor is-flex-wrap-wrap">
						{selectedRecipes &&
							selectedRecipes.map((recipe, index) => {
								// console.log(recipe);
								return (
									<div class="tile is-parent is-3">
										<article class="tile is-child box">
											<figure class="image">
												<img
													src={
														recipe.image_url
															? recipe.image_url
															: "https://bulma.io/images/placeholders/256x256.png"
													}
												/>
											</figure>
											<p class="title">{recipe.name}</p>
											{/* <p class="subtitle">{recipe.description}</p> */}
											<div class="buttons">
												<a
													class="button is-primary"
													onClick={() => {
														setSingleRecipeShow(true);
														setSelectedRecipe(selectedRecipes[index]);
														console.log(selectedRecipe);
													}}
												>
													Details
												</a>
												<a
													class="button is-primary"
													onClick={() => {
														//Request to add as favorites
														console.log("hello");
													}}
												>
													Add to Favorites
												</a>
												<OverlayTrigger
													trigger="focus"
													placement="top"
													overlay={UserRecipeUtils.deletePopover(recipe.id)}
												>
													<button className="button is-danger">Delete</button>
												</OverlayTrigger>
											</div>
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
