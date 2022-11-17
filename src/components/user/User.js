// import "../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

// import Login from "./user/Login";
// import Register from "./user/Register";
// import Profile from "./user/Profile";

import Login from "./LogIn";
import SignUp from "./SignUp";
import Profile from "./Profile";

const User = (props) => {
	const {} = props;

	const [loginView, setLoginView] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("user")) {
			setLoginView("login");
		} else {
			setLoginView("profile");
		}
	}, []);

	return (
		<>
			<div className="user-div">
				{loginView === "login" && <Login setLoginView={setLoginView} />}

				{loginView === "registration" && <SignUp setLoginView={setLoginView} />}

				{loginView === "profile" && <Profile setLoginView={setLoginView} />}
			</div>
		</>
	);
};

export default User;
