import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserUtils from "./utils/userUtils";

//Styling
import "../../styles/pages/_signInUp.scss";

const SignIn = (props) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	return (
		<>
			<div className="columns">
				<div className="column is-5 is-offset-one-quarter">
					<div className="">
						<form
							className="box"
							onSubmit={async (e) => {
								e.preventDefault();
								if (email && password) {
									let data = await UserUtils.signIn(email, password);
									let userData = await UserUtils.getUserData(data.accessToken);
									console.log(userData);
									localStorage.setItem("userData", JSON.stringify(userData));
								}
							}}
						>
							<div className="field">
								<label className="label">Email address</label>
								<div className="control">
									<input
										className="input"
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
							</div>
							<div className="field">
								<label className="label">Password</label>
								<div className="control">
									<input
										className="input"
										type="password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
							</div>
							<button className="button is-primary">Sign in</button>
							<p className="help">
								Don't have an account yet?{" "}
								<a
									href="javascript:void(0);"
									onClick={() => {
										navigate("/signUp");
									}}
								>
									<strong>Sign Up here!</strong>
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignIn;
