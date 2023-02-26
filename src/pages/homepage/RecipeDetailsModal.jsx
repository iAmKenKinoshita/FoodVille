import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function RecipeDetailsModal(props) {
	const { selectedRecipe } = props;
	console.log(selectedRecipe);

	const [ingredients, setIngredients] = useState([]);

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
				{selectedRecipe.description ? (
					<>
						<h3 class="title is-6">Description</h3>
						<h5 class="subtitle is-5">{selectedRecipe.description}</h5>
					</>
				) : (
					""
				)}

				<div class="table-container">
					<table class="table is-striped">
						<thead>
							<th>Ingredients</th>
						</thead>
						{/* <tbody>
							{ingredients.map((ingredient) => {
								return (
									<>
										<tr>
											<td>{ingredient.ingredient_name}</td>
											<td>{ingredient.amount}</td>
										</tr>
									</>
								);
							})}
						</tbody> */}
						<tbody>
							{selectedRecipe &&
								selectedRecipe.sections.map((section) => {
									console.log(section.components);
									return (
										<>
											{section.components.map((ingredient) => {
												return (
													<>
														<tr>
															<td>{ingredient.raw_text}</td>
														</tr>
													</>
												);
											})}
										</>
									);
								})}
						</tbody>
					</table>
					<h3 class="title is-6">Instruction</h3>

					{selectedRecipe.instructions &&
						selectedRecipe.instructions.map((instruction, index) => {
							console.log(instruction.display_text);
							// return ({instruction.display_text})
							return (
								<>
									<p class="is-6">
										{index + 1 + ". "}
										{instruction.display_text}
									</p>
								</>
							);
						})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="button is-success"
					// onClick={() => {
					// 	props.onHide();
					// 	setEditRecipeShow(true);
					// }}
				>
					Save
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default RecipeDetailsModal;
