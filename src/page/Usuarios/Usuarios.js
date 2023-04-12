import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { getSeguidoresApi } from '../../api/follow'
import withRouter from '../../hooks/withRouter'
import BasicLayout from '../../layout/BasicLayout'
import queryString from "query-string"
import "./Usuarios.scss"

function Usuarios(props) {
    const {setRefreshLogin, location} = props
    const [users, setUsers] = useState(null);

    const params = useUsersQuery(location)

    useEffect(() =>{
      getSeguidoresApi(queryString.stringify(params))
      .then(response =>{
        console.log(response)
      })
      .catch(() =>{
          setUsers([])
      })
    },[])

  return (
    <BasicLayout 
      className="users" 
      title="Usuarios" 
      setRefreshLogin={setRefreshLogin}
      >

       <div className='usuarios__title'>
          <h2>Usuarios</h2>
          <input type="text" placeholder="Buscar por Nombre..." />
      </div>

      <ButtonGroup className='usuarios__options'>
        <Button className='active'>Siguiendo</Button>
        <Button >Nuevos</Button>
      </ButtonGroup>
    </BasicLayout>

  )
}

function useUsersQuery(location){
  const {page=1, type="follow", search=""} = queryString.parse(location.search)
  return {page, type, search}
}

export default withRouter(Usuarios)
