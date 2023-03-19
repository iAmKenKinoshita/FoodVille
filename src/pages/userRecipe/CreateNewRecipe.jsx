import { useState } from "react";
import { Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import EditIngredients from "./EditIngredients";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

function CreateNewRecipe(props) {
	const navigate = useNavigate();

	const [ingredients, setIngredients] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [instruction, setInstruction] = useState("");

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
					Create New Recipe
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id="createrecipe">
					<div className="field">
						<label className="label">Recipe Name</label>
						<div className="control">
							<input
								className="input"
								type="text"
								onChange={(e) => {
									setName(e.target.value);
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
								onChange={(e) => {
									setDescription(e.target.value);
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
								onChange={(e) => {
									setInstruction(e.target.value);
								}}
							/>
						</div>
					</div>
					<label className="label">Ingredients</label>
					{ingredients.map((ingredient, index) => {
						return (
							<EditIngredients
								key={index}
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
					form="createrecipe"
					className="button is-success"
					onClick={async () => {
						await UserRecipeUtils.addNewRecipe(userId, {
							name,
							description,
							instruction,
							ingredients,
						});
					}}
				>
					Create
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateNewRecipe;
