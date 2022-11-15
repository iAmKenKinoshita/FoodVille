import React from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationBar(props) {
	const { setCurrentView } = props;

	return (
		<>
			<div>
				<div
					onClick={() => {
						setCurrentView("home");
					}}
				>
					Home
				</div>
				<div
					onClick={() => {
						setCurrentView("recipes");
					}}
				>
					My Recipes
				</div>
			</div>
			<>
				<br />
				<Navbar bg="light" variant="light">
					<Container>
						<Navbar.Brand href="#home">Navbar</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#features">Features</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</>
		</>
	);
}
