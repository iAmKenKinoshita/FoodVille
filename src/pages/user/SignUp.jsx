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
			<div className="columns signInUp">
				<div className="column is-5 is-offset-one-quarter">
					<div className="">
						<form
							className="box"
							onSubmit={async (e) => {
								e.preventDefault();
								if (password !== confirmPassword) {
									return console.log("password not matched");
								}

								if (username && email && password && confirmPassword) {
									await UserUtils.signUp(username, email, password);
									navigate("/signIn");
								}
							}}
						>
							<div className="field">
								<label className="label">Username</label>
								<div className="control">
									<input
										className="input"
										type="text"
										onChange={(e) => {
											setUserName(e.target.value);
										}}
									/>
								</div>
								{/* <p className="help is-danger">This field is required</p> */}
							</div>
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
								{/* <p className="help is-danger">This field is required</p> */}
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
							<div className="field">
								<label className="label">Confirm Password</label>
								<div className="control">
									<input
										className="input"
										type="password"
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
									/>
								</div>
							</div>
							<button className="button is-primary">Sign Up</button>
							<p className="help">
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
