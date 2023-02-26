/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.string("instruction", 5000).alter();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.string("instruction", 1500).alter();
	});
};
