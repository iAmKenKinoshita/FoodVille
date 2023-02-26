import React from "react";
import { Popover } from "react-bootstrap";

import UserRecipeUtils from "./utils/userRecipe";

function DeletePopOver(props) {
	console.log(props);
	return (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Delete confirmation?</Popover.Header>
			<Popover.Body>
				Are you sure you want to <strong>delete</strong> this recipe?
			</Popover.Body>
			<button
				className="button is-danger"
				onClick={() => {
					// UserRecipeUtils.deleteRecipe(ID);
					console.log(props);
				}}
			>
				Yes
			</button>{" "}
			<button className="button">No</button>{" "}
		</Popover>
	);
}

export default DeletePopOver;
