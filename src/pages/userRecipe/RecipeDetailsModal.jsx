import React, { useEffect, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";

function RecipeDetailsModal(props) {
	const { selectedRecipe, setEditRecipeShow } = props;

	const [ingredients, setIngredients] = useState([]);

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
			dialogClassName="wideModal"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{selectedRecipe.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col lg={4} md={4}>
						{/* <figure className="image is-5by4">
								<img
									src={
										selectedRecipe.image_url
											? selectedRecipe.image_url
											: "https://bulma.io/images/placeholders/256x256.png"
									}
									alt="Food Image"
								/>
							</figure> */}
					</Col>
					<Col lg={8} md={4}></Col>
				</Row>
				<Row>
					<Col lg={8} md={4}>
						<h3 className="title is-6">Description</h3>
						<h5 className="subtitle is-5">{selectedRecipe.description}</h5>
						<hr></hr>
						<h3 className="title is-6">Instructions</h3>
						<h5 className="subtitle is-5">{selectedRecipe.instruction}</h5>
					</Col>
					<Col lg={4} md={4}>
						<div className="table-container">
							<table className="table is-striped is-narrow">
								<thead>
									{ingredients.length < 1 ? "" : <th>Ingredients</th>}
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
						</div>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="button is-primary edit-button"
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
