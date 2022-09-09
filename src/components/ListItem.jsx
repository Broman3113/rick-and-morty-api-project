import React from 'react';

const ListItem = ({
	todo,
	removingStatus,
	onChangeCheckbox,
	onRemoveTodo,
	removingError,
}) => {
	return (
		<li>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => onChangeCheckbox(todo.id)}
			/>
			{todo.title}{' '}
			<button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
			{removingStatus === 'loading' && <span>"Removing..."</span>}
			{removingError.find(item => item.id === todo.id) && (
				<span>
					Error occurred while removing item:{' '}
					{removingError.find(item => item.id === todo.id).error}
				</span>
			)}
		</li>
	);
};

export default ListItem;
