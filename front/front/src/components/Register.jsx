import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  useAuth } from "./context/AuthContext";
import Swal from "sweetalert2"
const Register = () => {
    const {register} = useAuth()
    const redirect = useNavigate();
    const [nombre,setNombre] = useState();
    const [apellido,setApellido] = useState();
    const [age,setAge] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [role,setRole] = useState();
    const [imgProfile, setImgProfile] = useState();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = {first_name:nombre,last_name:apellido,age:age, password:password,email:email, role:role}
        try {
            const response = await register(userData)
            if(response.error){
                Swal.fire({
                    title:"Error en el registro",
                    html:`<h4>${response.error.message}</h4>`,
                    timer:6000
                })
            }
            redirect("/")
        } catch (error) {
            Swal.fire({
                title:"Error en el registro ",
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
                        Crear cuenta
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Regístrate para acceder a tu cuenta
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                    id="first_name" 
                                    name="first_name" 
                                    placeholder="Ingrese su nombre"
                                    onChange={(e)=>{setNombre(e.target.value)}}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Apellido
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                    id="last_name" 
                                    name="last_name" 
                                    placeholder="Ingrese su apellido"
                                    onChange={(e)=>{setApellido(e.target.value)}}

                                    required
                                />
                            </div>
                        </div>
                        
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
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                Edad
                            </label>
                            <input 
                                type="number" 
                                className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                id="age" 
                                name="age" 
                                placeholder="Ingrese su edad"
                                onChange={(e)=>{setAge(e.target.value)}}

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
                        <div>
                            <label htmlFor="imgProfile" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input 
                                type="text" 
                                className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                id="imgProfile" 
                                name="imgProfile" 
                                placeholder="Url de la imagen"
                                onChange={(e)=>{setImgProfile(e.target.value)}}

                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                Rol
                            </label>
                            <select 
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                id="role" 
                                name="role"
                                required
                                onChange={(e)=>{setRole(e.target.value)}}

                            >
                                <option value="">Seleccione su rol</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
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
                                ¿Ya tienes cuenta?{' '}
                                <Link to={"/login"} className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Register