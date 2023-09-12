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
			navigate("/savedrecipes");
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
							className="bg-emerald-300 hover:bg-emerald-400 text-white font-medium px-4 py-2 rounded-md focus:outline-none"
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
	);
};

export default SignUp;
