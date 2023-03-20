import React, { useEffect, useState } from "react";

//Styling
import "../../styles/pages/_homepage.scss";

//Modal
import RecipeDetailsModal from "./RecipeDetailsModal";

import HomepageUtils from "./utils/homepageUtils";

export default function Homepage(props) {
	const { user, userId, searchRecipes, setSearchRecipes } = props;

	const [selectedRecipeShow, setSelectedRecipeShow] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {}, [searchRecipes]);

	return (
		<>
			<div className="columns">
				<div className="column is-6 is-offset-one-quarter box">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							HomepageUtils.searchRecipe(setSearchRecipes, query);
						}}
					>
						<div class="field is-grouped">
							<p class="control is-expanded">
								<input
									class="input"
									type="text"
									placeholder="Enter an ingredient or a recipe name (i.e. burger)"
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</p>
							<p class="control">
								<button class="button is-info">Search</button>
							</p>
						</div>

						{/*For Filter Features */}
						{/* <div class="field is-grouped">
							<div class="dropdown is-hoverable">
								<div class="dropdown-trigger">
									<button
										class="button"
										aria-haspopup="true"
										aria-controls="dropdown-menu4"
									>
										<span>Hover me</span>
										<span class="icon is-small">
											<i class="fas fa-angle-down" aria-hidden="true"></i>
										</span>
									</button>
								</div>
								<div class="dropdown-menu" id="dropdown-menu4" role="menu">
									<div class="dropdown-content">
										<div class="dropdown-item">
											<p>
												You can insert <strong>any type of content</strong>{" "}
												within the dropdown menu.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</form>
				</div>
			</div>

			{searchRecipes.length > 0 ? (
				<div className="box">
					{searchRecipes.length > 0
						? `${searchRecipes.length} matching results`
						: ""}
					<div className="tile ancestor is-flex-wrap-wrap">
						{searchRecipes.map((recipe, index) => {
							return (
								<div class="tile is-parent is-3">
									<article class="tile is-child box card">
										<div className="card-image">
											<figure class="image is-square is-4by3">
												<img src={recipe.thumbnail_url} />
											</figure>
										</div>
										<div className="card-content">
											<div className="media">
												<div className="media-content">
													<p className="title is-4">{recipe.name}</p>
													{/* <p class="subtitle is-6">@johnsmith</p> */}
												</div>
											</div>
										</div>

										{/* <p class="subtitle">{recipe.description}</p> */}

										<footer class="card-footer buttons">
											<a
												class="button is-primary card-footer-item"
												onClick={() => {
													setSelectedRecipeShow(true);
													setSelectedRecipe(recipe);
												}}
											>
												Details
											</a>
											<a
												className="button is-primary card-footer-item"
												onClick={() => {
													if (user && userId !== null) {
														HomepageUtils.saveApiRecipe(userId, recipe);
													}
													if (!user) {
														console.log("Create an account first");
													}
												}}
											>
												Save
											</a>
										</footer>
									</article>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				""
			)}
			<RecipeDetailsModal
				show={selectedRecipeShow}
				onHide={() => setSelectedRecipeShow(false)}
				selectedRecipe={selectedRecipe}
				user={user}
				userId={userId}
			/>
		</>
	);
}
