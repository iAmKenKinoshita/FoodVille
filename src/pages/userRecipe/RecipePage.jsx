import { useState, useEffect } from "react";

import "../../styles/pages/_recipepage.scss";

//Image
import Sample from "../../images/FoodVille.png";

function RecipePage(props) {
	const {} = props;

	// const [foodVille, setFoodVille]
	const [userRecipes, setUserRecipes] = useState(null);

	useEffect(() => {
		fetch(`userRecipe/recipes/1`)
			.then((result) => result.json())
			.then((data) => setUserRecipes(data));
	});

	return (
		<>
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
					</aside>
				</div>
				<div className="column">
					<div class="tile is-ancestor is-flex-wrap-wrap">
						{userRecipes &&
							userRecipes.map((recipe, index) => {
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
												<a class="button is-danger">Delete</a>
											</div>
										</article>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
}

export default RecipePage;
