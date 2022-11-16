import React from "react";

export default function EditIngredients(props) {
	const { key, ingredient, onInputChange, index, deleteIngredient } = props;

	const onChange = (e) => onInputChange(e.target, index);

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
					deleteIngredient(index);
				}}
			>
				This is delete
			</button>
			<hr />
		</div>
	);
}
