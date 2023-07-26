import React, { useEffect, useState } from "react";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import FVLogo from "../../images/FoodVille.png";

//Styling
// import "../../styles/pages/_homepage.scss";

//Modal
import RecipeDetailsModal from "./RecipeDetailsModal";

import HomepageUtils from "./utils/homepageUtils";

export default function Homepage(props) {
	const navigate = useNavigate();

	const {
		user,
		userId,
		searchRecipes,
		setSearchRecipes,
		featuredRecipes,
		setFeaturedRecipes,
	} = props;

	// const [featuredRecipes, setFeaturedRecipes] = useState("");
	const [selectedRecipeShow, setSelectedRecipeShow] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState("");

	useEffect(() => {
		HomepageUtils.getFeaturedRecipes(setFeaturedRecipes);
	}, []);

	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 font-serif pt-24">
			<div className="text-center p-2">
				<h1 className="text-4xl mb-2">Quick Meal Recipes</h1>
				<p className="italic">
					"Effortless and Flavorful: Discover a Delectable Array of Quick Meals
					for Your Busy Days! From Sizzling Stir-Fries to Savory One-Pot
					Wonders, Embrace the Culinary Magic of Fast and Easy Cooking"
				</p>
			</div>

			<div className="grid grid-rows-2 grid-flow-col gap-3 md:flex-row py-3">
				{/* Horizontal tiles */}
				{featuredRecipes
					? featuredRecipes.map((recipe, index) => {
							if (index <= 1) {
								return (
									<div
										className="row-span-1 mr-4 bg-white"
										onClick={() => {
											setSelectedRecipeShow(true);
											setSelectedRecipe(recipe);
										}}
									>
										<div className="flex flex-row hover:border-2 border-red-500 ">
											<div className="flex-1 max-w-md mx-auto p-4">
												<img
													src={recipe.thumbnail_url}
													alt="foodimage"
													className="w-full h-36 object-cover rounded-t-lgr"
												/>
											</div>
											<div className="flex-1 pt-3 flex flex-col">
												<div className="flex-1 grow">
													<h1 className="text-red-600 pb-">Dinner</h1>
													<h1 className="text-3xl mb-2">{recipe.name}</h1>
												</div>

												{recipe.total_time_minutes &&
												recipe.total_time_minutes < 60 ? (
													<div className="flex flex-1">
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
							}
							if (index === 2) {
								return (
									<div
										className="row-span-2 hover:border-2 border-red-500 p-2 bg-white"
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
												<h1 className="text-red-600 pb-">Dinner</h1>
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
							}
					  })
					: ""}
			</div>

			<div className="grid grid-cols-3 gap-3 py-5">
				{featuredRecipes
					? featuredRecipes.map((recipe, index) => {
							if (index >= 3) {
								return (
									<div
										className="hover:border-2 border-red-500 p-2 bg-white"
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
													{recipe.tags.find(
														(tagname) => tagname.type === "meal"
													)?.display_name || ""}
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
							}
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
