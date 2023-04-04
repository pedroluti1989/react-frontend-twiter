import React from 'react'
import {map} from 'lodash'
import configRouting from "./configRouting"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Routing() {
  return (
   <Router>
        <Routes>
            {map(configRouting, (router, index) =>(
                <Route key ={index} path={router.path} exact={router.exact} element={<router.page/>} >
                </Route>
            ))}

        </Routes>
    </Router>
  )
}
