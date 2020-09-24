import React from 'react'

export default function UndoneLeft({undoneQuantity}) {

    return (
        <div className="todo-footer">
            <span>
                {
                undoneQuantity + " Items left" 
                } 
            </span>
        </div>
    )
}