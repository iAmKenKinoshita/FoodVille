const knex = require("../knex");

module.exports = {
	// getAllRecipeList() {
	// 	return knex
	// 		.select({
	// 			id: "id",
	// 			name: "name",
	// 			description: "description",
	// 			instruction: "instruction",
	// 		})
	// 		.from("recipe");
	// },
	getAllRecipeList(id) {
		return knex
			.select({
				id: "id",
				name: "name",
				description: "description",
				instruction: "instruction",
			})
			.from("recipe")
			.where({ user_id: id });
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

	createNewRecipe(userId, name, description, instruction) {
		console.log(userId, name, description, instruction);
		return knex("recipe").insert({
			user_id: userId,
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

	editRecipeDetails(details, id) {
		return knex("recipe").where({ id: id }).update({
			name: details.name,
			description: details.description,
			instruction: details.instruction,
		});
	},

	async editRecipeIngredients(ingredients, id) {
		if (ingredients.length !== 0) {
			for (const ingredient of ingredients) {
				ingredient.recipe_id = id;
			}
			return await knex("recipe_ingredients").insert(ingredients);
		}
	},
};
