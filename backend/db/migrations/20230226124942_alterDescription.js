/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.string("name", 500).alter();
		table.string("description", 2000).alter();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.string("name", 255).alter();
		table.string("description", 255).alter();
	});
};
