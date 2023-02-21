// import "../../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import AuthService from "./utils/userUtils";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Profile = (props) => {
	const { setLoginView, setCurrentView } = props;

	const [err, setErr] = useState("");

	const user = JSON.parse(localStorage.getItem("userData"));

	return (
		<>
			<Container className="profile">
				<h1>Your Profile</h1>

				<Card className="profile-card">
					<Card.Title className="user-name">
						Username: {user[0].userName}
					</Card.Title>
					<Card></Card>
					<Card.Title className="card-title">User ID:</Card.Title>
					<Card.Text className="card-text">{user[0].userId}</Card.Text>
					<Card.Title className="card-title">Email Address: </Card.Title>
					<Card.Text className="card-text">{user[0].userEmail}</Card.Text>
				</Card>
				<Button
					className="button"
					onClick={() => {
						AuthService.logout();
						setCurrentView("home");
						// setLoginView("login");
					}}
				>
					Log out
				</Button>
			</Container>
		</>
	);
};

export default Profile;
