import React, {Component} from 'react'

export default class TodoApp extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        List Undone
                    </div>
                    <div className="col-md-6">
                        List Done
                    </div>
                </div>
                
            </div>
        )
    }
}