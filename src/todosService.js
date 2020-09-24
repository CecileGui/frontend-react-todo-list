import aXios from 'axios' // aide à la transcription http
import { serverList } from './configuration/serverProperties'

/**
 * url du serveur permettant d'accéder à la base de données
 */
const url = `${serverList.localhost.url}:${serverList.localhost.port}`
const keyResource = 'todos'
/**
 * fait appel au serveur pour aller récupérer les todos en base de données
 */  
export default async function getAll()  {
    console.log("SERVICE GET ALL")
    return aXios.get(`${url}/${keyResource}/`)
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
    console.log("SERVICE ADD")
    aXios.post(`${url}/${keyResource}/add`, todo)
        .catch(err => console.log(err))
}    

/**
 * fait appel au serveur pour supprimer un todo en DB
 * @param {*} key : id du todo à supprimer
 */
export async function serviceDelete(key) {
    console.log("SERVICE DELETE")
    await(
        aXios.delete(`${url}/${keyResource}/` + key)
        .catch(err => console.log(err))
    )
    
}

/**
 * Fait appel au serveur pour mette à jour un todo
 * @param {} key id du todo à mettre à jour
 * @param {*} todo nouvelle valeur du todo
 */
export async function serviceUpdate(key, todo) {
    console.log("SERVICE UPDATE")
    
    //Le thread de requètes asynchrones ne peut pas passer à une autre requète tant que celle-ci n'est pas terminée
    await (aXios.put(`${url}/${keyResource}/` + key, todo)
            .then(res => {
            return res.body
            })
            .catch(err => console.log(err))
    )
}