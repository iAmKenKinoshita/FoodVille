import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import UserRecipeUtils from "./utils/userRecipe";

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

	//NewCode
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
					className="button is-danger"
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
