import React, { useEffect } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationBar(props) {
	const { setCurrentView } = props;

	const loggedIn = localStorage.getItem("user");

	useEffect(() => {}, [loggedIn]);

	return (
		<>
			<Navbar bg="light" variant="light">
				{/* <Container> */}
				{/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
				<Nav className="me-auto">
					<Nav.Link
						href="#home"
						onClick={() => {
							setCurrentView("home");
						}}
					>
						Home
					</Nav.Link>
					{loggedIn === null ? (
						""
					) : (
						<Nav.Link
							href="#myrecipes"
							onClick={() => {
								setCurrentView("recipes");
							}}
						>
							My Recipes
						</Nav.Link>
					)}

					<Nav.Link
						href="#user"
						onClick={() => {
							setCurrentView("user");
						}}
					>
						{loggedIn === null ? "Sign In" : "My Account"}
					</Nav.Link>
				</Nav>
				{/* </Container> */}
			</Navbar>
		</>
	);
}
