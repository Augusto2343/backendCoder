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

const value = {
    getProducts,
    getOneProduct
  }
  return(
    <ProdContext.Provider value={value}>
        {children}
    </ProdContext.Provider>
  )
}