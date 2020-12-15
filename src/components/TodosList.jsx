import React from 'react';
import Todo from './Todo';

function TodosList({ todos, id, moveOnClick, deleteOnClick }) {
	return (
		<div className="todolist">
			<ul className="no-padding" id={id}>
				{todos.map((item) => (
					<Todo item={item} moveOnClick={moveOnClick} deleteOnClick={deleteOnClick} />
				))}
			</ul>
		</div>
	);
}

export default TodosList;
