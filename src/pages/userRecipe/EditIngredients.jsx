import React from "react";

export default function EditIngredients(props) {
	const {
		key,
		ingredient,
		onIngredientChange,
		index,
		deleteIngredient,
		setIngredients,
		ingredients,
	} = props;

	const onChange = (e) =>
		onIngredientChange(e.target, index, ingredients, setIngredients);

	return (
		<>
			<div className="field has-addons">
				<div className="control is-expanded">
					<input
						className="input"
						type="text"
						placeholder="1 kg potatoes, sliced"
						name="ingredient_info"
						value={ingredient.ingredient_info}
						onChange={onChange}
					/>
				</div>
				<button
					className="button delete-button"
					type="button"
					onClick={() => {
						deleteIngredient(index, ingredients, setIngredients);
					}}
				>
					Delete Ingredient
				</button>
			</div>
		</>
	);
}
