import aXios from 'axios' // aide à la transcription http

/**
 * fait appel au serveur (localhost:4000) pour aller récupérer les todos en base de données
 */    
export default async function getAll()  {
    console.log("SERVICE GET ALL")
    return aXios.get('http://localhost:4000/todos/')
        .then(res => {
            const rawItems = res.data
            const items = []
            rawItems.forEach(item => {
                items.push({ text: item.text, done: item.done, key: item._id })
            });
            console.log(res.data)
            return items

        })
        .catch(err => {
            console.log(err)
        }) 
         
}

/**
 * fait appel au serveur pour ajouter le todo en DB
 * @param {*} todo 
 */
export async function serviceAdd(todo) {
    aXios.post('http://localhost:4000/todos/add', todo)
        .catch(err => console.log(err))
}    

/**
 * fait appel au serveur pour supprimer un todo en DB
 * @param {*} key : id du todo à supprimer
 */
export async function serviceDelete(key) {
    aXios.delete('http://localhost:4000/todos/'+key)
        .catch(err => console.log(err))
}