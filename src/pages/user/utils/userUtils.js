import axios from "axios";

const userUtils = {
	//User Verification

	signUp: async (username, email, password) => {
		try {
			let data = await axios.post("/user/signUp", {
				userName: username,
				userEmail: email,
				userPassword: password,
			});
			if (data.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(data));
				return data.data;
			}
		} catch (error) {
			console.log(error);
		}
	},
	signIn: async (email, password) => {
		try {
			let data = await axios.post("/user/logIn", {
				userEmail: email,
				userPassword: password,
			});
			console.log("this is data", data);
			if (data.data.accessToken) {
				console.log("There is an Access Token");
				localStorage.setItem("user", JSON.stringify(data));
				return data.data;
			}
		} catch (error) {
			console.log(error);
		}
	},
	getUserData: async (token) => {
		try {
			let data = await axios.post("/user/userProfile", {
				accessToken: token,
			});
			return data.data;
		} catch (error) {
			console.log(error);
		}
	},
	signOut: () => {
		try {
			localStorage.removeItem("user");
			localStorage.removeItem("userData");
		} catch (error) {
			console.log(error);
		}
	},
	getCurrentUser: () => {
		try {
			return JSON.parse(localStorage.getItem("user"));
		} catch (error) {
			console.log(error);
		}
	},
};

/////OLD CODES
//send Email and password to backend
const signUp = async (username, email, password) => {
	return await axios
		.post("/user/signUp", {
			userName: username,
			userEmail: email,
			userPassword: password,
		})
		.then((res) => {
			if (res.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(res.data));
			}
		});
};

//get token from server
const signIn = async (email, password) => {
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

const signOut = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("userData");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

export default userUtils;
