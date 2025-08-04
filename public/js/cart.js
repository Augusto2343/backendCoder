const socket = io();
const carritoElement = document.querySelector("#carrito");

//Funciones 
const reloadPage = () =>{
    location.reload();
};

const calculateTotals = () => {
    const productsItems = document.querySelectorAll(".product-item");
    let subtotal = 0;

    productsItems.forEach(item => {
        const priceElement = item.querySelector(".priceElement");
        const quantityElement = item.querySelector(".quantity-display");
        
        if (priceElement && quantityElement) {
            const priceText = priceElement.textContent;
            const quantityText = quantityElement.textContent;
            
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseFloat(quantityText);
            
            if (!isNaN(price) && !isNaN(quantity)) {
                subtotal += price * quantity;
            }
        }
    });

    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) {
        subtotalElement.textContent = "$" + subtotal.toFixed(2);
    }
    if (totalElement) {
        totalElement.textContent = "$" + subtotal.toFixed(2);
    }
};

// Event handlers
const handleQuantityChange = (event) => {
    const button = event.target;
    const action = button.getAttribute("data-action");
    const productId = button.getAttribute("data-product-id");
    
    if (!action || !productId) {
        console.error("Missing action or productId");
        return;
    }
    
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("Carrito element not found");
        return;
    }
    
    const cartId = carrito.getAttribute('data-idCart');
    if (!cartId) {
        console.error("Cart ID not found");
        return;
    }
    
    if (action === "increase") {
        socket.emit("addProd", cartId, productId);
    } else if (action === "decrease") {
        socket.emit("deleteProd", cartId, productId);
    }
};

const handleDeleteProduct = (event) => {
    const button = event.target;
    const productId = button.getAttribute("data-product-id");
    
    if (!productId) {
        console.error("Missing productId");
        return;
    }
    
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("Carrito element not found");
        return;
    }
    
    const cartId = carrito.getAttribute('data-idCart');
    if (!cartId) {
        console.error("Cart ID not found");
        return;
    }
    
    socket.emit("deleteProd", cartId, productId);
};

const handleDeleteCart = (event) => {
    const button = event.target;
    const cartId = button.getAttribute("data-cart-id");
    
    if (!cartId) {
        console.error("Missing cart ID");
        return;
    }
    
    socket.emit("deleteCart", cartId);
    localStorage.setItem("cartId", "");
};

// Definición de Sockets
socket.on("exitoVista", (data) => {
    console.log("EXITO VISTA", data);
    
    Swal.fire({
        icon: "success",
        title: "Operacion procesada con éxito",
        showConfirmButton: true,
        confirmButtonText: "Ok",
        timer: 2000
    }).then((result) => {
        
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
    }).then(() => {
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

socket.on("carritoBorrado", () => {
    if (!carritoElement) {
        console.error("Carrito element not found for update");
        return;
    }
    
    carritoElement.innerHTML = `
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


const setupEventListeners = () => {
    // Eliminando eventListeners para evitar duplicación
    document.removeEventListener('click', handleQuantityChange);
    document.removeEventListener('click', handleDeleteProduct);
    document.removeEventListener('click', handleDeleteCart);
    
    // Añadiendo eventListener a quantityBtn
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-btn')) {
            handleQuantityChange(event);
        }
    });
    
    // Añadiendo eventListener a deleteProductBtn
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-product-btn')) {
            handleDeleteProduct(event);
        }
    });
    
    // Añadiendo eventListener a clearCartBtn
    document.addEventListener('click', (event) => {
        if (event.target.id === 'clear-cart-btn') {
            handleDeleteCart(event);
        }
    });
};

// Inicializar luego de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up event listeners");
    
    const carrito = document.getElementById("carrito");
    if (!carrito) {
        console.error("Carrito element not found!");
        return;
    }
    
    const cartId = carrito.getAttribute('data-idCart');
    console.log("Cart ID:", cartId);
    
    // Definir los EventListeners
    setupEventListeners();
    
    // Calcular totales 
    calculateTotals();
});

// Recalcular los subtotales luego de cargar la pagina
window.addEventListener("load", function() {
    calculateTotals();
});
