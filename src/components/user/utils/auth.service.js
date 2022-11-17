import axios from "axios";

//send Email and password to backend
const signup = async (username, email, password) => {
	return await axios
		.post("/user/signUp", {
			userName: username,
			userEmail: email,
			userPassword: password,
		})
		.then((res) => {
			console.log(res);
			if (res.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(res.data));
			}
		});
};

//get token from server
const login = async (email, password) => {
	return await axios
		.post("/user/logIn", {
			userEmail: email,
			userPassword: password,
		})
		.then((res) => {
			if (res.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(res.data));
			}

			return res.data;
		});
};

const getUserData = async (token) => {
	return await axios
		.post("/user/userProfile", {
			accessToken: token,
		})
		.then((res) => {
			return res.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("userData");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const authService = {
	signup,
	login,
	logout,
	getUserData,
	getCurrentUser,
};

export default authService;
