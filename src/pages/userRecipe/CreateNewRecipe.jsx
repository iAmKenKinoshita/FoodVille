import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import EditIngredients from "./EditIngredients";

//UserRecipeUtils
import UserRecipeUtils from "./utils/userRecipe";

const schema = yup.object().shape({
	recipeName: yup
		.string()
		.min(3, "Recipe name must be at least 3 letters")
		.required("Name is required"),
	// description: yup.string(),
	// instruction: yup.string(),
	// ingredients: yup.array().of(yup.string()),
});

function CreateNewRecipe(props) {
	const navigate = useNavigate();

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
			ingredients: [{ ingredient_info: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	const onSubmit = async (data) => {
		console.log("This is the data", data);
		await UserRecipeUtils.addNewRecipe(userId, data);

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

		setValue("recipeName", "");
		setValue("description", "");
		setValue("instructions", "");
		setValue("ingredients", [{ ingredient_info: "" }]);

		setCreateRecipeShow(false);
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
				<form className="p-4" id="create" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							htmlFor="recipeName"
							className="block font-medium font-semibold mb-2"
						>
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
								<label
									htmlFor="description"
									className="block font-medium font-semibold mb-2"
								>
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
								{/* {errors.description && (
									<p className="text-red-500">{errors.description.message}</p>
								)} */}
							</div>

							<div className="mb-4">
								<label
									htmlFor="instructions"
									className="block font-medium font-semibold mb-2"
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
								{/* {errors.instructions && (
									<p className="text-red-500">{errors.instructions.message}</p>
								)} */}
							</div>
						</div>

						<div className="flex-1">
							{" "}
							<label
								htmlFor="ingredients"
								className="block font-medium font-semibold mb-2"
							>
								Ingredients
							</label>
							{fields.map((ingredient, index) => (
								<div key={ingredient.id} className="flex flex-col mb-2">
									<div className="flex">
										<Controller
											control={control}
											name={`ingredients[${index}].ingredient_info`}
											defaultValue={ingredient.ingredient_info}
											render={({ field }) => (
												<input
													type="text"
													className="w-full p-2 border rounded-md"
													{...field}
													placeholder="i.e. 1 kg potatoes, sliced"
													onChange={(e) =>
														setValue(
															`ingredients[${index}].ingredient_info`,
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
												onClick={() => append({ ingredient_info: "" })}
											>
												Add more ingredient
											</button>
										)}
									</div>
								</div>
							))}
							{/* {errors.ingredients && (
								<p className="text-red-500">{errors.ingredients.message}</p>
							)} */}
						</div>
					</div>

					<button
						type="submit"
						form="create"
						className="bg-emerald-300 hover:bg-emerald-400  text-white font-medium rounded-md focus:outline-none p-2"
					>
						Submit
					</button>
				</form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateNewRecipe;
