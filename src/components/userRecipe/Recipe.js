import React, { useState, useEffect } from "react";
import AllRecipeList from "./AllRecipeList";
import SingleRecipeList from "./SingleRecipe";
import AddNewRecipe from "./AddNewRecipe";
import AddIngredients from "./AddIngredients";
import EditRecipe from "./EditRecipe";

export default function Recipe() {
	const [currentView, setCurrentView] = useState("allRecipes");
	const [selectedRecipe, setSelectedRecipe] = useState("");
	const [userRecipes, setUserRecipes] = useState([]);

	const user = JSON.parse(localStorage.getItem("userData"));
	const userId = user[0].userId;

	useEffect(() => {
		fetch(`userRecipe/list/${userId}`)
			.then((result) => result.json())
			.then((data) => setUserRecipes(data));
	});
	useEffect(() => {
		if (currentView === "allRecipes") {
			fetch(`userRecipe/list/${userId}`)
				.then((result) => result.json())
				.then((data) => {
					setUserRecipes(data);
					setCurrentView(
						<AllRecipeList
							setCurrentView={setCurrentView}
							userRecipes={userRecipes}
							setSelectedRecipe={setSelectedRecipe}
							setUserRecipes={setUserRecipes}
						/>
					);
				});
		} else if (currentView === "singleRecipe") {
			setCurrentView(
				<SingleRecipeList
					selectedRecipe={selectedRecipe}
					setCurrentView={setCurrentView}
				/>
			);
		} else if (currentView === "addNewRecipe") {
			setCurrentView(<AddNewRecipe setCurrentView={setCurrentView} />);
		} else if (currentView === "addIngredients") {
			setCurrentView(
				<AddIngredients
					selectedRecipe={selectedRecipe}
					setCurrentView={setCurrentView}
				/>
			);
		} else if (currentView === "editRecipe") {
			setCurrentView(
				<EditRecipe
					setCurrentView={setCurrentView}
					selectedRecipe={selectedRecipe}
				/>
			);
		}
	});

	return <>{currentView}</>;
}
