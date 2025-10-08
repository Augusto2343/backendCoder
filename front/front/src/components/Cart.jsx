import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext"
import Error from "./Error";
import { useCartContext } from "./context/cartContext";

const Cart = () =>{
    const {user,isAuthenticated,} = useAuth();
    const {getCartData,postProdToCart,deleteProdFromCart,createInvoice} = useCartContext();
    const [cart,setCart] = useState(null);
    const obtainCart = async () =>{
        if (!user?.cartId) return;
        const cartData = await getCartData(user.cartId);
        setCart(cartData);
        
    }
    const addProd = async(e) =>{
        console.log(e.target.id);
       const response = await postProdToCart(user.cartId,e.target.id);

    }
    const removeProd = async(e) =>{
        const response = await deleteProdFromCart(user.cartId,e.target.id);
    }
    const handleCreateInvoice = async(idCart,idUser) =>{
        const response = await createInvoice(user.cartId);
    }
    useEffect(() =>{
        obtainCart()
        console.log(cart);
        
    },[user])
    return(
        isAuthenticated?
        cart?
        <>
        <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-slate-900 to-teal-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Tu carrito</h2>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Control de stock</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.products.map((item, idx) => {
                                    console.log(item);
                                    
                                    let title = item.producto.title ;
                                    let price = Number(item?.producto.price);
                                    let qty = Number(item?.quantity ??  1);
                                    let subtotal = price * qty;
                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">${price.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{qty}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center flex flex-row items-center justify-center"> <button id={item.producto._id} onClick={(e) =>{addProd(e)}} className="bg-gray-600/20 p-1 rounded-lg hover:bg-gray-700/70" >+</button> <button id={item.producto._id} onClick={(e) =>{removeProd(e)}} className="bg-gray-600/20 p-1 rounded-lg hover:bg-gray-700/70">-</button></td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">${subtotal.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                                {(!cart?.products || cart.products.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500">Tu carrito está vacío</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-50">
                                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Total</td>
                                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                                        ${((cart?.products ?? []).reduce((acc, item) => {
                                            const price = Number(item?.producto?.price ??  0);
                                            const qty = Number(item?.quantity ??  1);
                                            return acc + price * qty;
                                        }, 0)).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                                        <button className="bg-gray-600/20 p-1 rounded-lg hover:bg-gray-700/70" onClick={()=>{handleCreateInvoice(user.cartId,user._id)}}>Crear factura</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
        :
        <div className="w-screen">
                    <h2 className="text-gray-200 text-xl">No hay productos</h2>
        </div>
        :
        <Error  mensaje={"Sesión expirada"} type="sessionExp"></Error>
    )
}
export default Cart