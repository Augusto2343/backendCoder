import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useProdContext } from "./context/productContext";
import Swal from "sweetalert2";
import { useCartContext } from "./context/cartContext";
import { useAuth } from "./context/AuthContext";
const ProductDetail = () =>{

    const [product,setProduct] = useState();
    const {id} = useParams();
    const{ getOneProduct} = useProdContext();
    const {getCartData,postProdToCart} = useCartContext();
    const {isAuthenticated,user} = useAuth();
    const obtainOneProduct = async() =>{
        let producto = await getOneProduct(id);
        setProduct(producto)
    }
    useEffect(()=>{
        obtainOneProduct()
        
    },[])
    const handleAddCart= async() =>{
        const cart = await getCartData(user.cartId);
        let cartId = cart._id;
        if(!product.stock > 0) {
            return Swal.fire({
                title:"No hay stock suficiente",
                icon:"error"
            })
        }
        else{
           const response = await postProdToCart(cartId,id)   
        }
    }
    return (
        product?
        <>
        <div className="w-screen h-auto  grid grid-cols-2"> 
            <div className="">
                {
                    product.thumbnail ?
                        <img src={product.thumbnail} alt="imgProd"></img>
                    :
                    <>
                    <div className="bg-gray-500 w-full h-full">
                        <h3 className="text-gray-100 text-md">Imagen del producto no disponible</h3>
                    </div>
                    </>
                }
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl text-100">{product.title}</h2>
                <p className="text-md text-200">{product.description}</p>
                <div className="flex flex-row items-center justify-center">
                    <h4 className="text-gray-100 text-lg">Stock:{product.stock}</h4>
                    <h4 className="text-gray-100 text-lg">Price:{product.price}</h4>
                </div>
                <button className="p-3 bg-blue-900/20 shadow-sm/10 hover:shadow-lg/30 hover:bg-blue-900/70 duration-400 rounded-lg mt-2" onClick={()=>{
                    handleAddCart();
                }}>Agregar al carrito</button>
            </div>
        </div>
        </>
        :
        <div className="w-screen h-screen"> 
        <h2 className="text-xl text-gray-100">No se encontró el producto</h2>
        </div>
    )
}
export default ProductDetail