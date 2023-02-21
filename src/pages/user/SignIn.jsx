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
							<div class="field">
								<label class="label">Email address</label>
								<div class="control">
									<input
										class="input"
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
							</div>
							<div class="field">
								<label class="label">Password</label>
								<div class="control">
									<input
										class="input"
										type="password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
							</div>
							<button class="button is-primary">Sign in</button>
							<p class="help">
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
