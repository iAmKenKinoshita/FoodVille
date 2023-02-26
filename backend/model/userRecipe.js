const knex = require("../knex");

module.exports = {
	getAllRecipeList(id) {
		return knex
			.select({
				id: "id",
				name: "name",
				description: "description",
				instruction: "instruction",
				is_fv: "is_fv",
			})
			.from("recipe")
			.where({ user_id: id });
	},

	getAllIngredients(id) {
		return knex
			.select({
				ingredient_info: "ingredient_info",
				//Old Code
				// ingredient_name: "ingredient_name",
				// amount: "amount",
			})
			.from("recipe_ingredients")
			.where({ recipe_id: id });
	},

	createNewRecipe(userId, name, description, instruction, is_fv) {
		return knex("recipe").insert({
			user_id: userId,
			name: name,
			description: description,
			instruction: instruction,
			is_fv: is_fv,
		});
	},

	deleteIngredients(id) {
		return knex("recipe_ingredients").where({ recipe_id: id }).del();
	},
	deleteRecipe(id) {
		return knex("recipe").where({ id: id }).del();
	},

	editRecipeDetails(details, id) {
		console.log(details.is_fv);
		return knex("recipe").where({ id: id }).update({
			name: details.name,
			description: details.description,
			instruction: details.instruction,
			is_fv: details.is_fv,
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

	saveApiRecipe(userId, selectedRecipe) {

		const instructions = [];
		const name = selectedRecipe.name
		const description = selectedRecipe.description

		selectedRecipe.instructions.map((instruction) => {
			instructions.push(instruction.display_text);
		});

		instructions.join(" ");
		// console.log(selectedRecipe.name, instructions);

		return knex("recipe").insert({
			user_id: userId,
			name: name,
			description: description,
			instruction: instructions,
			is_fv: true,
		});
	},
	saveApiRecipeIngredients(selectedRecipe) {},
};
