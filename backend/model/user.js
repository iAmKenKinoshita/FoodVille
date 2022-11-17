const knex = require("../knex");

module.exports = {
	getAllUsers() {
		return knex
			.select({
				userId: "id",
				userName: "username",
				userEmail: "email",
				userPassword: "password",
			})
			.from("users");
	},

	getUserByEmail(userEmail) {
		return knex
			.select({
				userId: "id",
				userName: "username",
				userEmail: "email",
			})
			.from("users")
			.where("email", "=", userEmail);
	},

	sendUserData(data) {
		const { userName, userEmail, userPassword } = data;
		return knex("users").insert({
			username: userName,
			email: userEmail,
			password: userPassword,
		});
	},
};
