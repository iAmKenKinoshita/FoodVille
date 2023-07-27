import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserUtils from "./utils/userUtils";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
	// .min(6, "Password must be at least 6 characters"),
});

const SignIn = (props) => {
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const response = await UserUtils.signIn(data, setError);
		const userData = await UserUtils.getUserData(response.accessToken);
		localStorage.setItem("userData", JSON.stringify(userData));
		setUser(true);
		navigate("/recipes");
	};

	const { user, setUser } = props;
	const navigate = useNavigate();

	return (
		<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 pt-20">
			<div className="max-w-md mx-auto mt-8 p-5 border rounded-lg shadow-md">
				<form onSubmit={handleSubmit(onSubmit)}>
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
					<div>
						<button
							type="submit"
							className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none"
						>
							Sign In
						</button>
						<p className="text-gray-600 mt-4 text-center">
							Don't have an account?{" "}
							<a
								onClick={() => {
									navigate("/signUp");
								}}
								className="text-blue-500"
							>
								Sign Up
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
		// 						if (email && password) {
		// 							let data = await UserUtils.signIn(email, password);
		// 							let userData = await UserUtils.getUserData(data.accessToken);
		// 							localStorage.setItem("userData", JSON.stringify(userData));
		// 							setUser(true);
		// 							navigate("/");
		// 						}
		// 					}}
		// 				>
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
		// 					<button className="button is-primary">Sign in</button>
		// 					<p className="help">
		// 						Don't have an account yet?{" "}
		// 						<a
		// 							href="javascript:void(0);"
		// 							onClick={() => {
		// 								navigate("/signUp");
		// 							}}
		// 						>
		// 							<strong>Sign Up here!</strong>
		// 						</a>
		// 					</p>
		// 				</form>
		// 			</div>
		// 		</div>
		// 	</div>
		// </>
	);
};

export default SignIn;
