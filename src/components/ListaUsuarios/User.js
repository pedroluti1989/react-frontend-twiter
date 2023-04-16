import React, { useEffect, useState } from 'react'
import { getUserApi } from '../../api/user';
import {Card} from "react-bootstrap"
import Avatar from '../User/Avatar/Avatar';
import { Link } from 'react-router-dom';

export default function User(props) {

    const {user} = props;
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() =>{
        getUserApi(user.id)
        .then(response =>{
            setUserInfo(response)
        })
    },[user])
  return (
   <div className='lista-usuarios__usuario'>
      <Link as={Link} to={`/${user.id}`} ><Avatar user={user}/></Link>
        <Card as={Link} to={`/${user.id}`}  className="lista-usuarios__card" >

            <h4>{userInfo?.nombre} {userInfo?.apellido} </h4>
            <p>
              {userInfo?.biografia}
            </p>
    
        </Card>
    </div>
  )
}
