/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table("recipe_ingredients", (table) => {
		table.dropColumn("amount");
		table.renameColumn("ingredient_name", "ingredient_info");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table("recipe_ingredients", (table) => {
		table.string("amount");
		table.renameColumn("ingredient_info", "ingredient_name");
	});
};
