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

export function editarUsuarioApi(user){

    const url = `${API_HOST}/modificarPerfil`;

    const userAux = {
        ...user,
        nombre: user.nombre,
        apellido: user.apellido,
        sitioWeb: user.sitioWeb,
        biografia: user.biografia,
        ubicacion: user.ubicacion,
        email: user.email.toLowerCase(),
        fechaNac: new Date()
    }

    console.log(userAux)

    const params ={
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAux)
    }

    return fetch(url, params)
    .then(response =>{
        if (response.status >= 200 && response.status < 300){
            return response.json();
        }else if (response.status === 400){
            console.log(response.status)
            return {code: 400, message:"El email ya esta en uso"}
        }else{
            return {code: 404, message:"Error del servidor , intentelo mas tarde"}
        }

    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}