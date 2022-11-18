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
		<div>
			<div className="form-group">
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter ingredient name"
					name="ingredient_name"
					value={ingredient.ingredient_name}
					onChange={onChange}
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter amount"
					name="amount"
					value={ingredient.amount}
					onChange={onChange}
				/>
			</div>
			<button
				type="button"
				onClick={() => {
					deleteIngredient(index, ingredients, setIngredients);
				}}
			>
				This is delete
			</button>
			<hr />
		</div>
	);
}
