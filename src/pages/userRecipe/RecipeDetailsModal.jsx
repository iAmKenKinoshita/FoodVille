import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function RecipeDetailsModal(props) {
	const { selectedRecipe, setEditRecipeShow } = props;

	const [ingredients, setIngredients] = useState([]);
	// console.log(ingredients);

	useEffect(() => {
		if (selectedRecipe !== "") {
			fetch(`userRecipe/ingredients/${selectedRecipe.id}`)
				.then((result) => result.json())
				.then((data) => setIngredients(data));
		}
	}, [selectedRecipe]);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{selectedRecipe.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h3 class="title is-6">Description</h3>
				<h5 class="subtitle is-5">{selectedRecipe.description}</h5>
				<div class="table-container">
					<table class="table is-striped">
						<thead>
							{ingredients.length <= 1 ? (
								<th>Ingredient</th>
							) : (
								<th>Ingredients</th>
							)}
						</thead>
						<tbody>
							{ingredients.map((ingredient) => {
								return (
									<>
										<tr>
											<td>{ingredient.ingredient_info}</td>
											{/* <td>{ingredient.ingredient_name}</td>
											<td>{ingredient.amount}</td> */}
										</tr>
									</>
								);
							})}
						</tbody>
					</table>
					<h3 class="title is-6">Instruction</h3>
					<h5 class="subtitle is-5">{selectedRecipe.instruction}</h5>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="button is-success"
					onClick={() => {
						props.onHide();
						setEditRecipeShow(true);
					}}
				>
					Edit
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default RecipeDetailsModal;
