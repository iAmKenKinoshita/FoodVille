const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user");

exports.logIn = async (req, res) => {
	const { userEmail, userPassword } = req.body;
	let allUsers = [];

	await userModel.getAllUsers().then((data) => {
		return (allUsers = data);
	});

	let user = allUsers.find((user) => {
		return user.userEmail === userEmail;
	});

	//If no user found
	if (!user) {
		res.status(400).send({
			error: "email",
			message: "Invalid email",
		});
	} else {
		let isMatch = await bcrypt.compare(userPassword, user.userPassword);

		if (isMatch) {
			const accessToken = await jwt.sign(
				{ userEmail },
				process.env.SECRET_KEY,
				{
					algorithm: "HS256",
					expiresIn: "1h",
				}
			);

			const refreshToken = await jwt.sign(
				{ userEmail },
				process.env.SECRET_KEY,
				{
					algorithm: "HS256",
					expiresIn: "5m",
				}
			);

			res.send({
				accessToken,
				refreshToken,
				message: "Login successful",
			});
		} else {
			//If the password is wrong
			res.status(400).send({
				error: "password",
				message: "Wrong credentials",
			});
		}
	}
};

exports.signUp = async (req, res) => {
	let allUsers = [];
	await userModel.getAllUsers().then((data) => {
		return (allUsers = data);
	});

	const user = allUsers.find((user) => {
		return user.userEmail === req.body.userEmail;
	});

	const username = allUsers.find((username) => {
		return username.userName === req.body.userName;
	});

	//If username is found
	if (username) {
		return res.status(400).send({
			error: "username",
			message: "This username is already taken",
		});
	}

	//If user is found
	if (user) {
		return res.status(400).send({
			error: "email",
			message: "This email address already taken",
		});
	}

	let bcryptPassword = bcrypt.hashSync(req.body.userPassword, 10);
	req.body.userPassword = bcryptPassword;

	await userModel.sendUserData(req.body).then((data) => {
		res.status(201).send({
			message: "Data transmission completed!",
			auth: { email: req.body.userEmail, password: req.body.userPassword },
		});
	});
};

exports.authToken = async (req, res, next) => {
	const token = req.body.accessToken;

	if (token) {
		const secret = process.env.SECRET_KEY;

		await jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(403).send({
					error: "Invalid token",
				});
			} else {
				req.userEmail = decoded.userEmail;
				next();
			}
		});
	} else {
		res.status(404).send({
			error: "Token not found",
		});
	}
};

exports.userProfile = async (req, res) => {
	await userModel.getUserByEmail(req.userEmail).then((data) => {
		res.send(data);
	});
};
