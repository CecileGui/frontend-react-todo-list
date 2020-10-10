import React from 'react';

function TodoForm({ input, setInput, addTodo }) {
	/**
	 * Met à jour le champ input de l'état local, permettant d'avoir accès à ce qui est en train d'être saisi via l'état local
	 * @param {*} e :onChange de l'input de saisie de nouveau todo
	 */
	function handleChange(e) {
		console.log('handleChange');
		setInput(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		addTodo({ input });
		setInput('');
	}

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<input
				className="form-control form-control-lg"
				placeholder="add todo"
				value={input}
				onChange={(e) => handleChange(e)}
			></input>
		</form>
	);
}

export default TodoForm;
