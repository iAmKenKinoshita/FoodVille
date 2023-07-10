import { useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import EditIngredients from "./EditIngredients";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

function CreateNewRecipe(props) {
	const {
		userId,
		setSelectedRecipes,
		setAllRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes,
		setCreateRecipeShow,
	} = props;

	const [ingredients, setIngredients] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [instruction, setInstruction] = useState("");

	// const userData = JSON.parse(localStorage.getItem("userData"));
	// const userId = userData[0].userId;

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="wideModal"
		>
			{/* <Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create New Recipe
				</Modal.Title>
			</Modal.Header> */}
			<Modal.Body>
				<Container>
					<form id="createrecipe">
						<Row>
							<Col lg={6} md={4}>
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
										<textarea
											className="textarea"
											type="text"
											onChange={(e) => {
												setDescription(e.target.value);
											}}
										/>
									</div>
									{/* <p className="help is-danger">This field is required</p> */}
								</div>
								<div className="field">
									<label className="label">Instructions</label>
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
							</Col>
							<Col lg={6} md={4}>
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
								<a
									className="button is-primary"
									type="button"
									onClick={() => {
										UserRecipeUtils.addIngredient(ingredients, setIngredients);
									}}
								>
									Add Ingredient
								</a>
							</Col>
						</Row>
					</form>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<button
					form="createrecipe"
					className="button is-primary create-button"
					onClick={async (e) => {
						e.preventDefault();
						await UserRecipeUtils.addNewRecipe(userId, {
							name,
							description,
							instruction,
							ingredients,
						});

						await UserRecipeUtils.getRecipes(
							userId,
							setSelectedRecipes,
							setAllRecipes,
							setAllFavoriteRecipes,
							setFoodVilleRecipes,
							setFoodVilleFavoriteRecipes,
							setUserRecipes,
							setUserFavoriteRecipes
						);
						setCreateRecipeShow(false);
					}}
				>
					Create
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateNewRecipe;
