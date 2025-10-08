import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import Error from "./Error";
import { useCartContext } from "./context/cartContext";
import { useEffect, useState } from "react";

const Profile = () =>{
    const {user,logout,isAuthenticated} = useAuth();
    const {getCartData} = useCartContext();
    const [cartQuantity, setCartQuantity] = useState();
    const handleLogout = async() =>{
        await logout();
    }
    return (
        isAuthenticated ?
        <>
        <div className="min-h-screen w-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Perfil</h1>
                    <p className="mt-2 text-gray-300">Información de tu cuenta y detalles personales</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Profile card */}
                    <div className="md:col-span-1">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10 shadow-xl">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-24 w-24 rounded-full bg-teal-600 text-white flex items-center justify-center text-3xl font-semibold shadow-md">
                                    {user.imgProfile ? 
                                    
                                    <img src={user.imgProfile} alt="Profile" className="h-24 w-24 rounded-full" />
                                    :
                                    "U"
                                    }
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-white">{user.last_name} {user.first_name}</h2>
                                <p className="mt-1 text-sm text-gray-300">{user.email }</p>
                                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md z-10 hover:bg-red-600 hover:shadow-lg/20" onClick={(e)=>{handleLogout()}}>Logout</button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Información de la cuenta</h3>
                            </div>
                            <div className="px-6 py-5">
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                                        <dd className="mt-1 text-gray-900">{user.first_name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Apellido</dt>
                                        <dd className="mt-1 text-gray-900">{user.last_name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-gray-900 break-all">{user.email}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Rol</dt>
                                        <dd className="mt-1 text-gray-900 capitalize">{user.role}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Edad</dt>
                                        <dd className="mt-1 text-gray-900">{user.age}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
        :
        <Error mensaje={"Sesión expirada"} type="sessionExp"></Error>    
)
}
export default Profile