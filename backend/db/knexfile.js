require("dotenv").config({ path: "../../.env.local" });

module.exports = {
	development: {
		client: "postgresql", // or pg,
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
	production: {
		client: "postgresql", //or pg
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
};
