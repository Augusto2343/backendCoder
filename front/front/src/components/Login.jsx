import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
    const {login} = useAuth()
    const redirect = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = { password:password,email:email}
        try {
            const response = await login(userData)
            
            
            if(response.error){
               const error = JSON.parse(response.error);

                
                Swal.fire({
                    title:"Error en el Login",
                    html:`<h4>${error.message}</h4>`,
                    timer:6000
                })
            }
            redirect("/")
        } catch (error) {
            Swal.fire({
                title:"Error en el Login ",
                html:"<h4>Vuelve intentarlo más tarde</h4>",
                timer:3000
            })
        }
        
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-800 to-teal-100 flex items-center justify-center absolute top-0 right-0 ">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-100">
                        Acceso 
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Accede a tu cuenta para ingresar al sitio
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
  
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input 
                                type="email" 
                                className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                id="email" 
                                name="email" 
                                placeholder="tu@email.com"
                                onChange={(e)=>{setEmail(e.target.value)}}

                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                id="password" 
                                name="password" 
                                placeholder="Tu contraseña"
                                onChange={(e)=>{setPassword(e.target.value)}}

                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            id="submitButton" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                        >
                            Crear cuenta
                        </button>
                        
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                ¿No tienes cuenta?{' '}
                                <Link to={"/register"} className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
                                    Registrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Login