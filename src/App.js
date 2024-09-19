import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Home from "./Components/Pages/Home/Home";
import { Navigate, Route ,RouterProvider,createBrowserRouter  } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context1/AuthContext";
import { useNavigate } from "react-router-dom";


function App() {
  
  const {currUser} = useContext(AuthContext);
  
  
  const ProtcatApp = ({children})=>{
    if(!currUser){
      return <Navigate to ="/"/>      
    }
    
    return children
  }

  const route = createBrowserRouter([
     {path:"home" ,element : <ProtcatApp><Home/></ProtcatApp>},
     {path:"/" ,element :<SignIn/> },
     {path:"signUp" ,element :<SignUp/> },
  ])

  
  return (
    <>
      <RouterProvider router = {route}>
          
      </RouterProvider>
    </>
  );
}

export default App;
