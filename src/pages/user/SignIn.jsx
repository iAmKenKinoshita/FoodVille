// import "../../styles/User.css";

import { useRef, useState, useEffect } from "react";
import UserUtils from "./utils/userUtils";

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pages/_signInUp.scss";

const Login = (props) => {
	const { user, setUser, setLoginView, setCurrentView } = props;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	return (
		// <>
		// 	<Container className="login">
		// 		<h1>Log in</h1>
		// 		<Form>
		// 			<Form.Group className="mb-3">
		// 				<Form.Label className="form-label">Email address</Form.Label>
		// 				<Form.Control
		// 					type="email"
		// 					placeholder="Enter your email address"
		// 					onChange={(e) => {
		// 						setEmail(e.target.value);
		// 					}}
		// 				/>
		// 				<Form.Text className="text-muted"></Form.Text>
		// 			</Form.Group>

		// 			<Form.Group className="mb-3" controlId="formBasicPassword">
		// 				<Form.Label className="form-label">Password</Form.Label>
		// 				<Form.Control
		// 					type="password"
		// 					placeholder="Password"
		// 					onChange={(e) => {
		// 						setPassword(e.target.value);
		// 					}}
		// 				/>
		// 			</Form.Group>

		// 			<Button
		// 				className="button"
		// 				variant="primary"
		// 				type="submit"
		// 				onClick={async () => {
		// 					await AuthService.login(email, password).then((res) => {
		// 						AuthService.getUserData(res.accessToken).then((res) => {
		// 							localStorage.setItem("userData", JSON.stringify(res));
		// 							if (err === "") {
		// 								setCurrentView("home");
		// 								// setLoginView("profile");
		// 							}
		// 						});
		// 					});
		// 				}}
		// 			>
		// 				Log in
		// 			</Button>

		// 			<br />
		// 			<div id="signup-div">
		// 				<Form.Label>Don't have an account?</Form.Label>
		// 				<Button
		// 					id="signup"
		// 					variant="link"
		// 					onClick={() => {
		// 						setLoginView("registration");
		// 					}}
		// 				>
		// 					Sign up
		// 				</Button>
		// 			</div>
		// 		</Form>
		// 	</Container>
		// </>

		//New Code
		<>
			<div className="columns">
				<div className="column is-5 is-offset-one-quarter">
					<div className="">
						<form
							className="box"
							onSubmit={async (e) => {
								e.preventDefault();
								let data = await UserUtils.signIn(email, password);
								let userData = await UserUtils.getUserData(data.accessToken);
								console.log(userData);
								localStorage.setItem("userData", JSON.stringify(userData));
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
								Don't have an account yet? Sign Up{" "}
								<a href="/signUp">
									<strong>here</strong>!
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
