import React, { useState, useEffect } from "react";
import EditIngredients from "./EditIngredients";

export default function EditRecipe(props) {
	const { setCurrentView, selectedRecipe } = props;
	const [ingredients, setIngredients] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState("");

	const ID = selectedRecipe.id;

	useEffect(() => {
		fetch(`userRecipe/list/${ID}`)
			.then((result) => result.json())
			.then((data) => setIngredients(data));
		setRecipeDetails(selectedRecipe);
	}, []);

	const onInputChange = ({ name, value }, position) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(position, 1, {
			...ingredients[position],
			[name]: value,
		});
		setIngredients(clonedIngredients);
	};

	const handleChange = ({ name, value }) => {
		const clonedSelectedRecipe = { ...recipeDetails };
		clonedSelectedRecipe[name] = value;
		setRecipeDetails(clonedSelectedRecipe);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(ingredients);
		fetch(`userRecipe/editRecipe/${ID}`, {
			method: "PATCH",
			headers: {
				ingredients: JSON.stringify(ingredients),
				recipeDetails: JSON.stringify(recipeDetails),
			},
		});
	};

	return (
		<>
			<p>This is from the edit component</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter name"
					name="name"
					value={recipeDetails.name}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter description"
					name="description"
					value={recipeDetails.description}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				{ingredients.map((ingredient, index) => {
					return (
						<EditIngredients
							key={index}
							ingredient={ingredient}
							onInputChange={onInputChange}
							position={index}
						/>
					);
				})}
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter instruction"
					name="instruction"
					value={recipeDetails.instruction}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				<button type="submit">Update</button>
			</form>
		</>
	);
}
