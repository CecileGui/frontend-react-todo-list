import React from 'react'

export default function ListDone ({items, styleUl, styleLi, id, moveOnClick, deletOnCick}) {
    return(
        <ul className={styleUl}
            id={id}>
            {
                items.map((item) => (
                    item.done && (

                        <li
                            className={styleLi}
                            key={item.key}
                        >
                            <label onClick={() => moveOnClick(item.key)}>{item.text}</label>
                            <button
                                className="btn float-right"
                                onClick={e => deletOnCick(item.key)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </li>)

                ))
            }
        </ul>
    )
}