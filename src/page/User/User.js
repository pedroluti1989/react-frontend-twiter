import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import "./User.scss"
import withRouter from '../../hooks/withRouter'
import { getUserApi } from '../../api/user'
import { toast } from 'react-toastify'
import Banner from "../../components/User/Banner"
import InfoUser from '../../components/User/InfoUser'
import useAuth from '../../hooks/useAuth'

function User(props) {
    const [user, setUser] = useState(null)
    const {params} = props
    const usuarioLogueado = useAuth()

    useEffect( ()=>{
        getUserApi(params.id)
        .then(response =>{
            setUser(response)
            
        })
        .catch(() =>{
            toast.error("El usuario no existe en la base de datos")
        })
    },[params])
  
  return (
    <BasicLayout className ="user">
        <div className='user__title'> 
          <h2>
            {user ? `${user.nombre} ${user.apellidos}` : "El usuario no existe"}
          </h2>
      </div>

      <Banner user={user} usuarioLogueado ={usuarioLogueado}></Banner >

      <InfoUser user={user}></InfoUser>

      <div className='user__twets'>Lista de tweets</div>
    </BasicLayout>
  )
}

  export default withRouter(User)
