import React from 'react'
import {map} from 'lodash'
import configRouting from "./configRouting"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Routing(props) {
  const {setRefreshLogin } = props
  return (
   <Router>
        <Routes>
            {map(configRouting, (router, index) =>(
                <Route 
                  key ={index} 
                  path={router.path} 
                  exact={router.exact} 
                  element={<router.page setRefreshLogin={setRefreshLogin}/>} >
                </Route>
            ))}

        </Routes>
    </Router>
  )
}
