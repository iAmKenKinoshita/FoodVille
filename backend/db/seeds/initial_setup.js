/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("recipe_ingredients").del();
	await knex("recipe").del();
	
	await knex("recipe").insert([
		{
			id: 1,
			name: "Sunny-Side-Up Eggs",
			description: "Simple yet amazing egg dish",
			instruction:
				"Heat the oil in a medium nonstick skillet over low heat until slightly shimmering, about 5 minutes. Crack an egg into a small ramekin and slowly add it to the skillet; repeat with the other egg, adding it to the other side of the skillet. Cover with a tight lid and cook, uninterrupted, until the whites are completely set but the yolks are still runny, 2 to 2 1/2 minutes. Slide the eggs out of the skillet onto a plate or toast. Season with salt and pepper.",
		},
	]);
	await knex("recipe_ingredients").insert([
		{
			recipe_id: 1,
			ingredient_name: "Olive Oil",
			amount: "1 teaspoon",
		},
		{
			recipe_id: 1,
			ingredient_name: "Eggs",
			amount: "2",
		},
		{
			recipe_id: 1,
			ingredient_name: "Salt",
			amount: "To Taste",
		},
		{
			recipe_id: 1,
			ingredient_name: "Pepper",
			amount: "To Taste",
		},
	]);
	await knex("recipe").insert([
		{
			id: 2,
			name: "Scrambled Eggs",
			description: "Simple scrambled egg",
			instruction:
				"Lightly whisk 2 large eggs, 6 tbsp single cream or full cream milk and a pinch of salt together until the mixture has just one consistency. Heat a small non-stick frying pan for a minute or so, then add a knob of butter and let it melt. Don’t allow the butter to brown or it will discolour the eggs. Pour in the egg mixture and let it sit, without stirring, for 20 seconds. Stir with a wooden spoon, lifting and folding it over from the bottom of the pan. Let it sit for another 10 seconds then stir and fold again. Repeat until the eggs are softly set and slightly runny in places. Remove from the heat and leave for a moment to finish cooking. Give a final stir and serve the velvety scramble without delay.",
		},
	]);
	await knex("recipe_ingredients").insert([
		{
			recipe_id: 2,
			ingredient_name: "Butter",
			amount: "1 tablespoon",
		},
		{
			recipe_id: 2,
			ingredient_name: "Eggs",
			amount: "2",
		},
		{
			recipe_id: 2,
			ingredient_name: "Salt",
			amount: "To Taste",
		},
		{
			recipe_id: 2,
			ingredient_name: "Cream",
			amount: "6 tablespoon",
		},
		
	]);
};
