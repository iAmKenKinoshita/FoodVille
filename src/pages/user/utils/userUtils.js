import axios from "axios";

const userUtils = {
	//User Verification

	signUp: async (data, setError) => {
		try {
			const response = await axios.post("/user/signUp", {
				userName: data.username,
				userEmail: data.email,
				userPassword: data.password,
			});
			// if (response.data.accessToken) {
			// 	localStorage.setItem("user", JSON.stringify(response));
			// 	return response.data;
			// }
			return response;
		} catch (error) {
			setError(error.response.data.error, {
				message: error.response.data.message,
			});
		}
	},
	signIn: async (data, setError) => {
		try {
			const response = await axios.post("/user/logIn", {
				userEmail: data.email,
				userPassword: data.password,
			});
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response));
				return response.data;
			}
		} catch (error) {
			setError(error.response.data.error, {
				message: error.response.data.message,
			});
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

			//Return saved button to save
			// var buttons = document.getElementsByTagName("button");
			// for (let i = 0; i < buttons.length; i++) {
			// 	buttons[i].disabled = false;
			// }
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

export default userUtils;
