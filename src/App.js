import React from 'react';
import TodoApp from './containers/TodoApp';

function App() {
	return (
		<div className="container">
			<nav className="navbar navbar-dark bg-dark">
				<span className="navbar-brand mb-0 h1">ToDo App</span>
			</nav>
			<br />
			<TodoApp />
		</div>
	);
}

export default App;
