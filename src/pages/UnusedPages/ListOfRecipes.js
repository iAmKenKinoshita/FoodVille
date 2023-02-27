import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ListOfRecipes(props) {
	const { setSelectedRecipe, setCurrentView } = props;

	const [recipeArray, setRecipeArray] = useState([]);

	const loadRecipe = () => {
		fetch("/home")
			.then((result) => result.json())
			.then((data) => setRecipeArray(data));
	};

	// useEffect(() => {}, [recipeArray]);

	return (
		<>
			<button onClick={loadRecipe}>Load Recipes</button>
			<Container>
				<Row>
					{recipeArray.map((recipe) => {
						return (
							<>
								<Col>
									<Card style={{ width: "18rem" }}>
										<Card.Img variant="top" src={recipe.thumbnail_url} />
										<Card.Body>
											<Card.Title>{recipe.name}</Card.Title>
											<Card.Text>{recipe.description}</Card.Text>
											<Button
												variant="primary"
												onClick={() => {
													setSelectedRecipe(recipe);
													setCurrentView("singleRecipe");
												}}
											>
												Details
											</Button>
										</Card.Body>
									</Card>
								</Col>
							</>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
