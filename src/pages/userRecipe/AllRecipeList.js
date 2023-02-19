import React, { useEffect } from "react";
import UserRecipeUtils from "./utils/userRecipe";

//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Container from "react-bootstrap/Container";

export default function AllRecipeList(props) {
	const { setCurrentView, setSelectedRecipe, userRecipes } = props;

	const user = JSON.parse(localStorage.getItem("userData"));

	const popover = (ID) => (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Delete recipe?</Popover.Header>
			<Popover.Body>
				Are you sure you want to <strong>delete</strong> this recipe?
			</Popover.Body>
			<Button
				variant="primary"
				onClick={() => {
					UserRecipeUtils.deleteRecipe(ID, setCurrentView);
				}}
			>
				Yes
			</Button>{" "}
			<Button
				variant="primary"
				onClick={() => {
					setCurrentView("allRecipes");
				}}
			>
				No
			</Button>{" "}
		</Popover>
	);

	return (
		<div>
			<Container>
				{userRecipes.length === 0 ? <p>No recipes yet</p> : ""}
				<Button
					variant="primary"
					onClick={() => {
						setCurrentView("addNewRecipe");
					}}
				>
					Add New Recipe
				</Button>{" "}
			</Container>

			{userRecipes.map((recipe, index) => {
				return (
					<Container>
						<div>
							<Card style={{ width: "18rem" }}>
								<Card.Body>
									<Card.Title>{recipe.name}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										Description:
									</Card.Subtitle>
									<Card.Text>{recipe.description}</Card.Text>
									<Button
										variant="primary"
										onClick={() => {
											setCurrentView("singleRecipe");
											setSelectedRecipe(userRecipes[index]);
										}}
									>
										Details
									</Button>
									{"   "}
									<OverlayTrigger
										trigger="focus"
										placement="top"
										overlay={popover(recipe.id)}
									>
										<Button variant="danger">Delete</Button>
									</OverlayTrigger>
								</Card.Body>
							</Card>
							<p
								onClick={() => {
									setCurrentView("singleRecipe");
									setSelectedRecipe(userRecipes[index]);
								}}
							></p>
						</div>
					</Container>
				);
			})}
		</div>
	);
}
