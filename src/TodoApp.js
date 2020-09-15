import React, { useState, useEffect } from 'react'
import aXios from 'axios' // aide à la transcription http
import './Todo.css'
import getAll, { serviceAdd } from './todosService.js'

/**
 * Composant représentant une Todo List
 */
export default function TodoApp() {

    /**
     * Etat initial de la Todo List
     * TODO: définir un objet item
     */
    const [ items, setItems ] = useState([])
    const [ input, setInput] = useState('')

    /**
     * Après le montage du composant Todo List
     * Récupére les todos en base de données
     * [input] est passé en argument pour éviter d'entrer dans une boucle infinie render -> récupérer données ->
     * maj useState -> render etc...
     * React ne n'appliquera l'effet si input n'a pas changé
     * TODO: trouver une meilleure solution
     */
    useEffect(() => {
        fetch()
    }, [input])

    /**
     * Déplace un item
     * De "à faire" vers "fait" ou inversement
     * @param {*} key élément unique qui désigne l'élément à déplacer
     * les items modifiés sont enregistrés dans l'état local
     * 
     */
   function move(key) {
        console.log("fonction move : " + key)       
        items.map((item) => {
            if(item.key === key){
                let itemToUpdate = { key: item.key, text: item.text, done: (!item.done) }
                aXios.put('http://localhost:4000/todos/'+key, itemToUpdate).then((res) => {
                    fetch()
                })             
                return
            }
            //return item
            console.log("sortie move")
        })       
    }

    /**
     * Fait appel au service todosService
     * va récupérer les todos et les stock dans items
     */
    async function fetch() {
        console.log("FETCH, fait appel service getAll")
        const stock =  await getAll();
        setItems(stock)
        console.log("FIN FETCH")
    }

    /**
     * Récupère le texte saisi en input
     * Génère un todo {text: text saisi, done false}, l'enregistre en BDD, met à jour l'état local en allant chercher les todos en BDD
     * @param {*} e : submission du formulaire d'ajout de todo // TODO: e inutile, à virer
     */
    async function add() {
        console.log("FONCTION ADD DECLENCHE SUBMISSION !!!!!!!!!!!!!!!!!!!!!!!!!!")     
        let todo = {text: input, done :false}
        await serviceAdd(todo)    
    }

    /**
     * Met à jour le champ input de l'état local, permettant d'avoir accès à ce qui est en train d'être saisi via l'état local
     * @param {*} e :onChange de l'input de saisie de nouveau todo
     */
    function handleChange(e) {
        console.log("handleChange")
        setInput(e.target.value)
    }

    /**
     * @returns le nombre de tâches qu'il rest à effectuer
     */
    function getUndoneLength(){
        console.log("getUndoneLength")
        const result = []
        
        items.map((item) => {
            if (!item.done) {
                result.push(item)
            }
        })
        if (result.length === 0) {
            return
        }
        return result.length
    }

    /**
     * Appelée lors de l'appui sur un bouton de suppression
     * @param {*} key : id unique du todo à supprimer en BDD
     */
    function delet(key) {
        console.log("delete")
        aXios.delete('http://localhost:4000/todos/'+key)
            .then((res) => {
                fetch()
            })
    }

    
    
    return (
        <div className="container">
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">ToDo App</span>
            </nav>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist">
                        <form onSubmit={(e) => add()}>
                            <input
                                className="form-control form-control-lg"
                                placeholder="add todo"
                                value={input}
                                onChange={(e) => handleChange(e)}>

                            </input>

                            <br />
                        </form>
                        <ul className="no-padding" id="not-done">
                            {   (items.length > 0 ) &&                            
                                items.map((item) => (
                                    (!item.done) && (
                                        <li
                                            className="list-unstyled"
                                            key={item.key}

                                        >
                                            <label
                                                onClick={() => move(item.key)}>
                                                {item.text}
                                            </label>

                                        </li>)

                                ))
                            }
                        </ul>
                        <div className="todo-footer">
                            <span>{getUndoneLength()}</span> Items Left
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="todolist">
                        <ul className="no-padding"
                            id="done-items">
                            {
                                items.map((item) => (
                                    item.done && (

                                        <li
                                            className="list-unstyled"
                                            key={item.key}

                                        >
                                            <label onClick={() => move(item.key)}>{item.text}</label>
                                            <button
                                                className="btn float-right"
                                                onClick={e => delet(item.key)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </li>)

                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
    
}