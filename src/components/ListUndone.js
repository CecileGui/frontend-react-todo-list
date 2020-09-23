import React from 'react'

export default function ListUndone ({items, styleUl, styleLi, id, moveOnClick}) {

    return (
       <ul className={styleUl} id={id}>
            {   (items.length > 0) &&
                items.map((item) => (
                    (!item.done) && (
                        <li
                            className={styleLi}
                            key={item.key}

                        >
                            <label
                                onClick={() => moveOnClick(item.key)}>
                                {item.text}
                            </label>

                        </li>)

                ))
            }
       </ul> 
    )
}