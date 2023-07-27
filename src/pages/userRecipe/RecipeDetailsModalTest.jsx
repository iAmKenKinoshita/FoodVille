import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function RecipeDetailsModal(props) {
	const { selectedRecipe, user, userId } = props;
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

		console.log(selectedRecipe.instruction);
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
			</Modal.Body>
		</Modal>
	);
}

export default RecipeDetailsModal;
