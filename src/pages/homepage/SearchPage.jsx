import React, { useEffect, useState } from "react";

//Modal
import RecipeDetailsModal from "./RecipeDetailsModal";

export default function Homepage(props) {
	const { user, userId, searchRecipes } = props;
	const [selectedRecipeShow, setSelectedRecipeShow] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState("");

	useEffect(() => {}, [searchRecipes]);
	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 font-serif pt-20">
			<div className="grid md:grid-cols-3 gap-3 py-5">
				{searchRecipes
					? searchRecipes.map((recipe, index) => {
							return (
								<div
									className="hover:border-2 border-red-500 p-2 bg-white shadow-md"
									onClick={() => {
										setSelectedRecipeShow(true);
										setSelectedRecipe(recipe);
									}}
								>
									<div className="p-2">
										<img
											src={recipe.thumbnail_url}
											alt="foodimage"
											className="w-full h-36 object-cover rounded-t-lgr"
										/>
										<div className="mt-2">
											<h1 className="text-red-600 pb-">
												{recipe.tags.find((tagname) => tagname.type === "meal")
													?.display_name || ""}
											</h1>
											<h1 className="text-3xl mb-2">{recipe.name}</h1>
											{recipe.total_time_minutes &&
											recipe.total_time_minutes < 60 ? (
												<div className="flex">
													<svg
														className="meta-text__icon h-6 w-6 mr-2"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<circle cx="12" cy="12" r="10" />
														<path d="M12 6v6l4 2" />
													</svg>
													<span className="text-gray-600">
														{recipe.total_time_minutes} minutes
													</span>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								</div>
							);
					  })
					: ""}
			</div>

			<RecipeDetailsModal
				show={selectedRecipeShow}
				onHide={() => setSelectedRecipeShow(false)}
				selectedRecipe={selectedRecipe}
				user={user}
				userId={userId}
			/>
		</div>
	);
}
