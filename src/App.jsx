
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./Home/HomePage.jsx"
import Login from "./auth/Login.jsx"
import Register from "./auth/Register.jsx"
import Layout from "./Layout/Layout.jsx"
import Notfound from './Notfound/Notfound.jsx'
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter.jsx"

function App() {
  
  let router = createBrowserRouter([
      {path:"/" , element:<Layout/>,children:[
      {index:true , element:<Login/>},
      {path:"login", element:<Login/>},
      {path:"home" , element:<ProtectedRouter><HomePage/></ProtectedRouter>},
      {path:"register" , element:<Register/>},
      {path:"*" , element:<Notfound/>},
    ]}
  ])
  
  return <RouterProvider router={router}/>
  
}

export default App
