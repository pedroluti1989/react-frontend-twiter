import { API_HOST } from "../utils/constantes";
import { getTokenAPI } from "./auth";


export function getUserTweetsApi(userId, pagina){

    const url = `${API_HOST}/verTweets?id=${userId}&pagina=${pagina}`;

    const params ={
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        return err
    })

}