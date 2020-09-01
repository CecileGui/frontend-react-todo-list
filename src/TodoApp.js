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
                    </div>
                    <div className="col-md-6">
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
                                    </li>)    
                                    
                                ))
                            }
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}