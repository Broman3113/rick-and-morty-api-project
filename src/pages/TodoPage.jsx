import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import {
	addTodo,
	fetchTodos,
	removeTodoThunk,
	toggleComplete,
} from '../store/todoSlice';

const TodoPage = () => {
	const [title, setTitle] = useState('');
	const dispatch = useDispatch();

	const { todos, status, error, removingStatus, removingError } = useSelector(
		state => state.todo
	);

	const onAddTodo = () => {
		dispatch(addTodo({ title }));
	};
	const onRemoveTodo = id => {
		dispatch(removeTodoThunk(id));
	};
	const onChangeCheckbox = id => {
		dispatch(toggleComplete({ id }));
	};
	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);
	return (
		<div>
			<h1>Todo Page</h1>
			<div>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<button onClick={onAddTodo}>Add</button>
			</div>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'error' && (
				<p>Error occurred during fetch todos with status: {error}</p>
			)}
			{status === 'ok' && (
				<ul>
					{todos.map(todo => (
						<ListItem
							key={todo.id}
							todo={todo}
							removingStatus={removingStatus}
							onChangeCheckbox={onChangeCheckbox}
							onRemoveTodo={onRemoveTodo}
							removingError={removingError}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoPage;
