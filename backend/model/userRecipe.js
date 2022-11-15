const knex = require("../knex");

module.exports = {
	getAllRecipeList() {
		return knex
			.select({
				id: "id",
				name: "name",
				description: "description",
				instruction: "instruction",
			})
			.from("recipe");
	},

	getAllIngredients(id) {
		return knex
			.select({
				ingredient_name: "ingredient_name",
				amount: "amount",
			})
			.from("recipe_ingredients")
			.where({ recipe_id: id });
	},

	createNewRecipe(name, description, instruction) {
		return knex("recipe").insert({
			name: name,
			description: description,
			instruction: instruction,
		});
	},

	addIngredients(name, amount, id) {
		return knex("recipe_ingredients").insert({
			recipe_id: id,
			ingredient_name: name,
			amount: amount,
		});
	},

	deleteIngredients(id) {
		return knex("recipe_ingredients").where({ recipe_id: id }).del();
	},
	deleteRecipe(id) {
		return knex("recipe").where({ id: id }).del();
	},

	editRecipe(recipeDetails) {
		for (const index of recipeDetails) {
			console.log(index);
		}
	},
};
