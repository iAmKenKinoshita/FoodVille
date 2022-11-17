/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	// await knex.schema.createTable("users", function (table) {
	// 	table.increments("id").primary();
	// 	table.string("username", 32).unique().notNullable();
	// 	table.string("email", 32).unique().notNullable().index();
	// 	table.string("password", 255);
	// });

	// await knex.schema.createTable("recipe", (table) => {
	// 	table.increments("id").primary().unsigned().notNullable();
	// 	table.string("name");
	// 	table.string("description");
	// 	table.string("instruction", 1500);
	// });

	// await knex.schema.createTable("recipe_ingredients", (table) => {
	// 	table.bigInteger("recipe_id").references("id").inTable("recipe");
	// 	table.string("ingredient_name");
	// 	table.string("amount");
	// });

	await knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("username", 32).unique().notNullable();
		table.string("email", 32).unique().notNullable().index();
		table.string("password", 255);
	});

	await knex.schema.createTable("recipe", (table) => {
		table.bigInteger("user_id").references("id").inTable("users");
		table.increments("id").primary().unsigned().notNullable().unique();
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
	await knex.schema.dropTable("users");
};
