import { useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import EditIngredients from "./EditIngredients";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

const schema = yup.object().shape({
	recipe_name: yup
		.string()
		.min(3, "Recipe name must be at least 3 letters")
		.required("Name is required"),
	description: yup.string(),
	instruction: yup.string(),
	ingredients: yup.array().of(yup.string()),
});

function CreateNewRecipe(props) {
	const {
		handleSubmit,
		control,
		setError,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			recipeName: "",
			description: "",
			instructions: "",
			ingredients: [{ value: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	const onSubmit = async (data) => {
		console.log("This is the data", data);
	};

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
			<Modal.Body className="font-serif">
				<form className="p-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label htmlFor="recipeName" className="block font-medium mb-2">
							Recipe Name
						</label>
						<Controller
							control={control}
							name="recipeName"
							render={({ field }) => (
								<input
									type="text"
									id="recipeName"
									className="w-full p-2 border rounded-md"
									{...field}
								/>
							)}
						/>
						{errors.recipeName && (
							<p className="text-red-500">{errors.recipeName.message}</p>
						)}
					</div>

					<div className="flex flex-row">
						<div className="flex-1 pr-4">
							<div className="">
								<label htmlFor="description" className="block font-medium mb-2">
									Description
								</label>
								<Controller
									control={control}
									name="description"
									render={({ field }) => (
										<textarea
											id="description"
											rows="4"
											className="w-full p-2 border rounded-md"
											{...field}
										/>
									)}
								/>
								{errors.description && (
									<p className="text-red-500">{errors.description.message}</p>
								)}
							</div>

							<div className="mb-4">
								<label
									htmlFor="instructions"
									className="block font-medium mb-2"
								>
									Instructions
								</label>
								<Controller
									control={control}
									name="instructions"
									render={({ field }) => (
										<textarea
											id="instructions"
											rows="6"
											className="w-full p-2 border rounded-md"
											{...field}
										/>
									)}
								/>
								{errors.instructions && (
									<p className="text-red-500">{errors.instructions.message}</p>
								)}
							</div>
						</div>

						<div className="flex-1">
							{" "}
							<label htmlFor="ingredients" className="block font-medium mb-2">
								Ingredients
							</label>
							{fields.map((ingredient, index) => (
								<div key={ingredient.id} className="flex flex-col mb-2">
									<div className="flex">
										<Controller
											control={control}
											name={`ingredients[${index}].value`}
											defaultValue={ingredient.value}
											render={({ field }) => (
												<input
													type="text"
													className="w-full p-2 border rounded-md"
													{...field}
													placeholder="i.e. 1 kg potatoes, sliced"
													onChange={(e) =>
														setValue(
															`ingredients[${index}].value`,
															e.target.value
														)
													}
												/>
											)}
										/>
										{index > 0 && (
											<button
												type="button"
												className="ml-2 px-4 py-2 text-sm rounded-full bg-gray-100"
												onClick={() => remove(index)}
											>
												X
											</button>
										)}
									</div>
									<div className="flex-1 ">
										{index === fields.length - 1 && (
											<button
												type="button"
												className="bg-emerald-300 hover:bg-emerald-600 text-white font-medium rounded-md focus:outline-none p-2 mt-4"
												onClick={() => append({ value: "" })}
											>
												Add more ingredient
											</button>
										)}
									</div>
								</div>
							))}
							{errors.ingredients && (
								<p className="text-red-500">{errors.ingredients.message}</p>
							)}
						</div>
					</div>

					<button
						type="submit"
						className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md focus:outline-none p-2"
					>
						Submit
					</button>
				</form>
				<Container>
					<form id="createrecipe" onSubmit={handleSubmit(onSubmit)}>
						<div></div>

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
								<div className="border-b border-gray-500 my-2"></div>
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
