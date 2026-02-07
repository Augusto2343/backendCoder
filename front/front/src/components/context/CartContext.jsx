import { createContext, useContext, useState,useEffect } from "react";
import Swal from "sweetalert2";


const CartContext = createContext();
export const useCartContext = () =>{
    const context = useContext(CartContext);
    return context;
}

export const CartProvider = ({children}) =>{
    const urlBack = import.meta.env.VITE_API_URL;

    const getCartData = async(id) =>{
        try {
         const response = await fetch(`${urlBack}api/carts/${id}`,{
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
        
         const response = await fetch(`${urlBack}api/carts/${id}/product/${idProd}`,{
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
            const response = await fetch(`${urlBack}api/carts/${id}/product/${idProd}`,{
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
            const response = await fetch(`${urlBack}api/ticket/${idCart}/${idUser}`,{
                method:"POST",
                credentials:"include"
            })
            if(!response.ok){
                return { ok: false, error: true }
            }
            else{
                const data = await response.json();
                return { ok: true, data }
            }
        } catch (error) {
            return { ok: false, error: true }
        }
    }
    const getTicket = async (id) =>{
        try {
            const response = await fetch(`${urlBack}api/ticket/${id}`,{
                method:"GET",
                credentials:"include"
            })
            if(!response.ok){
                Swal.fire({
                    title:"Error al traer el ticket",
                    icon:"error"
                })
            }
            else{
                const data = await response.json();
                return { ok: true, data:data }
            }
        } catch (error) {
            return { ok: false, error: true }
        }
    }
const value = {
    getCartData,
    postProdToCart,
    deleteProdFromCart,
    createInvoice,
    getTicket
  }
  return(
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}