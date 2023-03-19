import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import HomepageUtils from "./utils/homepageUtils";

function RecipeDetailsModal(props) {
	const { selectedRecipe } = props;

	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData[0].userId;

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
						<tbody>
							{selectedRecipe &&
								selectedRecipe.sections.map((section) => {
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
					onClick={async () => {
						props.onHide();
						// setEditRecipeShow(true);
						HomepageUtils.saveApiRecipe(userId, selectedRecipe);
					}}
				>
					Save
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default RecipeDetailsModal;
