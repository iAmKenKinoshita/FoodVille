import React from "react";

export default function Navbar(props) {
	const { setCurrentView } = props;

	return (
		<>
			<div>
				<span
					onClick={() => {
						setCurrentView("home");
					}}
				>
					Home
				</span>
				<span
					onClick={() => {
						setCurrentView("recipes");
					}}
				>
					My Recipes
				</span>
			</div>
		</>
	);
}
