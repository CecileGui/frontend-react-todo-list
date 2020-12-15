import React from 'react';

function Todo({ item, moveOnClick, deleteOnClick }) {
	const { key, text, done } = item;

	return done ? (
		<li className="list-unstyled" key={key}>
			<label onClick={() => moveOnClick(key)}>{text}</label>
			<button className="btn float-right" onClick={() => deleteOnClick(key)}>
				<i className="fa fa-trash"></i>
			</button>
		</li>
	) : (
		<li className="styleLi" key={key}>
			<label onClick={() => moveOnClick(key)}>{text}</label>
		</li>
	);
}

export default Todo;
