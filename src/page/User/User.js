import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import "./User.scss"
import withRouter from '../../hooks/withRouter'
import { getUserApi } from '../../api/user'
import { toast } from 'react-toastify'
import Banner from "../../components/User/Banner"
import InfoUser from '../../components/User/InfoUser'
import useAuth from '../../hooks/useAuth'
import TweetsUsuario from '../../components/User/TweetsUsuario'
import { getUserTweetsApi } from '../../api/tweets'
import { Button, Spinner } from 'react-bootstrap'

function User(props) {
    const [user, setUser] = useState(null)
    const {params} = props
    const usuarioLogueado = useAuth()
    const[tweets, setTweets] = useState(null)

    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false)


    useEffect( ()=>{
        getUserApi(params.id)
        .then(response =>{
            setUser(response)
            
        })
        .catch(() =>{
            toast.error("El usuario no existe en la base de datos")
        })
    },[params])

    /* obtener todos los tweets */
    useEffect( ()=>{
      getUserTweetsApi(params.id, 1)
      .then(response =>{
          setTweets(response)
          
      })
      .catch(() =>{
        setTweets([])
      })
  },[params])

  const masTweets = () =>{

    const pageTemp = page +1
    setLoadingTweets(true)

    getUserTweetsApi(params.id, pageTemp)
    .then(response =>{
      if (!response){
        setLoadingTweets(0)
      }else{
        setTweets([...tweets, ...response])
        setPage(pageTemp)
        setLoadingTweets(false)
      }
    })
  }
  
  return (
    <BasicLayout className ="user">
        <div className='user__title'> 
          <h2>
            {user ? `${user.nombre} ${user.apellido}` : "El usuario no existe"}
          </h2>
      </div>

      <Banner user={user} usuarioLogueado ={usuarioLogueado}></Banner >

      <InfoUser user={user}></InfoUser>

      <div className='user__tweets'>
        <h3>Tweets</h3>
        {tweets && <TweetsUsuario tweets={tweets}></TweetsUsuario>}

        <Button onClick={masTweets}>
          {!loadingTweets 
           ?( (loadingTweets !== 0 ) && "Obterner mas Tweets" )

           : (
            <Spinner
              as="span"
              animation='grow'
              size="sm"
              role="status"
              arian-hidden="true"
            />
           )
           
            }
        </Button>
      </div>
    </BasicLayout>
  )
}

  export default withRouter(User)
