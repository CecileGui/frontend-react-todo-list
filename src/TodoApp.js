import React, {Component} from 'react'
import './Todo.css'

export default class TodoApp extends Component{

    state = {
        items: [
            {text: "Item #1", done: false, key: new Date().getMilliseconds() + "item1"},
            {text: "Item #2", done: false, key: new Date().getMilliseconds() + "item2"},
            {text: "Item #3", done: false, key: new Date().getMilliseconds() + "item3"},
            {text: "Item #4", done: false, key: new Date().getMilliseconds() + "item4"},
        ],
        input: ''
    }
    
    move = (key) => {
        console.log("fonction move : " + key)
        const { items } = this.state
        const filtered = items.map((item) => {
            if(item.key === key){
                item.done = !item.done
            }
            return item
        })
        this.setState({items: filtered})
    }

    add = (e) => {
        const {items} = this.state
        e.preventDefault()
        const newItem= {text: this.state.input, done :false, key: new Date().getMilliseconds()}
        this.setState({items: [ ...[newItem], ...items]})
        
    }

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

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

    render(){
        const {items, input} = this.state
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="todolist">
                        
                        List Undone
                        <form onSubmit={(e) => this.add(e)}>
                            <input 
                                className="form-control form-control-lg"
                                placeholder="add todo" 
                                value={input} 
                                onChange={(e) => this.handleChange(e)}>

                            </input>
                        </form>
                        <ul>
                            {
                                items.map((item) => (
                                !item.done && (
                                    <li 
                                    key={item.key} 
                                    onClick={() => this.move(item.key)}
                                    >
                                        {item.text}
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
                        List Done
                        
                        <ul>
                            {
                                items.map((item) => (
                                item.done && (
                                    
                                    <li 
                                    key={item.key} 
                                    onClick={() => this.move(item.key)}
                                    >
                                        {item.text}
                                        <i className="fa fa-trash"></i>
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