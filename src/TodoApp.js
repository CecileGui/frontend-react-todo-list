import React, { useState, useEffect } from 'react'
import './Todo.css'
import ListUndone from './components/ListUndone'
import getAll, { serviceAdd, serviceDelete, serviceUpdate } from './todosService.js'
import ListDone from './components/ListDone'

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
    const move = async (key) => {
        console.log("fonction move : " + key)
        let found = false
        let itemToUpdate = {}  
        items.forEach(item => {
            if(item.key === key && !found){
                itemToUpdate = { key: item.key, text: item.text, done: (!item.done) }                        
                found = true
            } 
        });  

        console.log("Item to update : " + itemToUpdate)
        await serviceUpdate(key, itemToUpdate)
        await fetch()
        console.log("sortie move")       
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
     */
    async function add() {
        console.log("FONCTION ADD DECLENCHE SUBMISSION ")     
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
     * @returns le nombre de tâches qu'il reste à effectuer, ou ne retourne rien si il en reste 0
     */
    function getUndoneLength(){
        console.log("getUndoneLength")
        let itemsFiltered = items.filter(item => !item.done)
        if (itemsFiltered.length === 0) {
            return
        }
        return itemsFiltered.length
    }

    /**
     * Appelée lors de l'appui sur un bouton de suppression
     * @param {*} key : id unique du todo à supprimer en BDD
     */
    const delet = async (key) => {
        console.log("delete")
        await serviceDelete(key)
        fetch()
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
                        <ListUndone 
                            items = {items}
                            styleUl = 'no-padding'
                            styleLi= 'list-unstyled'
                            id = 'not-done'
                            moveOnClick = {move}
                        />
                        <div className="todo-footer">
                            <span>{getUndoneLength()}</span> Items Left
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="todolist">
                        <ListDone 
                            items = {items}
                            styleUl = 'no-padding'
                            styleLi= 'list-unstyled'
                            id = 'done-items'
                            moveOnClick = {move}
                            deletOnCick = {delet}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
    
}