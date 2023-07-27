import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserUtils from "./utils/userUtils";

const schema = yup.object().shape({
	username: yup
		.string()
		.required("Username is required")
		.min(5, "Username must be at least 5 characters"),
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm Password is required")
		.oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const SignUp = (props) => {
	const { setUser } = props;
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const response = await UserUtils.signUp(data, setError);
		if (response) {
			const signInResponse = await UserUtils.signIn(data, setError);
			const userData = await UserUtils.getUserData(signInResponse.accessToken);
			localStorage.setItem("userData", JSON.stringify(userData));
			setUser(true);
			navigate("/recipes");
		}
	};

	const navigate = useNavigate();

	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 pt-20">
			<div className="max-w-md mx-auto mt-8 p-5 border rounded-lg shadow-md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label htmlFor="username" className="block font-medium mb-2">
							Username
						</label>
						<Controller
							name="username"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<input
									{...field}
									type="text"
									id="username"
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							)}
						/>
						<p className="text-red-500 mt-1">{errors.username?.message}</p>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block font-medium mb-2">
							Email
						</label>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<input
									{...field}
									type="text"
									id="email"
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							)}
						/>
						<p className="text-red-500 mt-1">{errors.email?.message}</p>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block font-medium mb-2">
							Password
						</label>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<input
									{...field}
									type="password"
									id="password"
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							)}
						/>
						<p className="text-red-500 mt-1">{errors.password?.message}</p>
					</div>
					<div className="mb-4">
						<label htmlFor="confirmPassword" className="block font-medium mb-2">
							Confirm Password
						</label>
						<Controller
							name="confirmPassword"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<input
									{...field}
									type="password"
									id="confirmPassword"
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							)}
						/>
						<p className="text-red-500 mt-1">
							{errors.confirmPassword?.message}
						</p>
					</div>

					<div>
						<button
							type="submit"
							className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none"
						>
							Sign Up
						</button>
						<p className="text-gray-600 mt-4 text-center">
							Have an account already?{" "}
							<a
								onClick={() => {
									navigate("/signIn");
								}}
								className="text-blue-500"
							>
								Sign In
							</a>
						</p>
					</div>
				</form>
			</div>
		</div>
		// <>
		// 	<div className="columns signInUp">
		// 		<div className="column is-5 is-offset-one-quarter">
		// 			<div className="">
		// 				<form
		// 					className="box"
		// 					onSubmit={async (e) => {
		// 						e.preventDefault();
		// 						if (password !== confirmPassword) {
		// 							return console.log("password not matched");
		// 						}

		// 						if (username && email && password && confirmPassword) {
		// 							await UserUtils.signUp(username, email, password);
		// 							navigate("/signIn");
		// 						}
		// 					}}
		// 				>
		// 					<div className="field">
		// 						<label className="label">Username</label>
		// 						<div className="control">
		// 							<input
		// 								className="input"
		// 								type="text"
		// 								onChange={(e) => {
		// 									setUserName(e.target.value);
		// 								}}
		// 							/>
		// 						</div>
		// 						{/* <p className="help is-danger">This field is required</p> */}
		// 					</div>
		// 					<div className="field">
		// 						<label className="label">Email address</label>
		// 						<div className="control">
		// 							<input
		// 								className="input"
		// 								type="email"
		// 								onChange={(e) => {
		// 									setEmail(e.target.value);
		// 								}}
		// 							/>
		// 						</div>
		// 						{/* <p className="help is-danger">This field is required</p> */}
		// 					</div>
		// 					<div className="field">
		// 						<label className="label">Password</label>
		// 						<div className="control">
		// 							<input
		// 								className="input"
		// 								type="password"
		// 								onChange={(e) => {
		// 									setPassword(e.target.value);
		// 								}}
		// 							/>
		// 						</div>
		// 					</div>
		// 					<div className="field">
		// 						<label className="label">Confirm Password</label>
		// 						<div className="control">
		// 							<input
		// 								className="input"
		// 								type="password"
		// 								onChange={(e) => {
		// 									setConfirmPassword(e.target.value);
		// 								}}
		// 							/>
		// 						</div>
		// 					</div>
		// 					<button className="button is-primary">Sign Up</button>
		// 					<p className="help">
		// 						Have an account already?{" "}
		// 						<a
		// 							href="javascript:void(0);"
		// 							onClick={() => {
		// 								navigate("/signIn");
		// 							}}
		// 						>
		// 							<strong>Sign In here</strong>!
		// 						</a>
		// 					</p>
		// 				</form>
		// 			</div>
		// 		</div>
		// 	</div>
		// </>
	);
};

export default SignUp;
