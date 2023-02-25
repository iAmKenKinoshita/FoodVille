import { useState, useEffect } from "react";

//Styling
import "../../styles/pages/_recipepage.scss";

//User Utils
import UserRecipeUtils from "./utils/userRecipe";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

//C
import CreateNewRecipe from "./CreateNewRecipe";
import DeletePopOver from "./DeletePopOver";

//Image
import Sample from "../../images/FoodVille.png";

function RecipePage(props) {
	const [modalShow, setModalShow] = useState(false);

	const {} = props;

	// const [foodVille, setFoodVille]
	const [selectedRecipes, setSelectedRecipes] = useState(null);

	useEffect(() => {
		fetch(`userRecipe/recipes/1`)
			.then((result) => result.json())
			.then((data) => setSelectedRecipes(data));
	});

	return (
		<div>
			<div className="columns">
				<div className="column is-1 sidebar">
					<aside class="menu">
						<p class="menu-label">Recipes</p>
						<ul class="menu-list">
							<li>
								<a>All</a>
							</li>
							<li>
								<a>Favorites</a>
							</li>
						</ul>
						<p class="menu-label">Food Ville's</p>
						<ul class="menu-list">
							<ul class="menu-list">
								<li>
									<a>All</a>
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
									<a>All</a>
								</li>
								<li>
									<a>Favorites</a>
								</li>
							</ul>
						</ul>
						<button class="button is-link" onClick={() => setModalShow(true)}>
							+ New Recipe
						</button>
					</aside>
				</div>
				<div className="column recipe-holder">
					<div class="tile is-ancestor is-flex-wrap-wrap">
						{selectedRecipes &&
							selectedRecipes.map((recipe, index) => {
								return (
									<div class="tile is-parent is-3">
										<article class="tile is-child box">
											<figure class="image">
												<img src="https://bulma.io/images/placeholders/256x256.png" />
											</figure>
											<p class="title">{recipe.name}</p>
											<p class="subtitle">{recipe.description}</p>
											<div class="buttons">
												<a class="button is-primary">
													<strong>Details</strong>
												</a>
												<OverlayTrigger
													trigger="focus"
													placement="bottom"
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
			<CreateNewRecipe show={modalShow} onHide={() => setModalShow(false)} />
		</div>
	);
}

export default RecipePage;
