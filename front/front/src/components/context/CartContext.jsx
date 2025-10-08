import { createContext, useContext, useState,useEffect } from "react";
import Swal from "sweetalert2";


const CartContext = createContext();
export const useCartContext = () =>{
    const context = useContext(CartContext);
    return context;
}

export const CartProvider = ({children}) =>{
    const getCartData = async(id) =>{
        try {
         const response = await fetch(`http://localhost:5000/api/carts/${id}`,{
            method:"GET",
            credentials:"include"
         })   
         if (!response.ok) {
           Swal.fire({
            title:"Error al traer el carrito",
            icon:"error"
           })
         }
         else{
            const data = await response.json();
            return data;
         }
        } catch (error) {
            return Swal.fire({
                title:"No se pudo conectar con la base de datos",
                icon:"error"
            })
        }
    }
    const postProdToCart = async (id,idProd) =>{
        try {
        
         const response = await fetch(`http://localhost:5000/api/carts/${id}/product/${idProd}`,{
            method:"POST",
            credentials:"include"
         })   
         if (!response.ok) {
           Swal.fire({
            title:"Error al postear un producto",
            icon:"error"
           })
         }
         else{
            Swal.fire({
                title:"¡Producto agregado al carrito !",
                icon:"success"
            })
            setTimeout(()=>{
            location.reload()
            },1500)
        }
        } catch (error) {
            return Swal.fire({
                title:"No se pudo conectar con la base de datos",
                icon:"error"
            })
        }
    }
    const deleteProdFromCart = async(id,idProd) => {
        try {
            const response = await fetch(`http://localhost:5000/api/carts/${id}/product/${idProd}`,{
                method:"DELETE",
                credentials:"include"
            })
            if(!response.ok){
                Swal.fire({
                    title:"Error al traer productos",
                    text:`${response.status}`,
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Producto eliminado del carrito",
                    icon:"success"
                })
                setTimeout(()=>{
                    location.reload()
                },1000)
            }
            
        } catch (error) {
            Swal.fire({
                title:"Error al traer productos",
                icon:"error"
            })
        }
    }
    const createInvoice = async(idCart,idUser) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/ticket/${idCart}/${idUser}`,{
                method:"POST",
                credentials:"include"
            })
            if(!response.ok){
                Swal.fire({
                    title:"Error al crear la factura",
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Factura creada",
                    icon:"success"
                })
            }
        } catch (error) {
            Swal.fire({
                title:"Error al crear la factura",
                icon:"error"
            })
        }
    }

const value = {
    getCartData,
    postProdToCart,
    deleteProdFromCart,
    createInvoice
  }
  return(
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}