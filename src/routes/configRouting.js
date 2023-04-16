import CrearTweet from "../components/Tweet/CrearTweet";
import EditarUsuario from "../components/User/EditarUsuario";
import Error404 from "../page/Error404";
import Home from "../page/Home";
import User from "../page/User";
import Usuarios from "../page/Usuarios";

export default [

    {
        path:"/usuarios",
        exact:true,
        page: Usuarios
    },
    {
        path:"/edicionUser",
        exact:true,
        page: EditarUsuario
    },
    {
        path:"/crearTweet",
        exact:true,
        page: CrearTweet
    },

    {
        path:"/:id",
        exact:true,
        page: User
    },
    {
        path:"/",
        exact: true,
        page: Home
    },

    {
        path:"*",
        page: Error404
    }
]