import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { OverlayTrigger, Popover } from "react-bootstrap";

import HomepageUtils from "./utils/homepageUtils";

const logInPopover = (navigate) => {
	return (
		<Popover className="font-serif" id="popover-basic">
			{/* <Popover.Header className="text-center bg-gray-200">
				<p className="text-xl font-semibold">Click here to sign and save this recipe!</p>
			</Popover.Header> */}
			<Popover.Body className="p-2 bg-gray-100">
				<p className="font-md">
					Click{" "}
					<Link to={"/signIn"}>
						<strong className="text-lg text-blue-500 underline decoration-blue-500">
							here
						</strong>
					</Link>{" "}
					to sign-in and save this recipe!
				</p>
			</Popover.Body>
		</Popover>
	);
};

function RecipeDetailsModal(props) {
	const { selectedRecipe, user, userId } = props;
	const navigate = useNavigate();

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

				<div className="md:flex flex-row">
					<div className="flex-2 bg-white">
						<img
							src={selectedRecipe.thumbnail_url}
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
											Ingredients
										</th>
									</tr>
								</thead>
								<tbody>
									{selectedRecipe &&
										selectedRecipe.sections.map((item) => {
											return (
												<>
													{item.components.map((ingredient, index) => {
														return (
															<tr
																key={index}
																className={
																	index % 2 === 0 ? "bg-gray-100" : "bg-white"
																}
															>
																<td className="">{ingredient.raw_text}</td>
															</tr>
														);
													})}
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
					{selectedRecipe.instructions &&
						selectedRecipe.instructions.map((instruction, index) => {
							return (
								<div key={index} className="flex items-start">
									<span className="">{index + 1 + ". "} </span>
									<span className="">{instruction.display_text}</span>
								</div>
							);
						})}
				</div>

				<div className="border-b border-gray-500 my-2"></div>

				{user && userId ? (
					<button
						className="bg-emerald-300 hover:bg-emerald-400 text-white font-medium px-4 py-2 rounded-md focus:outline-none"
						onClick={async () => {
							props.onHide();
							// setEditRecipeShow(true);
							if (user && userId !== null) {
								HomepageUtils.saveApiRecipe(userId, selectedRecipe);
							}
						}}
					>
						Save this recipe!
					</button>
				) : (
					<button className="bg-emerald-300 hover:bg-emerald-400 text-white font-medium rounded-md focus:outline-none">
						<OverlayTrigger
							trigger="focus"
							placement="top"
							overlay={logInPopover(navigate)}
						>
							<button
								href="#"
								className="bg-emerald-300 hover:bg-emerald-400 text-white font-medium rounded-md focus:outline-none p-2"
							>
								Save this recipe!
							</button>
						</OverlayTrigger>
					</button>
				)}
			</Modal.Body>
		</Modal>
	);
}

export default RecipeDetailsModal;
