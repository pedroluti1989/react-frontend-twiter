import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import {map} from "lodash"
import avatarDefault from "../../../imagenes/png/avatar-no-found.png"
import { API_HOST } from '../../../utils/constantes';
import { getUserApi } from '../../../api/user';
import "./TweetsUsuario.scss"
import moment from 'moment';

export default function TweetsUsuario(props) {

  const {tweets} =  props;

  return (
    <div className='tweets-user'>
      {map(tweets, (tweet, index)=> (
          <Tweet key={index} tweet = {tweet} />
      ))}
    </div>
  );
}

function Tweet (props){

  const {tweet} =  props;
  const [userInfo, setUserInfo] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  console.log(userInfo)

  useEffect(() =>{
    getUserApi(tweet.userid)
    .then(response =>{
       setUserInfo(response);
       setAvatarUrl(
            response?.avatar
            ? `${API_HOST}/obtenerAvatar?id=${tweet.userid}`
            :avatarDefault
       );

    });

  },[tweet])

  return(
    <div className='tweet'>
      <Image className ="avatar" src={avatarUrl} roundedCircle />
     <div>
        <div className='info-user'>
          {userInfo?.nombre} {userInfo?.apellido}
  
          <span>{moment(tweet.fecha).calendar()}</span>
        </div>
        
        <div>
          {tweet?.mensaje}
        </div>

      </div>
    </div>
  )
}
