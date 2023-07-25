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
	const [query, setQuery] = useState("");

	useEffect(() => {
		HomepageUtils.getFeaturedRecipes(setFeaturedRecipes);
	}, []);

	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
			<div className="text-center p-2">
				<h1 className="text-4xl font-bold mb-2">Quick Meal Recipes</h1>
				<p className="italic">
					"Effortless and Flavorful: Discover a Delectable Array of Quick Meals
					for Your Busy Days! From Sizzling Stir-Fries to Savory One-Pot
					Wonders, Embrace the Culinary Magic of Fast and Easy Cooking"
				</p>
			</div>

			<div className="flex flex-col md:flex-row py-3">
				{/* Horizontal tiles */}
				<div className="flex-1 flex-row mr-4">
					<div className="flex-1 h-48 flex flex-row hover:border-2 border-red-500 ">
						<div className="flex-1 max-w-md mx-auto p-4">
							<img
								src={
									"https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/e9b0deddea1544129967ec01ea3a1624.jpeg"
								}
								alt="foodimage"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="flex-1 pt-5 flex flex-col">
							<div className="flex-1 grow">
								<h1 className="text-red-600 pb-">Dinner</h1>
								<h1 className="text-3xl font-bold mb-2">BLTA Hotdogs</h1>
							</div>

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
								<span className="text-gray-600">45 mins</span>
							</div>
						</div>
					</div>
					<div className="flex-1 h-48 flex flex-row hover:border-2 border-red-500">
						<div className="flex-1 max-w-md mx-auto p-4">
							<img
								src={
									"https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/e9b0deddea1544129967ec01ea3a1624.jpeg"
								}
								alt="foodimage"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="flex-1 pt-5 flex flex-col">
							<div className="flex-1 grow">
								<h1 className="text-red-600 pb-">Dinner</h1>
								<h1 className="text-3xl font-bold mb-2">BLTA Hotdogsdddddd</h1>
							</div>

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
								<span className="text-gray-600">45 mins</span>
							</div>
						</div>
					</div>
				</div>

				{/* Vertical tile */}
				<div className="flex-1 flex-initial w-80 flex flex-col hover:border-2 border-red-500 pt-4">
					<div className="flex-1 max-w-md mx-auto px-3">
						<img
							src={
								"https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/e9b0deddea1544129967ec01ea3a1624.jpeg"
							}
							alt="foodimage"
							className="w-full h-auto rounded-lg shadow-md"
						/>
					</div>
					<div className="flex-1 pl-2 grow">
						<h1 className="text-red-600 pb-">Dinner</h1>
						<h1 className="text-3xl font-bold mb-2">BLTA Hotdogsdddddd</h1>
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
							<span className="text-gray-600">45 mins</span>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="columns is-mobile">
				<div className="column is-6 is-offset-3  box search-bar">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							document.querySelector(".search").classList.add("is-loading");
							await HomepageUtils.searchRecipe(setSearchRecipes, query);

							navigate("/search");
						}}
					>
						<div className="field is-grouped">
							<p className="control is-expanded">
								<input
									className="input"
									type="text"
									placeholder={"Search recipe"}
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</p>
							{window.screen.width > 1026 ? (
								<p className="control">
									<button className="button search">Search</button>
								</p>
							) : (
								""
							)}
						</div>
					</form>
				</div>
			</div> */}

			<div className="grid grid-cols-3 pl-1">
				{featuredRecipes.length > 0
					? featuredRecipes.map((recipe, index) => {
							return (
								<div
									className="hover:border-2 border-red-500 p-2"
									onClick={() => {
										setSelectedRecipeShow(true);
										setSelectedRecipe(recipe.item);
									}}
								>
									<div className="p-2">
										<img
											src={recipe.item.thumbnail_url}
											alt="foodimage"
											className="w-full h-36 object-cover rounded-t-lgr"
										/>
										<div className="mt-2">
											<h1 className="text-red-600 pb-">Dinner</h1>
											<h1 className="text-3xl font-bold mb-2">
												{recipe.item.name}
											</h1>
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
												<span className="text-gray-600">45 mins</span>
											</div>
										</div>
									</div>
								</div>
							);
					  })
					: ""}

				{/**Diffrent */}
			</div>

			<div className="columns">
				{featuredRecipes.length > 0 ? (
					<div className="recipe-container-homepage column is-10 is-offset-1">
						<div className="tile ancestor is-flex-wrap-wrap">
							{featuredRecipes.map((recipe, index) => {
								return (
									<div className="tile is-parent is-4">
										<article className="tile is-child card">
											<div classNameName="card-image">
												<figure className="image is-square is-4by3">
													<img src={recipe.item.thumbnail_url} />
												</figure>
											</div>
											<div className="card-content">
												<div className="media">
													<div className="media-content">
														<p className="title is-6">{recipe.item.name}</p>
													</div>
												</div>
											</div>

											{/* <p className="subtitle">{recipe.description}</p> */}
											{/* <footer className="card-footer">
												<a
													className="card-footer-item"
													onClick={() => {
														setSelectedRecipeShow(true);
														setSelectedRecipe(recipe.item);
													}}
												>
													Details
												</a>
												{user && userId !== null ? (
													<a
														className="card-footer-item"
														disabled={recipe.disabled}
														onClick={(e) => {
															if (user && userId !== null) {
																HomepageUtils.saveApiRecipe(
																	userId,
																	recipe.item
																);
																e.target.disabled = true;
																recipe.disabled = true;
																e.target.innerText = "Saved";
															}
															if (!user) {
															}
														}}
													>
														{recipe.disabled ? "Saved" : "Save"}
													</a>
												) : (
													<OverlayTrigger
														trigger="focus"
														placement="top"
														overlay={HomepageUtils.logInPopover(navigate)}
													>
														<a href="#" className="card-footer-item">
															Save
														</a>
													</OverlayTrigger>
												)}
											</footer> */}
										</article>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					""
				)}
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
