import React, { useEffect, useState } from "react";
import { Modal, Popover, OverlayTrigger } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import UserRecipeUtils from "./utils/userRecipe";

const deletePopover = (
	ID,
	currentRecipes,
	setSelectedRecipes,
	allRecipes,
	setAllRecipes,
	setAllFavoriteRecipes,
	setFoodVilleRecipes,
	setFoodVilleFavoriteRecipes,
	setUserRecipes,
	setUserFavoriteRecipes
) => {
	return (
		<Popover id="popover-basic">
			{/* <Popover.Header as="h2">Delete confirmation</Popover.Header> */}
			<Popover.Body className="p-2 bg-gray-100 font-serif">
				{/* <p className="font-semibold">Delete Recipe?</p> */}
				<p className="font-xl font-thin p-1">
					This will permanently delete your recipe. Proceed deleting this
					recipe?
				</p>

				<div className="grid grid-cols-2 gap-1">
					<button
						onClick={() => {
							UserRecipeUtils.deleteRecipe(ID);
							window.location.reload();
							// UserRecipeUtils.handleDelete(
							// 	ID,
							// 	currentRecipes,
							// 	setSelectedRecipes,
							// 	allRecipes,
							// 	setAllRecipes,
							// 	setAllFavoriteRecipes,
							// 	setFoodVilleRecipes,
							// 	setFoodVilleFavoriteRecipes,
							// 	setUserRecipes,
							// 	setUserFavoriteRecipes
							// );
						}}
						className="grid-1 bg-emerald-300 hover:bg-emerald-400 rounded-md focus:outline-none text-white p-2"
					>
						Yes
					</button>
					<button className="grid-1 bg-emerald-300 hover:bg-emerald-400 rounded-md focus:outline-none text-white p-2">
						No
					</button>
				</div>
			</Popover.Body>
		</Popover>
	);
};

function RecipeDetailsModal(props) {
	const {
		user,
		userId,
		selectedRecipe,
		currentRecipes,
		setSelectedRecipes,
		allRecipes,
		setAllRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes,
		setEditRecipeShow,
	} = props;
	const navigate = useNavigate();

	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);

	useEffect(() => {
		if (selectedRecipe !== "") {
			fetch(`userRecipe/ingredients/${selectedRecipe.id}`)
				.then((result) => result.json())
				.then((data) => setIngredients(data));
			setInstructions(selectedRecipe.instruction.split("."));
		}
	}, [selectedRecipe]);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="wideModal"
		>
			<Modal.Body className="font-serif">
				<h1 className="text-4xl text-center mb-2">{selectedRecipe.name}</h1>
				<div className="border-b border-gray-600 my-2"></div>
				<div className="flex flex-row ">
					<div className="flex-2 bg-white">
						<img
							src={
								selectedRecipe.image_url ||
								"https://bulma.io/images/placeholders/256x256.png"
							}
							alt="foodimage"
							className="w-full h-full object-cover rounded-t-lgr flex-1"
						/>
					</div>
					<div className="flex-1 pl-2 ">
						<div className="flex justify-center">
							<table className="table-auto w-44">
								<thead>
									<tr>
										<th className="border-b border-dotted font-semibold">
											{ingredients.length < 1 ? "" : "Ingredients"}
										</th>
									</tr>
								</thead>
								<tbody>
									{ingredients &&
										ingredients.map((ingredient, index) => {
											return (
												<>
													<tr
														key={index}
														className={
															index % 2 === 0 ? "bg-gray-100" : "bg-white"
														}
													>
														<td className="">{ingredient.ingredient_info}</td>
													</tr>
												</>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="pt-2">
					{/* <h1 className="font-semibold mb-1">Description</h1> */}
					<p>{selectedRecipe.description}</p>
				</div>
				<div className="border-b border-gray-500 my-2"></div>
				<div className="flex flex-col">
					<h1 className="font-semibold mb-1">Instructions</h1>
					{/* Algo when dot. found make another line */}
					{selectedRecipe.instruction &&
						selectedRecipe.instruction.split(".").map((instruction, index) => {
							return (
								<div key={index} className="flex items-start">
									<span className="">{index + 1 + ". "} </span>
									<span className="">{instruction}</span>
								</div>
							);
						})}
				</div>
				<div className="border-b border-gray-500 my-2"></div>

				<div className="grid grid-cols-3">
					<OverlayTrigger
						trigger="focus"
						placement="top"
						overlay={deletePopover(
							selectedRecipe.id,
							currentRecipes,
							setSelectedRecipes,
							allRecipes,
							setAllRecipes,
							setAllFavoriteRecipes,
							setFoodVilleRecipes,
							setFoodVilleFavoriteRecipes,
							setUserRecipes,
							setUserFavoriteRecipes
						)}
					>
						<button className="bg-rose-400 hover:bg-rose-600 text-white font-medium rounded-md focus:outline-none p-2 mt-4 mr-2">
							Delete
						</button>
					</OverlayTrigger>
					<button
						onClick={() => {
							props.onHide();
							setEditRecipeShow(true);
						}}
						className="bg-emerald-300 hover:bg-emerald-600 text-white font-medium rounded-md focus:outline-none p-2 mt-4 mr-2"
					>
						Edit
					</button>
					<button
						onClick={async () => {
							await UserRecipeUtils.addOrRemoveFavorite(
								selectedRecipe.id,
								selectedRecipe.is_favorite
							);
							// window.location.reload();
							console.log("Added to favorite");
							await UserRecipeUtils.handleFavorite(
								selectedRecipe,
								currentRecipes,
								setSelectedRecipes,
								allRecipes,
								setAllFavoriteRecipes,
								setFoodVilleRecipes,
								setFoodVilleFavoriteRecipes,
								setUserRecipes,
								setUserFavoriteRecipes
							);
						}}
						className="bg-emerald-300 hover:bg-emerald-400 text-white font-medium rounded-md focus:outline-none p-2 mt-4"
					>
						{selectedRecipe.is_favorite
							? "Remove from Favorites"
							: "Add to Favorites"}
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default RecipeDetailsModal;
