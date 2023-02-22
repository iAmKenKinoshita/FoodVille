import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserUtils from "./utils/userUtils";

const SignUp = (props) => {
	const navigate = useNavigate();

	const [username, setUserName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [err, setErr] = useState("");
	const [errPwd, setErrPwd] = useState("");

	return (
		<>
			<div className="columns">
				<div className="column is-5 is-offset-one-quarter">
					<div className="">
						<form
							className="box"
							onSubmit={async (e) => {
								e.preventDefault();
								if (username && email && password && confirmPassword) {
									await UserUtils.signUp(username, email, password);
									navigate("/");
								}
							}}
						>
							<div class="field">
								<label class="label">Username</label>
								<div class="control">
									<input
										class="input"
										type="text"
										onChange={(e) => {
											setUserName(e.target.value);
										}}
									/>
								</div>
								<p class="help is-danger">This field is required</p>
							</div>
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
								<p class="help is-danger">This field is required</p>
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
							<div class="field">
								<label class="label">Confirm Password</label>
								<div class="control">
									<input
										class="input"
										type="password"
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
									/>
								</div>
							</div>
							<button class="button is-primary">Sign Up</button>
							<p class="help">
								Have an account already?{" "}
								<a
									href="javascript:void(0);"
									onClick={() => {
										navigate("/signIn");
									}}
								>
									<strong>Sign In here</strong>!
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
