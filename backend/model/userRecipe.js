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
				image_url: "image_url",
				is_favorite: "is_favorite",
			})
			.from("recipe")
			.where({ user_id: id });
	},

	getAllIngredients(id) {
		return knex
			.select({
				ingredient_info: "ingredient_info",
			})
			.from("recipe_ingredients")
			.where({ recipe_id: id });
	},

	createNewRecipe(userId, name, description, instruction, is_fv, is_favorite) {
		return knex("recipe").insert({
			user_id: userId,
			name: name,
			description: description,
			instruction: instruction,
			is_fv: is_fv,
			is_favorite: is_favorite,
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
		let instructions = [];
		const name = selectedRecipe.name;
		const description = selectedRecipe.description;
		const image_url = selectedRecipe.thumbnail_url;

		selectedRecipe.instructions.map((instruction) => {
			instructions.push(instruction.display_text);
		});

		instructions = instructions.join(" ");
		// console.log(instructions);

		return knex("recipe")
			.insert({
				user_id: userId,
				name: name,
				description: description,
				instruction: instructions,
				is_fv: true,
				image_url: image_url,
			})
			.returning("id");
	},
	saveApiRecipeIngredients(recipeId, selectedRecipe) {
		const ingredients = [];
		selectedRecipe.sections.map((section) => {
			section.components.map((ingredient) => {
				ingredients.push({
					ingredient_info: ingredient.raw_text,
					recipe_id: recipeId,
				});
			});
		});
		return knex("recipe_ingredients").insert(ingredients);
	},
	addToFavorites(recipeId, is_favorite) {
		return knex("recipe").where({ id: recipeId }).update({
			is_favorite: is_favorite,
		});
	},
};
