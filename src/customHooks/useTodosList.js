import { useState, useEffect } from 'react';
import { getAll, serviceAdd, serviceDelete, serviceUpdate } from '../services/todosService';

export default function useTodosList() {
	const [todos, setTodos] = useState([]);
	const [doneTodos, setDoneTodos] = useState([]);
	const [doingTodos, setDoingTodos] = useState([]);
	const [fetching, setFetching] = useState(false);

	/**
	 * Fonction qui lance le refresh de la liste des Todos
	 */
	function doFetch() {
		setFetching(true);
	}

	/**
	 * Récupère le texte saisi en input
	 * Génère un todo {text: text saisi, done false}, l'enregistre en BDD, met à jour l'état local en allant chercher les todos en BDD
	 */
	const addTodo = async ({ input }) => {
		console.log('FONCTION ADD DECLENCHE SUBMISSION ');
		let todo = { text: input, done: false };

		await serviceAdd(todo);
		doFetch();
	};

	/**
	 * Appelée lors de l'appui sur un bouton de suppression
	 * @param {*} key : id unique du todo à supprimer en BDD
	 */
	const deleteTodo = async (key) => {
		console.log('delete');
		await serviceDelete(key);
		doFetch();
	};

	/**
	 * Déplace un item
	 * De "à faire" vers "fait" ou inversement
	 * @param {*} key élément unique qui désigne l'élément à déplacer
	 * les items modifiés sont enregistrés dans l'état local
	 *
	 */
	const moveTodo = async (key) => {
		console.log('fonction move : ' + key);
		let itemToUpdate = todos.find((item) => item.key === key);
		if (itemToUpdate) {
			await serviceUpdate(key, { ...itemToUpdate, done: !itemToUpdate.done });
			doFetch();
		} else {
			console.error('tried to update a todo but wrong id');
		}
		console.log('sortie move');
	};

	/**
	 * Après le montage du composant Todo List
	 * Récupére les todos en base de données
	 * [] en argument => onMount
	 * React ne n'appliquera l'effet si input n'a pas changé
	 * TODO: trouver une meilleure solution
	 */
	useEffect(() => {
		doFetch();
	}, []);

	useEffect(() => {
		/**
		 * Fait appel au service todosService
		 * va récupérer les todos et les stock dans items
		 */
		const fetchTodos = async () => {
			console.log('FETCH, fait appel service getAll');
			const resultTodos = await getAll();
			if (resultTodos) {
				setTodos(resultTodos);
			}
			setDoneTodos(resultTodos.filter((todo) => todo.done));
			setDoingTodos(resultTodos.filter((todo) => !todo.done));

			console.log('FIN FETCH');
		};

		if (fetching) {
			setFetching(false);
			fetchTodos();
		}
	}, [fetching]);

	return { doneTodos, doingTodos, doFetch, addTodo, deleteTodo, moveTodo };
}
