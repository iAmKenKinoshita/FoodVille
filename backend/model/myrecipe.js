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
			amount: "amount"
		})
		.from("recipe_ingredients")
		.where({recipe_id: id})
	} 

	



};
