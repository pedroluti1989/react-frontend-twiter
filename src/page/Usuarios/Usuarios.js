import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Spinner } from 'react-bootstrap'
import { getSeguidoresApi } from '../../api/follow'
import withRouter from '../../hooks/withRouter'
import BasicLayout from '../../layout/BasicLayout'
import queryString from "query-string"
import {useDebouncedCallback} from "use-debounce"
import "./Usuarios.scss"
import ListaUsuarios from '../../components/ListaUsuarios/ListaUsuarios'
import { isEmpty } from 'lodash'

function Usuarios(props) {
    const {setRefreshLogin, location, navigate} = props
    const [users, setUsers] = useState(null)
    const params = useUsersQuery(location)
    const [typeUser, setTypeUser] = useState(params.type);

    useEffect(() =>{
      getSeguidoresApi(queryString.stringify(params))
      .then(response =>{
        if(isEmpty(response)){
          setUsers([])
        }else{
          setUsers(response)
        }
      })
      .catch(() =>{
          setUsers([])
      })
    },[location])
 
    const onChangeType = type =>{
      setUsers(null)
      setTypeUser(type)

      const busqueda = queryString.stringify({type:type, page:1, search:""})
      navigate("?"+busqueda)
    }

    // buscador
    const [onSearch] = useDebouncedCallback( (value) =>{
      console.log(value)
      setUsers(null)
      const busqueda = queryString.stringify({...params, page:1, search:value})
      navigate("?"+busqueda)
    }, 500) //300 es el tiempo en milisegundos que tardara en renderizar

  return (
    <BasicLayout 
      className="users" 
      title="Usuarios" 
      setRefreshLogin={setRefreshLogin}
      >

       <div className='usuarios__title'>
          <h2>Usuarios</h2>
          <input 
            type="text" 
            placeholder="Buscar por Nombre..."
            onChange={(e) => onSearch(e.target.value)} />
      </div>

      <ButtonGroup className='usuarios__options'>
        <Button 
          onClick={() => onChangeType("follow")}
          className={typeUser === "follow" && "active"}
        >Siguiendo</Button>
        <Button 
          onClick={() => onChangeType("new")}
          className={typeUser === "new" && "active"}
        >Nuevos</Button>
      </ButtonGroup>

      {!users?(
        <div className='usuarios__loading'>
            <Spinner animation="border" variant='info'/>
            Cargando usuarios...
        </div>
      ):(
        
        <ListaUsuarios users={users}/>
      )
      }
    </BasicLayout>

  )
}

function useUsersQuery(location){
  const {page=1, type="follow", search=""} = queryString.parse(location.search)
  return {page, type, search}
}

export default withRouter(Usuarios)
