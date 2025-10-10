import { Logger } from "@nestjs/common";
import { createContext, useContext, useState,useEffect } from "react";
import Swal from "sweetalert2";

const ProdContext = createContext();
export const useProdContext = () =>{
    const context = useContext(ProdContext);
    return context;
}

export const ProdProvider = ({children}) =>{
    const getProducts = async () =>{
        try {
         const response = await fetch("http://localhost:5000/api/products/",{
            method:"GET",
            credentials:"include"
         })   
         if (!response.ok) {
           Swal.fire({
            title:"Error al traer productos",
            icon:"error"
           })
         }
         else{
            const data = await response.json();
            return data;
         }
        } catch (error) {
            return Swal.fire({
                title:"Couldn't connect to the DB",
                icon:"error"
            })
        }
    }
    const getOneProduct = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"GET",
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
                const data = await response.json();
                return data;
            }
            
        } catch (error) {
            Swal.fire({
                title:"Error al traer productos",
                icon:"error"
            })
        }
    }
    const postOneProduct = async(body) =>{
        console.log(body);
        
        try {
            const response = await fetch("http://localhost:5000/api/products/",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials:"include"
            })
            if(!response.ok){
                let error = JSON.parse(response.error)
                return Swal.fire({
                    title:"Error al postear el producto",
                    text:error,
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Producto subido correctamente.",
                    icon:"success"
                })
            }
        } catch (error) {
                return Swal.fire({
                    title:"Error en el servidor",
                    text:"Vuelva a intentar despues",
                    icon:"error"
                })
        }
    }
    const deleteProd = async(id) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"DELETE",
                credentials:"include"
            })
            if(!response.ok){
                let error = JSON.parse(response.error)
                Swal.fire({
                    title:"Error al borrar el producto",
                    text:error,
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Producto eliminado correctamente.",
                    icon:"success"
                })
            }
            

        } catch (error) {
            Swal.fire({
                title:"Error en el servidor",
                text:"Vuelva intentarlo mas tarde"
            })
        }
    }
    const updateProd = async(id,body) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials:"include"
            })
            if(!response.ok){
                let error = JSON.parse(response.error)
                Swal.fire({
                    title:"Error al actualizar el producto",
                    text:error,
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Producto actualizado correctamente.",
                    icon:"success"
                })
            }
            
        } catch (error) {
            Swal.fire({
                title:"Error en el servidor",
                text:"Vuelva a intentarlo más tarde",
                icon:"error"
            })
        }
    }

const value = {
    getProducts,
    getOneProduct,
    postOneProduct,
    updateProd,
    deleteProd
  }
  return(
    <ProdContext.Provider value={value}>
        {children}
    </ProdContext.Provider>
  )
}