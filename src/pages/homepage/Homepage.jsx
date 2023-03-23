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

	const { user, userId, searchRecipes, setSearchRecipes } = props;

	const [selectedRecipeShow, setSelectedRecipeShow] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {}, [searchRecipes]);

	return (
		<div className="homepage-container">
			<div className="columns is-mobile">
				<div className="column is-6 is-offset-3  box search-bar">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							HomepageUtils.searchRecipe(setSearchRecipes, query);
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
									<button className="button is-info">Search</button>
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

			{searchRecipes.length > 0 ? (
				<div className="columns">
					<div className="column is-offset-2">
						<h6 className="subtitle is-6 result">
							{searchRecipes.length} matching results
						</h6>
					</div>
				</div>
			) : (
				""
			)}
			<div className="columns">
				{searchRecipes.length > 0 ? (
					<div className="box recipe-container-homepage column is-8 is-offset-2">
						<div className="tile ancestor is-flex-wrap-wrap">
							{searchRecipes.map((recipe, index) => {
								return (
									<div className="tile is-parent is-3">
										<article className="tile is-child card">
											<div classNameName="card-image">
												<figure className="image is-square is-4by3">
													<img src={recipe.thumbnail_url} />
												</figure>
											</div>
											<div className="card-content">
												<div className="media">
													<div className="media-content">
														<p className="title is-6">{recipe.name}</p>
														{/* <p className="subtitle is-6">@johnsmith</p> */}
													</div>
												</div>
											</div>

											{/* <p className="subtitle">{recipe.description}</p> */}

											<footer className="card-footer">
												<a
													className="card-footer-item"
													onClick={() => {
														setSelectedRecipeShow(true);
														setSelectedRecipe(recipe);
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
																HomepageUtils.saveApiRecipe(userId, recipe);
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
														<a
															href="#"
															className="card-footer-item button is-primary"
														>
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
