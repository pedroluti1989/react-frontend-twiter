import React, {useEffect, useState} from "react"
import { ToastContainer } from "react-toastify";
import { estaLogueadoApi } from "./api/auth";
import Portada from "./page/Portada";
import Routing from "./routes/Routing";

import { AuthContexto } from "./utils/contexts";


export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshLogin, setRefreshLogin] = useState(false);

  useEffect(() =>{

    setUser(estaLogueadoApi())
    setRefreshLogin(false)
    setLoadUser(true)

  }, [refreshLogin])

   //
   if(!loadUser) return null

  return (
    <AuthContexto.Provider value={user}>
      {user ? <Routing setRefreshLogin={setRefreshLogin} /> : <Portada setRefreshLogin={setRefreshLogin} /> }

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContexto.Provider>
  )
}

