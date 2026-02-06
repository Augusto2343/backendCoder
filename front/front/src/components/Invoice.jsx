import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
const Invoice = () =>{
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const {getTicket} = useCartContext();
    const {user, isAuthenticated} = useAuth();
    const [ticketInfo, setTicketInfo] = useState();
    const confirmTicket = async() =>{
        const response = await getTicket(ticketId)
        setTicketInfo(response.data)
    }
     useEffect(() =>{
        confirmTicket();
    },[user])
    return(
        <>
        
        <div className="w-full flex  align-center justify-center ">
        <div className="min-w-120 bg-gray-300 text-gray-900  max-w-150 p-2 ">
        <div className="w-auto  flex flex-row items-center justify-between mt-2 ">
            <h3 className="text-xl">Factura de compra</h3>
            <h4 className="text-md">Fecha: {ticketInfo?.purchase_datetime}</h4>
        </div>
        <div className="mt-3 w-auto flex flex-row mb-2">
            <h3 className="text-lg">Purchaser: {ticketInfo?.purchaser}</h3>
            
        </div>
        <hr className="border-0.7 mt-2 mb-2"></hr>
        <div className="w-full flex flex-col  ">
            <h4 className="text-xl text-left">Productos:</h4>
            {
                ticketInfo?.products?.map((producto, index) =>(
                    <div className="flex flex-col mt-2 mb-2" key={index}>
                    <div className="flex flex-row items-center justify-between ">
                        <h4 className="text-md" >{index+1}- id:{producto.id} </h4>
                        <h4 className="text-md" >${producto.price}</h4>
                    </div>
                        <div className="text-left ml-2">
                        <h4 className="text-md">Cantidad:{producto.quantity}</h4>
                        </div>
                        
                    </div>
                ))
            }
            <h5 className="text-md text-left">-------------------------------</h5>
        </div>
        <h3 className="text-xl text-left mt-2 mb-4">TOTAL: ${ticketInfo?.amount}</h3>
        <h4 className="text-md text-right mb-1">{ticketInfo?.code}</h4>
        </div>
        </div>
        </>
        
    )
}
export default Invoice;