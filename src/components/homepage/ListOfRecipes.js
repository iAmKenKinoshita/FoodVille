import React, { useEffect, useState } from "react";

export default function ListOfRecipes(props) {
	const { setSelectedRecipe, setCurrentView } = props;

	const [recipeArray, setRecipeArray] = useState([]);

	const loadRecipe = () => {
		fetch("/index")
			.then((result) => result.json())
			.then((data) => setRecipeArray(data));
	};

	useEffect(() => {}, [recipeArray]);

	return (
		<>
			<button onClick={loadRecipe}>Load Recipes</button>
			{recipeArray.map((recipe) => {
				return (
					<>
						<div
							onClick={() => {
								setSelectedRecipe(recipe);
								setCurrentView("singleRecipe");
							}}
						>
							<img src={recipe.thumbnail_url} alt="recipe-image" />
							<p>{recipe.name}</p>
							<p>{recipe.description}</p>
						</div>
					</>
				);
			})}
		</>
	);
}
