import React from "react";

//Bootstrap
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function AllRecipeList(props) {
	const { setCurrentView, setSelectedRecipe, userRecipes } = props;

	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Popover right</Popover.Header>
			<Popover.Body>
				And here's some <strong>amazing</strong> content. It's very engaging.
				right?
			</Popover.Body>
		</Popover>
	);

	const deleteRecipe = (id) => {
		fetch(`userRecipe/deleteRecipe/${id}`, {
			method: "DELETE",
		});
		console.log(id);
		console.log("This is delete");
	};

	return (
		<div>
			<button
				onClick={() => {
					setCurrentView("addNewRecipe");
				}}
			>
				Add New Recipe
			</button>
			{userRecipes.map((recipe, index) => {
				return (
					<div>
						<p
							onClick={() => {
								setCurrentView("singleRecipe");
								setSelectedRecipe(userRecipes[index]);
							}}
						>
							{recipe.name}
						</p>
						<p>{recipe.description}</p>
						{/* <OverlayTrigger trigger="click" placement="right" overlay={popover}>
							<Button variant="success">Click me to see</Button>
						</OverlayTrigger> */}
						<button
							onClick={() => {
								const ID = recipe.id;
								deleteRecipe(ID);
								setCurrentView("allRecipes");
							}}
						>
							Delete
						</button>
					</div>
				);
			})}
		</div>
	);
}
