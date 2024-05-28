import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants/Index";

const AuthContext = createContext();

const Context = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState("");

	const getTodos = async () => {
		try {
			const response = await fetch(BASE_URL);
			const data = await response.json();
			setTodos(data);  // Replace the existing todos with the fetched data
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await fetch(`${BASE_URL}/${id}`, {
				method: "DELETE",
			});
			setTodos(todos.filter(todo => todo.id !== id));  // Optimistically update the state
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const toggleComplete = async (id) => {
		const todo = todos.find((item) => item.id === id);
		if (todo) {
			const updatedTodo = { ...todo, completed: !todo.completed };
			try {
				await fetch(`${BASE_URL}/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedTodo),
				});
				setTodos(todos.map(item => item.id === id ? updatedTodo : item));  // Optimistically update the state
			} catch (error) {
				console.error("Error toggling todo:", error);
			}
		}
	};

	const editTodo = (id, text) => {
		setEditingId(id);
		setEditValue(text);
	};

	const saveEdit = async (id) => {
		const todo = todos.find((item) => item.id === id);
		if (todo) {
			const updatedTodo = { ...todo, text: editValue };
			try {
				await fetch(`${BASE_URL}/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedTodo),
				});
				setTodos(todos.map(item => item.id === id ? updatedTodo : item));  // Optimistically update the state
				setEditingId(null);
				setEditValue("");
			} catch (error) {
				console.error("Error saving todo:", error);
			}
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				todos,
				setTodos,
				editingId,
				saveEdit,
				editTodo,
				toggleComplete,
				deleteTodo,
				getTodos,
				setEditValue,
				editValue,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, Context };
