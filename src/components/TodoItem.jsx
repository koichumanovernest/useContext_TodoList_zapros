import React, { useContext } from "react";
import { AuthContext } from "../context/Context";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const TodoItem = () => {
	const {
		saveEdit,
		setEditValue,
		toggleComplete,
		deleteTodo,
		todos,
		editTodo,
		editValue,
		editingId,
	} = useContext(AuthContext);
	return (
		<div>
			<StyledContainer>
				{todos.map((item) => (
					<StyledMapContainer
						key={item.id}
						style={{
							textDecoration: item.completed ? "line-through" : "none",
						}}>
						{editingId === item.id ? (
							<>
								<StyledContent>
									<TextField
										sx={{ width: 100,height: 50}}
										
										id="outlined-basic"
										label="Editing"
										variant="outlined"
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
									/>
									<Button
										variant="contained"
										color="success"
										onClick={() => saveEdit(item.id)}>
										Save
									</Button>
									<Button variant="outlined" color="error" onClick={false}>
										cancel
									</Button>
								</StyledContent>
							</>
						) : (
							<>
								<h1>{item.text}</h1>
								<Button
									color="secondary"
									onClick={() => toggleComplete(item.id)}>
									{item.completed ? "Undo" : "Complete"}
								</Button>
								<Button
									variant="contained"
									color="success"
									onClick={() => editTodo(item.id, item.text)}>
									Edit
								</Button>
								<Button
									variant="outlined"
									color="error"
									disabled={!item.completed}
									onClick={() => deleteTodo(item.id)}>
									Delete
								</Button>
							</>
						)}
					</StyledMapContainer>
				))}
			</StyledContainer>
		</div>
	);
};

export default TodoItem;

const StyledContainer = styled.div`
	border: 2px solid #9a9797;
	margin-top: 20px;
	padding: 20px;
`;

const StyledMapContainer = styled.div`
	border: 2px solid #a39f9f;
	margin-top: 20px;
	padding: 10px;
`;

const StyledContent = styled.div`
	
`
