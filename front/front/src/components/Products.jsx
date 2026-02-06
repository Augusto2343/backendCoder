import { useEffect, useState } from "react";
import { useProdContext } from "./context/ProductContext";
import ProductCard from "./productCard";
import { useAuth } from "./context/AuthContext";
import Error from "./Error";
import ProductsAdmin from "./ProductsAdmin";



const Products = ()=>{

    const {isAuthenticated,user} = useAuth();
    const { getProducts } = useProdContext();
    const [products,setProducts] = useState([]);
    const [consoleAdmin,setConsoleAdmin] = useState(false);
    const adminConsole = () =>{
        if(user.role === "admin"){
            if(!consoleAdmin){
                setConsoleAdmin(true)
            }
            else{
                setConsoleAdmin(false)

            }
        }
    }
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
        <section className="flex flex-col align-center justify-center w-screen mt-10">
        <h2 className="text-xl text-gray-100">Sección productos</h2>
        <h3 className="text-md text-gray-300">Prendas, relojes,calzado y mucho mas</h3>
        <div className="w-screen grid grid-cols-3 items-center">
        
        </div>
        <div className="w-screen p-3 flex flex-row gap-4 items-center justify-center">

        
        {
            products.map((prod,index) =>(
                <ProductCard product={prod} key={index} ></ProductCard>
            ))
        }
        </div>
        {      
        user.role==="admin" ?
        <>
        <button className=" absolute top-40 left-0 p-3 bg-blue-900/20 shadow-sm/10 hover:shadow-lg/30 hover:bg-blue-900/70 duration-400 rounded-lg mt-2" onClick={()=>{
        adminConsole()}}>Administrar productos</button>
        {
            consoleAdmin?
            <ProductsAdmin></ProductsAdmin>
            :
            <></>
        }
        </>

        :
        <>  
        </>

        }
        </section>
        </>
    :
    <Error  mensaje={"Sesión expirada"} type="sessionExp"></Error>
        
    )
}
export default Products;