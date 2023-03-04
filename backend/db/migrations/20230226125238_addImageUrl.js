/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.string("image_url", 1000);
	});
};

/**infex
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table("recipe", (table) => {
		table.dropColumn("image_url");
	});
};
