import React, { useEffect, useState } from "react";

//Styling
import "../../styles/pages/_homepage.scss";

import ListOfRecipes from "./ListOfRecipes";
import SingleRecipe from "./SingleRecipe";

import Container from "react-bootstrap/Container";

import HomepageUtils from "./utils/homepageUtils";

export default function Homepage(props) {
	const [searchRecipes, setSearchRecipes] = useState([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		console.log(searchRecipes);
	}, [searchRecipes]);

	// const [currentView, setCurrentView] = useState("listOfRecipes");
	// const [selectedRecipe, setSelectedRecipe] = useState("");

	// useEffect(() => {
	// 	if (currentView === "listOfRecipes") {
	// 		setCurrentView(
	// 			<ListOfRecipes
	// 				setCurrentView={setCurrentView}
	// 				setSelectedRecipe={setSelectedRecipe}
	// 				selectedRecipe={selectedRecipe}
	// 			/>
	// 		);
	// 	} else if (currentView === "singleRecipe") {
	// 		setCurrentView(
	// 			<SingleRecipe
	// 				selectedRecipe={selectedRecipe}
	// 				setCurrentView={setCurrentView}
	// 			/>
	// 		);
	// 	}
	// });

	// return (
	// 	<>
	// 		<Container>{currentView}</Container>
	// 	</>
	// );

	//New Code from here

	const {} = props;

	return (
		<>
			<div className="columns">
				<div className="column is-6 is-offset-one-quarter box">
					<form
						onSubmit={async (e) => {
							//Request for the backend
							e.preventDefault();
							HomepageUtils.searchRecipe(setSearchRecipes, query);
						}}
					>
						<div class="field is-grouped">
							<p class="control is-expanded">
								<input
									class="input"
									type="text"
									placeholder="Enter an ingredient or a recipe name (i.e. burger)"
									onChange={(e) => {
										setQuery(e.target.value);
										console.log("fasdfasr");
									}}
								/>
							</p>
							<p class="control">
								<button class="button is-info">Search</button>
							</p>
						</div>

						{/*For Filter Features */}
						{/* <div class="field is-grouped">
							<div class="dropdown is-hoverable">
								<div class="dropdown-trigger">
									<button
										class="button"
										aria-haspopup="true"
										aria-controls="dropdown-menu4"
									>
										<span>Hover me</span>
										<span class="icon is-small">
											<i class="fas fa-angle-down" aria-hidden="true"></i>
										</span>
									</button>
								</div>
								<div class="dropdown-menu" id="dropdown-menu4" role="menu">
									<div class="dropdown-content">
										<div class="dropdown-item">
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

			<div className="box">
				{searchRecipes.length > 0
					? `${searchRecipes.length} matching results`
					: ""}
				<div className="tile ancestor is-flex-wrap-wrap">
					{searchRecipes.map((recipe) => {
						return (
							<div class="tile is-parent is-3">
								<article class="tile is-child box">
									<p class="title">Hello World</p>
									<p class="subtitle">What is up?</p>
								</article>
							</div>
						);
					})}

					<div class="tile is-parent is-3">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent is-3">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent is-3">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
				</div>
			</div>
		</>
	);
}
