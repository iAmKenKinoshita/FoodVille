import React, { useState } from "react";

export default function AddNewRecipe(props) {
	const { setCurrentView } = props;

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [instruction, setInstruction] = useState("");

	const user = JSON.parse(localStorage.getItem("userData"));
	const userId = user[0].userId;

	const addNewRecipe = (e) => {
		e.preventDefault();
		fetch(`userRecipe/createNewRecipe/${userId}`, {
			method: "POST",
			headers: {
				name: name,
				description: description,
				instruction: instruction,
			},
		});
		setCurrentView("allRecipes");
	};

	return (
		<>
			<button type="button" onClick={() => setCurrentView("allRecipes")}>
				Back
			</button>
			<form>
				<input
					onChange={(e) => {
						setName(e.target.value);
					}}
					type="text"
					placeholder="Name"
				></input>
				<textarea
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					rows="5"
					cols="33"
					placeholder="Description"
				></textarea>
				<textarea
					onChange={(e) => {
						setInstruction(e.target.value);
					}}
					rows="5"
					cols="33"
					placeholder="Instruction"
				></textarea>
				<button onClick={addNewRecipe}>Create</button>
			</form>
		</>
	);
}
