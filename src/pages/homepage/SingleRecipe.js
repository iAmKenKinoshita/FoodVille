import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function SingleRecipe(props) {
	const { selectedRecipe, setCurrentView } = props;

	const [recipeDetails, setRecipeDetails] = useState("");

	useEffect(() => {
		fetch(`/home/getRecipeDetails/${ID}`)
			.then((result) => result.json())
			.then((data) => {
				setRecipeDetails(data);
			});
	});

	const ID = selectedRecipe.id;

	return (
		<>
			<Container>
				<Button
					variant="primary"
					type="button"
					onClick={() => setCurrentView("listOfRecipes")}
				>
					Back
				</Button>
				<Card>
					<Card.Header as="h5">{selectedRecipe.name}</Card.Header>
					<Card.Img variant="top" src={selectedRecipe.thumbnail_url} />
					<Card.Body>
						<Card.Text>{selectedRecipe.description}</Card.Text>
					</Card.Body>

					{recipeDetails === "" ? (
						<button
							onClick={() => {
								fetch(`/home/getRecipeDetails/${ID}`)
									.then((result) => result.json())
									.then((data) => {
										setRecipeDetails(data);
									});
							}}
						>
							More Info
						</button>
					) : (
						<div>
							<Card.Body>
								<Card.Text>Ingredients</Card.Text>
							</Card.Body>
							<Card.Body>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>Ingredients</th>
										</tr>
									</thead>

									{recipeDetails.sections.map((section) => {
										console.log(section.components);
										return (
											<tbody>
												<tr>
													{section.components.map((ingredient) => {
														console.log(ingredient.raw_text);
														return <td>{ingredient.raw_text}</td>;
													})}
												</tr>
											</tbody>
										);
									})}
									{/* {recipeDetails.sections[1].components.map((ingredients) => {
											return (
												<>
													<tr>
														<td>{ingredients.raw_text}</td>
													</tr>
												</>
											);
										})} */}
								</Table>
							</Card.Body>

							<Card.Body>
								<Card.Text>Instructions</Card.Text>
								{recipeDetails.instructions.map((instruction) => {
									return (
										<div>
											<p>{instruction.display_text}</p>
										</div>
									);
								})}
							</Card.Body>
						</div>
					)}
				</Card>
			</Container>
		</>
	);
}
