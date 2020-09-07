import React, {Component} from 'react'
import aXios from 'axios' // aide à la transcription http
import './Todo.css'

/**
 * Composant représentant une Todo List
 */
export default class TodoApp extends Component{

    /**
     * Etat initial de la Todo List
     * TODO: définir un objet item
     */
    state = {
        items: [],
        input: ''
    }
    
    /**
     * Déplace un item
     * De à faire vers fait ou inversement
     * @param {*} key élément unique qui désigne l'élément à déplacer
     * les items modifiés sont enregistrés dans l'état local
     * 
     */
    move = (key) => {
        console.log("fonction move : " + key)       
        this.state.items.map((item) => {
            if(item.key === key){
                let itemToUpdate = { key: item.key, text: item.text, done: (!item.done) }
                aXios.put('http://localhost:4000/todos/'+key, itemToUpdate).then((res) => {
                    this.fetch()
                })
                
                return
            }
            //return item
            console.log("sortie move")
        })
        
    }

    /**
     * Après le montage du composant Todo List
     * Récupére les todos en base de données
     */
    componentDidMount() {
        console.log("thiscomponentDidMount")
        this.fetch()
    }

    /**
     * va récupérer les todos et les stocke dans l'état local
     */
    fetch = () => {
        console.log("FETCH")
        aXios.get('http://localhost:4000/todos/')
        .then(res => {
            const rawItems = res.data
            const items = []
            rawItems.forEach(item => {
                items.push({text: item.text, done: item.done, key: item._id})
            });
            this.setState({items: items})
            console.log("etat après fetch : ")
            this.state.items.map((item) => console.log(item))
            
            
        })
    }

    /**
     * Récupère le texte saisi en input
     * Génère un todo {text: text saisi, done false}, l'enregistre en BDD, met à jour l'état local en allant chercher les todos en BDD
     * @param {*} e : submission du formulaire d'ajout de todo // TODO: e inutile, à virer
     */
    add = (e) => {
        console.log("fonction add")     
            let todo = {text: this.state.input, done :false}
            aXios.post('http://localhost:4000/todos/add', todo) // récupéré côté serveur via le body de la requête
            .then(res => {
                console.log(res.data)
                console.log('success')
                this.fetch()
                
            })       
    }

    /**
     * Met à jour le champ input de l'état local, permettant d'avoir accès à ce qui est en train d'être saisi via l'état local
     * @param {*} e :onChange de l'input de saisie de nouveau todo
     */
    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    /**
     * @returns le nombre de tâches qu'il rest à effectuer
     */
    getUndoneLength(){
        const result = []
        const {items} = this.state
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
    delet = key => {
        const { items } = this.state
        const filtered = items.filter((item) => {
            if (item.key !== key) {
                return item
            }
        })
        this.setState({items : filtered})
    }

    render(){
        const {items, input} = this.state
        return(
            <div className="container">
                <nav className="navbar navbar-dark bg-dark">
                    <span className="navbar-brand mb-0 h1">ToDo App</span>
                </nav>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="todolist">
                        <form onSubmit={(e) => this.add(e)}>
                            <input 
                                className="form-control form-control-lg"
                                placeholder="add todo" 
                                value={input} 
                                onChange={(e) => this.handleChange(e)}>

                            </input>

                            <br />
                        </form>
                        <ul className="no-padding" id="not-done">
                            {
                                items.map((item) => (
                                (!item.done) && (
                                    <li
                                    className="list-unstyled"  
                                    key={item.key} 
                                    
                                    >
                                        <label
                                            onClick={() => this.move(item.key)}>
                                                {item.text}
                                        </label>
                                        
                                    </li>)    
                                    
                                ))
                            }
                        </ul>
                        <div className="todo-footer">
                        <span>{this.getUndoneLength()}</span> Items Left
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
                                        <label onClick={() => this.move(item.key)}>{item.text}</label>
                                        <button 
                                        className="btn float-right"
                                        onClick={ e => this.delet(item.key)}>
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
}