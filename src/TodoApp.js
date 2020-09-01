import React, {Component} from 'react'

export default class TodoApp extends Component{

    state = {
        items: [
            {text: "Item #1", done: false, key: new Date().getMilliseconds() + "item1"},
            {text: "Item #2", done: false, key: new Date().getMilliseconds() + "item2"},
            {text: "Item #3", done: false, key: new Date().getMilliseconds() + "item3"},
            {text: "Item #4", done: false, key: new Date().getMilliseconds() + "item4"},
        ]
    }
    
move = (key) => {
    console.log(key)
}

    render(){
        const {items} = this.state
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        List Undone
                        <ul>
                            {
                                items.map((item, index) => (
                                    <li key={index} onClick={this.move(index)}>{item.text}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-md-6">
                        List Done
                        <ul>
                            
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}