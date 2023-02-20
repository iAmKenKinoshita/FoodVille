import React, { useEffect, useState } from "react";

//Styling
import "../../styles/pages/_homepage.scss";

import ListOfRecipes from "./ListOfRecipes";
import SingleRecipe from "./SingleRecipe";

import Container from "react-bootstrap/Container";

export default function Homepage(props) {
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
	// 		setCurrentView(<SingleRecipe selectedRecipe={selectedRecipe} setCurrentView={setCurrentView}/>);
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
			<div className="homepage-container">
				<div>
					<form
						onSubmit={() => {
							//Request for the backend
							console.log("hello");
						}}
					>
						<input placeholder="Insert a recipe name"></input>
					</form>
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
