import React, { useEffect, useState } from "react";

//Bootstrap
import { OverlayTrigger } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

//Styling
import "../../styles/pages/_homepage.scss";

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
		<div className="homepage-container">
			<div className="columns is-mobile">
				<div className="column is-6 is-offset-3  box search-bar">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
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

						{/*For Filter Features */}
						{/* <div className="field is-grouped">
							<div className="dropdown is-hoverable">
								<div className="dropdown-trigger">
									<button
										className="button"
										aria-haspopup="true"
										aria-controls="dropdown-menu4"
									>
										<span>Hover me</span>
										<span className="icon is-small">
											<i className="fas fa-angle-down" aria-hidden="true"></i>
										</span>
									</button>
								</div>
								<div className="dropdown-menu" id="dropdown-menu4" role="menu">
									<div className="dropdown-content">
										<div className="dropdown-item">
											<p>
												You can insert <strong>any type of content</strong>{" "}
												within the dropdown menu.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</form>
				</div>
			</div>

			<div className="columns">
				<div className="column is-offset-1">
					<h6 className="title is-5 featured">Featured Recipes</h6>
				</div>
			</div>

			<div className="columns">
				{featuredRecipes.length > 0 ? (
					<div className="recipe-container-homepage column is-10 is-offset-1">
						<div className="tile ancestor is-flex-wrap-wrap">
							{featuredRecipes.map((recipe, index) => {
								return (
									<div className="tile is-parent is-2">
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
											<footer className="card-footer">
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
											</footer>
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
