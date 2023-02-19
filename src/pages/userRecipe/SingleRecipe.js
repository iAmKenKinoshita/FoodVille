import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function SingleRecipeList(props) {
	const { selectedRecipe, setCurrentView } = props;

	const [ingredients, setIngredients] = useState([]);

	const ID = selectedRecipe.id;

	useEffect(() => {
		fetch(`userRecipe/ingredients/${ID}`)
			.then((result) => result.json())
			.then((data) => setIngredients(data));
	}, []);

	return (
		<div>
			<Button
				variant="primary"
				type="button"
				onClick={() => setCurrentView("allRecipes")}
			>
				Back to Recipes
			</Button>{" "}
			<Card>
				<Card.Header>{selectedRecipe.name}</Card.Header>
				<Card.Body>
					<Card.Title>{selectedRecipe.description}</Card.Title>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Ingredients</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
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
						</tbody>
					</Table>
					<Card.Title>Instructions: </Card.Title>
					<Card.Text>{selectedRecipe.instruction}</Card.Text>
					{/* <Button variant="primary">Go somewhere</Button> */}
				</Card.Body>
			</Card>
			<Button
				variant="primary"
				type="button"
				onClick={() => setCurrentView("editRecipe")}
			>
				Edit Recipe
			</Button>
		</div>
	);
}
