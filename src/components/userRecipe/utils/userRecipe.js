exports.addNewRecipe = (
	e,
	userId,
	setCurrentView,
	{ name, description, instruction, ingredients }
) => {
	e.preventDefault();
	fetch(`userRecipe/createNewRecipe/${userId}`, {
		method: "POST",
		headers: {
			name: name,
			description: description,
			instruction: instruction,
			ingredients: JSON.stringify(ingredients),
		},
	}).then(() => setCurrentView("allRecipes"));
};

exports.deleteRecipe = (id, setCurrentView) => {
	fetch(`userRecipe/deleteRecipe/${id}`, {
		method: "DELETE",
	}).then(() => setCurrentView("allRecipes"));
};

exports.onIngredientChange = (
	{ name, value },
	index,
	ingredients,
	setIngredients
) => {
	const clonedIngredients = [...ingredients];
	clonedIngredients.splice(index, 1, {
		...ingredients[index],
		[name]: value,
	});
	setIngredients(clonedIngredients);
};

exports.onRecipeDetailChange = (
	{ name, value },
	recipeDetails,
	setRecipeDetails
) => {
	const clonedSelectedRecipe = { ...recipeDetails };
	clonedSelectedRecipe[name] = value;
	setRecipeDetails(clonedSelectedRecipe);
};

exports.addIngredient = (ingredients, setIngredients) => {
	const clonedIngredients = [...ingredients];
	const ingredientData = { ingredient_name: "", amount: "" };
	clonedIngredients.push(ingredientData);
	setIngredients(clonedIngredients);
};

exports.deleteIngredient = (index, ingredients, setIngredients) => {
	const clonedIngredients = [...ingredients];
	clonedIngredients.splice(index, 1);
	setIngredients(clonedIngredients);
};

exports.handleSubmit = (e, id, setCurrentView, ingredients, recipeDetails) => {
	e.preventDefault();
	fetch(`userRecipe/editRecipe/${id}`, {
		method: "PATCH",
		headers: {
			ingredients: JSON.stringify(ingredients),
			recipeDetails: JSON.stringify(recipeDetails),
		},
	}).then(() => {
		setCurrentView("allRecipes");
	});
};
