import {values, size} from "lodash"

export function validarEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return (emailValid.test(String(email).toLowerCase()) );
}


export function validarPassword(password1, password2){
    return (password1 === password2)
}

export default function validarCamposVacios (formData){
    var validCount = 0
    values(formData).some(value =>{
      value && validCount ++
      return null
    });
    return (validCount === size(formData))
}