import React from 'react'
import { DateBirth, Link, Location } from '../../../utils/Icons';
import "./InfoUser.scss"
import moment from "moment"
import localization from "moment/locale/es"

export default function InfoUser(props) {
  const {user} = props;


  return (
    <div className='info-user'>
      <h2 className='name-user'>
        {user?.nombre} {user?.apellido}
      </h2>
      <p className='email-user'>
        {user?.email}
      </p>
      {user?.biografia && (
         <div className='biografia-user'>{user?.biografia}</div>
      )}

      <div className='more-info'>

        {user?.ubicacion && (
           <p> <Location/>{user?.ubicacion} </p>
        )}

        {user?.sitioWeb && (
           <a
             href={user.sitioWeb}
             alt ={user.sitioWeb}
             target = "_blank"
             rel ="noopener noreferrer"
            >
              <Link/> {user.sitioWeb}
            </a>
        )}

        {user?.fechaNac && (
          <p>
            <DateBirth/>
            {moment(user.fechaNac).locale("es", localization).format("LL")}
          </p>    
        )}

      </div>

    </div>
  )
}
