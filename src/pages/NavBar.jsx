import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//UserUtils
import UserUtils from "./user/utils/userUtils";

//Styling
import "../styles/pages/_navBar.scss";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Logo
import FVLogo from "../images/FoodVille.png";

export default function NavBar(props) {
	const navigate = useNavigate();
	const { user, setUser, userName } = props;

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

		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" onClick={() => navigate("/")}>
					<img src={FVLogo} width="112" height="28" />
				</a>

				<a
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
					onClick={() => {
						let navBurger = document.querySelector(".navbar-burger");
						navBurger.classList.toggle("is-active");
						let navBar = document.querySelector("#navbarBasicExample");
						navBar.classList.toggle("is-active");
					}}
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">
					<a
						className="navbar-item"
						onClick={() => {
							navigate("/");
							let width = window.innerWidth;
							if (width <= 1023) {
								let navBurger = document.querySelector(".navbar-burger");
								navBurger.classList.toggle("is-active");
								let navBar = document.querySelector("#navbarBasicExample");
								navBar.classList.toggle("is-active");
							}
						}}
					>
						Home
					</a>

					{user === true ? (
						<a
							class="navbar-item"
							onClick={() => {
								navigate("/recipes");
								let width = window.innerWidth;
								if (width <= 1023) {
									let navBurger = document.querySelector(".navbar-burger");
									navBurger.classList.toggle("is-active");
									let navBar = document.querySelector("#navbarBasicExample");
									navBar.classList.toggle("is-active");
								}
							}}
						>
							Recipes
						</a>
					) : (
						""
					)}
				</div>

				<div className="navbar-end">
					{user === true ||
					window.location.pathname === "/signIn" ||
					window.location.pathname === "/signUp" ? (
						""
					) : (
						<>
							<div className="navbar-item">
								<a
									className="button is-primary"
									onClick={() => {
										navigate("/signIn");
										let width = window.innerWidth;
										if (width <= 1023) {
											let navBurger = document.querySelector(".navbar-burger");
											navBurger.classList.toggle("is-active");
											let navBar = document.querySelector(
												"#navbarBasicExample"
											);
											navBar.classList.toggle("is-active");
										}
									}}
								>
									<strong>Sign In</strong>
								</a>
							</div>
						</>
					)}

					{user === true ? (
						<div className="navbar-item has-dropdown is-hoverable">
							<a className="navbar-link">{userName}</a>

							<div className="navbar-dropdown is-right">
								{/* <a className="navbar-item">My Profile</a> */}
								<a
									className="navbar-item"
									onClick={() => {
										UserUtils.signOut();
										setUser(false);
										navigate("/");
										let width = window.innerWidth;
										if (width <= 1023) {
											let navBurger = document.querySelector(".navbar-burger");
											navBurger.classList.toggle("is-active");
											let navBar = document.querySelector(
												"#navbarBasicExample"
											);
											navBar.classList.toggle("is-active");
										}
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
		</nav>
	);
}
