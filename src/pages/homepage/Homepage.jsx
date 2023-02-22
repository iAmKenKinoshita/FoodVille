import React, { useEffect, useState } from "react";

//Styling
import "../../styles/pages/_homepage.scss";

import ListOfRecipes from "./ListOfRecipes";
import SingleRecipe from "./SingleRecipe";

import Container from "react-bootstrap/Container";

export default function Homepage(props) {
	const [search, setSearch] = useState(null);

	const [currentView, setCurrentView] = useState("listOfRecipes");
	const [selectedRecipe, setSelectedRecipe] = useState("");

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

	// const {} = props;

	return (
		<>
			<div className="columns">
				<div className="column is-6 is-offset-one-quarter box">
					<form
						onSubmit={async (e) => {
							//Request for the backend
							e.preventDefault();
							console.log("hello");
						}}
					>
						<div class="field is-grouped">
							<p class="control is-expanded">
								<input
									class="input"
									type="text"
									placeholder="Enter an ingredient or a recipe name (i.e. burger)"
									onChange={(e) => {
										setSearch(e.target.value);
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
				There are blah2 results!
				<div className="tile ancestor">
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>

					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
				</div>
				<div className="tile ancestor">
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>

					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
				</div>
				<div className="tile ancestor">
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Hello World</p>
							<p class="subtitle">What is up?</p>
						</article>
					</div>

					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
					<div class="tile is-parent">
						<article class="tile is-child box">
							<p class="title">Third column</p>
							<p class="subtitle">With some content</p>
							<div class="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat
									facilisis.
								</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		</>
	);
}
