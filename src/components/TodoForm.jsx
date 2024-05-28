import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Context";
import { Button, TextField } from "@mui/material";
import { BASE_URL } from "../utils/constants/Index";

const TodoForm = () => {
	const { getTodos } = useContext(AuthContext);
	const [value, setValue] = useState("");


	const addTodo = async (e) => {
		e.preventDefault();
		const newData = {
			text: value,
			completed: false,
		};
		try {
			await fetch(BASE_URL,{
				method:"POST",
				headers:{
					"Content-Type" : "application/json"
				},
				body: JSON.stringify(newData)
			})
			getTodos()
			setValue("")
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<form onSubmit={addTodo}> 
				<TextField 
				id="outlined-basic"
				label="name" 
				variant="outlined"
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button type="submit" variant="contained" color="success" disabled={value.trim().length === 0}>Add todo</Button>
			</form>
		</div>
	);
};

export default TodoForm;
