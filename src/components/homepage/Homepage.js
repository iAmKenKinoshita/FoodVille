import React, { useEffect, useState } from "react";
import ListOfRecipes from "./ListOfRecipes";
import SingleRecipe from "./SingleRecipe";

export default function Homepage(props) {
	const [currentView, setCurrentView] = useState("listOfRecipes");
	const [selectedRecipe, setSelectedRecipe] = useState("");

	useEffect(() => {
		if (currentView === "listOfRecipes") {
			setCurrentView(
				<ListOfRecipes
					setCurrentView={setCurrentView}
					setSelectedRecipe={setSelectedRecipe}
					selectedRecipe={selectedRecipe}
				/>
			);
		} else if (currentView === "singleRecipe") {
			setCurrentView(<SingleRecipe selectedRecipe={selectedRecipe} />);
		}
	});

	return <>{currentView}</>;
}
