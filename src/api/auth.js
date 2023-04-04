import { API_HOST, TOKEN } from "../utils/constantes";
import jwtDecode from "jwt-decode"

export function registrarAPI(user){

    const url = `${API_HOST}/registro`;

    const userAux = {
        //...user,
        nombre: user.nombre,
        apellidos: user.apellido,
        password: user.password,
        email: user.email.toLowerCase(),
        fechaNac: new Date()
    }
    delete userAux.repetir_password

    console.log(userAux)

    const params ={
        method: "POST",
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


export function loginAPI(user){

    const url = `${API_HOST}/login`;

    const userAux = {
        password: user.password,
        email: user.email.toLowerCase(),
    }

    console.log(userAux)

    const params ={
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAux)
    }

    return fetch(url, params)
    .then(response =>{
        if (response.status >= 200 && response.status < 300){
            return response.json();
        }
         return {message:"Usuario y/o Contraseña incorrectos"}


    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err
    })

}

export function setTokenAPI(token){
    localStorage.setItem(TOKEN, token)
}

export function getTokenAPI(){
    return localStorage.getItem(TOKEN)
}

export function logoutApi(){
    localStorage.removeItem(TOKEN)
}

export function estaLogueadoApi(){
    const token = getTokenAPI()

    if(!token){
        logoutApi()
        return null
    }
    if(tokenExpirado(token)){
        logoutApi()
    }

    return jwtDecode(token)
}

function tokenExpirado(token){
    const {exp} = jwtDecode(token)
    const expired = exp*1000
    const timeout = expired - Date.now()

    if( timeout < 0){
        return true
    }
    return false
}