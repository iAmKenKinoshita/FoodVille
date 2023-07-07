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
			if (data.data.accessToken) {
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

			//Return saved button to save
			var buttons = document.getElementsByTagName("button");
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].disabled = false;
			}
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
