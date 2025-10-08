import { useEffect, useState } from "react";
import { useProdContext } from "./context/productContext";
import ProductCard from "./productCard";
import { useAuth } from "./context/AuthContext";
import Error from "./Error";

const Products = ()=>{
    const {isAuthenticated,user} = useAuth();
    const { getProducts } = useProdContext();
    const [products,setProducts] = useState([]);
    const obtainProducts = async() =>{
        let productos = await getProducts();
        setProducts(productos)
    }
    useEffect(() =>{
        obtainProducts();
        
    },[user])
    return(
        isAuthenticated ?
        <>
        <div className="w-screen flex flex-col items-center">
        <h2 className="text-xl text-gray-100">Sección productos</h2>
        <h3 className="text-md text-gray-300">Prendas, relojes,calzado y mucho mas</h3>
        </div>
        <div className="w-screen p-3 flex flex-row gap-4">

        
        {
            products.map((prod,index) =>(
                <ProductCard product={prod} key={index} ></ProductCard>
            ))
        }
        </div>
        {      
        user.role==="admin" ?
        <button className="p-3 bg-blue-900/20 shadow-sm/10 hover:shadow-lg/30 hover:bg-blue-900/70 duration-400 rounded-lg mt-2" onClick={()=>{
            handleAddProduct();
        }}>Administrar productos</button>
        :
        <>  
        </>

        }

        </>
    :
    <Error  mensaje={"Sesión expirada"} type="sessionExp"></Error>
        
    )
}
export default Products;