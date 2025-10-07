import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Error = ({mensaje, type}) =>{
    const [links,setLinks] = useState([]);
    useEffect(()=>{
        switch(type){
            case "sessionExp":
                setLinks ([{url:"/register",txt:"Registrarse"},{url:"/login",txt:"Loguearse"}])
                break;
            default:
             setLinks([{url:"/",txt:"Volver al inicio"}])
        }
    },[])
    
    return(
        <>
        
        <div className="w-screen h-screen bg-gray-950/90 absolute top-0 left-0 flex flex-col items-center justify-center">
            <h1 className="text-gray-100 text-3xl">Error: {mensaje}</h1>
            <div className="flex flex-row items-center gap-10 mt-4">
              
            
        {
            
            links.map((link,index) =>(
                <Link to={link.url} key={index}  className="text-gray-50 underline decoration-sky-500/30 rounded-md p-2 bg-blue-500 hover:bg-blue-700 " >{link.txt}</Link>
            ))
        }
        </div>
        </div>
        </>
    )
}
export default Error;