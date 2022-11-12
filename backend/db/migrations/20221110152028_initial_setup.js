/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("recipe", (table) => {
		table.increments("id").primary().unsigned().notNullable();
		table.string("name");
		table.string("description");
		table.string("instruction", 1500);
	});

	await knex.schema.createTable("recipe_ingredients", (table) => {
		table.bigInteger("recipe_id").references("id").inTable("recipe");
		table.string("ingredient_name");
		table.string("amount");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.schema.dropTable("recipe_ingredients");
	await knex.schema.dropTable("recipe");
};
