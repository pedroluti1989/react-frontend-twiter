import { API_HOST } from "../utils/constantes";
import { getTokenAPI } from "./auth";

export function getUserApi(id){

    const url = `${API_HOST}/verperfil?id=${id}`;

    const params ={
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        if (response.status >= 400 ){
            throw null;
        }
        return response.json();
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}

/* editar usuario */

export async function editarUsuarioApi(data){

    const url = `${API_HOST}/modificarPerfil`;

    const params ={
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${getTokenAPI()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
    .then(response =>{
            return response;
    })
    .catch(err =>{
        return err
    })

}