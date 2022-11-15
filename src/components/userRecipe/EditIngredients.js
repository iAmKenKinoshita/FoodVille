import React from "react";

export default function EditIngredients(props) {
	const { key, ingredient, onInputChange, position } = props;

	const onChange = (e) => onInputChange(e.target, position);

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
			<hr />
		</div>
	);
}
