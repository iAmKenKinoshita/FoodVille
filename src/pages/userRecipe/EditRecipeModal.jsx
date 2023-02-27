import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import EditIngredients from "./EditIngredients";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

function EditRecipeModal(props) {
	const { selectedRecipe } = props;

	const [ingredients, setIngredients] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState("");

	const ID = selectedRecipe.id;

	useEffect(() => {
		if (selectedRecipe !== "") {
			fetch(`userRecipe/ingredients/${selectedRecipe.id}`)
				.then((result) => result.json())
				.then((data) => {
					setIngredients(data);
					setRecipeDetails(selectedRecipe);
				});
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
					Edit Recipe
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id="edit-recipe-form">
					<div className="field">
						<label className="label">Recipe Name</label>
						<div className="control">
							<input
								className="input"
								type="text"
								name="name"
								value={recipeDetails.name}
								onChange={(e) => {
									UserRecipeUtils.onRecipeDetailChange(
										e.target,
										recipeDetails,
										setRecipeDetails
									);
								}}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Description</label>
						<div className="control">
							<input
								className="input"
								type="text"
								value={recipeDetails.description}
								name="description"
								onChange={(e) => {
									UserRecipeUtils.onRecipeDetailChange(
										e.target,
										recipeDetails,
										setRecipeDetails
									);
								}}
							/>
						</div>
						<p className="help is-danger">This field is required</p>
					</div>
					<div className="field">
						<label className="label">Instruction</label>
						<div className="control">
							<textarea
								className="textarea"
								type="text"
								name="instruction"
								value={recipeDetails.instruction}
								onChange={(e) => {
									UserRecipeUtils.onRecipeDetailChange(
										e.target,
										recipeDetails,
										setRecipeDetails
									);
								}}
							/>
						</div>
					</div>
					<label className="label">Ingredients</label>
					{ingredients.map((ingredient, index) => {
						return (
							<EditIngredients
								// key={index}
								ingredient={ingredient}
								onIngredientChange={UserRecipeUtils.onIngredientChange}
								index={index}
								deleteIngredient={UserRecipeUtils.deleteIngredient}
								setIngredients={setIngredients}
								ingredients={ingredients}
							/>
						);
					})}
					<button
						className="button is-primary"
						type="button"
						onClick={() => {
							UserRecipeUtils.addIngredient(ingredients, setIngredients);
						}}
					>
						Add Ingredient
					</button>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="button is-success"
					form="edit-recipe-form"
					onClick={() => {
						if (recipeDetails.is_fv === true) {
							recipeDetails.is_fv = false;
						}
						UserRecipeUtils.saveRecipeChanges(
							ID,
							ingredients,
							recipeDetails
						);
					}}
				>
					Save Changes
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditRecipeModal;
