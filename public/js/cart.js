const socket = io();
const carritoElement = document.querySelector("#carrito");

//Funciones 
const reloadPage = () =>{
    location.reload();
}
const handleQuantityChange=(event) =>{
    console.log("handleQuantityChange called");
    const boton = event.target;
    let action = boton.getAttribute("data-action");
    let productId = boton.getAttribute("data-product-id");
    
    console.log("Action:", action, "Product ID:", productId);
    
    if(action == "increase"){
        const carrito = document.getElementById("carrito");
        const cartId = carrito.getAttribute('data-idCart');
        console.log("Emitting addProd with cartId:", cartId, "productId:", productId);
        socket.emit("addProd", cartId, productId);
    }
}

const handleDeleteProduct = (event)=>{
    console.log("handleDeleteProduct called");
    const boton = event.target;
    const action = boton.getAttribute("data-action");
    const productId = boton.getAttribute("data-product-id");
    
    if(action == "decrease"){
        const carrito = document.getElementById("carrito");
        const cartId = carrito.getAttribute('data-idCart');
        console.log("Emitting deleteProd with cartId:", cartId, "productId:", productId);
        socket.emit("deleteProd", cartId, productId);
    }
}    
const handleDeleteCart =(event) =>{
    console.log("handleDeleteCart");
   const boton = event.target;
   const localCartId = boton.getAttribute("data-cart-id");
    socket.emit("deleteCart",localCartId)
    localStorage.setItem("cartId","");
    
    
    }

    //Definicion de sockets
socket.on("exitoVista", (e) => {
    console.log("EXITO VISTA");
    
    Swal.fire({
        icon: "success",
        title: "Operacion procesada con éxito",
        showConfirmButton: true,
        confirmButtonText: "Ok"
    }).then((result) => {
        // Only reload if the user actually confirmed (clicked "Ok")
        if (result.isConfirmed) {
            reloadPage();
        }
    });
});
socket.on("errorVista", (e) => {
    console.log("ERROR VISTA");
    
    Swal.fire({
        icon: "error",
        title: "Error en la operación",
        showConfirmButton: true,
        confirmButtonText: "Ok"
    }).then((result) => {
        reloadPage();
    });
});

socket.on("notFoundVista", (e) => {
    console.log("NOT FOUND VISTA");
    
    Swal.fire({
        icon: "warning",
        title: "Recurso no encontrado",
        showConfirmButton: true,
        confirmButtonText: "Ok"
    });
});
socket.on("carritoBorrado", () =>{
    carritoElement.innerHTML =`
        <div class="empty-cart-container">
            <div class="empty-cart-animation">
                <div class="cart-icon-wrapper">
                    <i class="fas fa-shopping-cart cart-icon"></i>
                    <div class="cart-pulse"></div>
                </div>
                <h2 class="empty-cart-title">¡Carrito Vacío!</h2>
                <p class="empty-cart-message">Tu carrito ha sido limpiado exitosamente</p>
                
                <div class="return-button-container">
                    <button class="return-button" onclick="window.location.href='/products'">
                        <span class="button-content">
                            <i class="fas fa-arrow-left button-icon"></i>
                            <span class="button-text">Volver a Productos</span>
                        </span>
                        <div class="button-shine"></div>
                        <div class="button-particles"></div>
                    </button>
                </div>
            </div>
        </div>
        
        <style>
            .empty-cart-container {
                min-height: 50vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                margin: 2rem 0;
                padding: 3rem;
            }
            
            .empty-cart-animation {
                text-align: center;
                color: #6c757d;
            }
            
            .cart-icon-wrapper {
                margin-bottom: 1.5rem;
            }
            
            .cart-icon {
                font-size: 3rem;
                color: #adb5bd;
                margin-bottom: 1rem;
            }
            
            .empty-cart-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #495057;
            }
            
            .empty-cart-message {
                font-size: 1rem;
                color: #6c757d;
                margin-bottom: 2rem;
            }
            
            .return-button {
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                font-weight: 500;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.2s ease;
            }
            
            .return-button:hover {
                background-color: #0056b3;
            }
            
            .button-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .button-icon {
                font-size: 1rem;
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
                .empty-cart-container {
                    margin: 1rem 0;
                    padding: 2rem;
                }
                
                .cart-icon {
                    font-size: 2.5rem;
                }
                
                .empty-cart-title {
                    font-size: 1.25rem;
                }
                
                .empty-cart-message {
                    font-size: 0.9rem;
                }
                
                .return-button {
                    padding: 0.6rem 1.2rem;
                    font-size: 0.9rem;
                }
            }
        </style>
    `;
    
    // Notificacion de Swal
    Swal.fire({
        icon: 'success',
        title: '¡Carrito Limpiado!',
        text: 'Todos los productos han sido eliminados del carrito',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
    });
});
const calculateTotals = () =>{
    const productsItems = document.querySelectorAll(".product-item");
    
    let subtotal =0;

    productsItems.forEach(item =>{
       const priceElement = item.querySelector(".priceElement")
       const priceText = priceElement.textContent;
        const quantityElement = item.querySelector(".quantity-display")
        console.log("Obteniendo precios :D");
        
        const price = parseFloat(priceText.replace('$',''));
        const quantity = parseFloat(quantityElement.textContent)
        subtotal += price*quantity
        console.log(price,quantity);
        
    })
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    subtotalElement.textContent = "$"+subtotal.toFixed(2);
    totalElement.textContent = "$"+subtotal.toFixed(2); 
    
    console.log(`$${subtotal.toFixed(2)}`);
    console.log(`$${subtotal.toFixed(2)}`);
    console.log("calculando total");

}
window.addEventListener("load",function() {
    calculateTotals()
})
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up event listeners");
    
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("Carrito element not found!");
        return;
    }
    
    const cartId = carrito.getAttribute('data-idCart');
    console.log("Cart ID:", cartId);
    
    // Botones de cantidad
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', handleQuantityChange);
    });
    
    // Boton borrar producto
    document.querySelectorAll('.delete-product-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteProduct);
    });
    
    // Boton borrar carrito
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', handleDeleteCart);
    }


});
