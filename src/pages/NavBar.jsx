import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//UserUtils
import UserUtils from "./user/utils/userUtils";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Logo
import FVLogo from "../images/FoodVille.png";

export default function NavBar(props) {
	const navigate = useNavigate();
	const { user, setUser } = props;

	// const loggedIn = localStorage.getItem("user");

	// useEffect(() => {}, [loggedIn]);

	return (
		// <>
		// 	<Navbar bg="light" variant="light">
		// 		<Nav className="me-auto">
		// 			<Nav.Link
		// 				href="#home"
		// 				onClick={() => {
		// 					setCurrentView("home");
		// 				}}
		// 			>
		// 				Home
		// 			</Nav.Link>
		// 			{loggedIn === null ? (
		// 				""
		// 			) : (
		// 				<Nav.Link
		// 					href="#myrecipes"
		// 					onClick={() => {
		// 						setCurrentView("recipes");
		// 					}}
		// 				>
		// 					My Recipes
		// 				</Nav.Link>
		// 			)}

		// 			<Nav.Link
		// 				href="#user"
		// 				onClick={() => {
		// 					setCurrentView("user");
		// 				}}
		// 			>
		// 				{loggedIn === null ? "Sign In" : "My Account"}
		// 			</Nav.Link>
		// 		</Nav>
		// 		{/* </Container> */}
		// 	</Navbar>
		// </>

		//New Code

		<>
			<nav class="navbar" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item" onClick={() => navigate("/")}>
						<img src={FVLogo} width="112" height="28" />
					</a>

					<a
						role="button"
						class="navbar-burger"
						aria-label="menu"
						aria-expanded="false"
						data-target="navbarBasicExample"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" class="navbar-menu">
					<div class="navbar-start">
						<a
							class="navbar-item"
							onClick={() => {
								navigate("/");
							}}
						>
							Home
						</a>

						{user === true ? (
							<a
								class="navbar-item"
								onClick={() => {
									navigate("/recipes");
								}}
							>
								Recipes
							</a>
						) : (
							""
						)}
					</div>

					<div class="navbar-end">
						<div class="navbar-item">
							<div class="buttons">
								{user === true ||
								window.location.pathname === "/signIn" ||
								window.location.pathname === "/signUp" ? (
									""
								) : (
									<a
										class="button is-primary"
										onClick={() => navigate("/signIn")}
									>
										<strong>Sign In</strong>
									</a>
								)}
							</div>
							{user === true ? (
								<div class="navbar-item has-dropdown is-hoverable">
									<a class="navbar-link">User's Name</a>

									<div class="navbar-dropdown is-right">
										<a class="navbar-item">My Profile</a>
										<a
											class="navbar-item"
											onClick={() => {
												UserUtils.signOut();
												setUser(false);
												navigate("/");
											}}
										>
											Log Out
										</a>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
