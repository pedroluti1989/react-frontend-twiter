import { result } from "lodash";
import { API_HOST } from "../utils/constantes";
import { getTokenAPI } from "./auth";


export function getSeguidoresApi(parametrosUrl){

    const url = `${API_HOST}/listaUsuarios?${parametrosUrl}`;

    const params ={
        headers:{
           // "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}

export function siguiendoUserApi(idUser){

    const url = `${API_HOST}/consultarRelacion?id=${idUser}`;

    const params ={
        method: "GET",
        headers:{
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}



export function dejarSeguirUserApi(idUser){

    const url = `${API_HOST}/bajaRelacion?id=${idUser}`;

    const params ={
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}


export function seguirUserApi(idUser){

    const url = `${API_HOST}/altaRelacion?id=${idUser}`;

    const params ={
        method: "POST",
        headers:{
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}