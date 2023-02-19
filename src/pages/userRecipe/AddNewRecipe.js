import React, { useState } from "react";
import UserRecipeUtils from "./utils/userRecipe";
import EditIngredients from "./EditIngredients";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export default function AddNewRecipe(props) {
	const { setCurrentView } = props;

	const [ingredients, setIngredients] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [instruction, setInstruction] = useState("");

	const user = JSON.parse(localStorage.getItem("userData"));
	const userId = user[0].userId;

	return (
		<>
			<Button
				variant="primary"
				type="button"
				onClick={() => setCurrentView("allRecipes")}
			>
				Back to Recipes
			</Button>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Recipe Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter recipe name"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Description:</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Enter description"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Instruction:</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Enter instruction"
						onChange={(e) => {
							setInstruction(e.target.value);
						}}
					/>
					<Row></Row>
				</Form.Group>
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
				<hr></hr>
				<Button
					variant="primary"
					type="button"
					onClick={() => {
						UserRecipeUtils.addIngredient(ingredients, setIngredients);
					}}
				>
					Add ingredient
				</Button>{" "}
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => {
						UserRecipeUtils.addNewRecipe(e, userId, setCurrentView, {
							name,
							description,
							instruction,
							ingredients,
						});
					}}
				>
					Create
				</Button>
			</Form>
		</>
	);
}
