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