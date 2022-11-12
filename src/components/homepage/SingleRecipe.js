import React, { useEffect, useState } from "react";

export default function SingleRecipe(props) {
	const { selectedRecipe } = props;

	const [recipeDetails, setRecipeDetails] = useState("");

	useEffect(() => {});

	const ID = selectedRecipe.id;

	return (
		<>
			{console.log(selectedRecipe)}
			{console.log(recipeDetails)}
			<p>{selectedRecipe.name}</p>
			<img src={selectedRecipe.thumbnail_url}></img>
			<p>{selectedRecipe.description}</p>
			{recipeDetails === "" ? (
				<button
					onClick={() => {
						fetch(`/index/getRecipeDetails/${ID}`)
							.then((result) => result.json())
							.then((data) => {
								setRecipeDetails(data);
							});
					}}
				>
					More Info
				</button>
			) : (
				<div>
					<p>Ingredients</p>
					{recipeDetails.sections[0].components.map((ingredients) => {
						return (
							<div>
								<p>{ingredients.raw_text}</p>
							</div>
						);
					})}
					<p>Instruction</p>
					{recipeDetails.instructions.map((instruction) => {
						return (
							<div>
								<p>{instruction.display_text}</p>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
