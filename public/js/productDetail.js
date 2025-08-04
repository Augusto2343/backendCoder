const socket = io();
let cartId;
const btnComprar = document.getElementById('comprarBtn');
const productId = btnComprar.getAttribute("data-idProd");
const cartLink = document.querySelector("#cartLink");
const cartIcon = document.querySelector("#cartIcon")
const cartExistIcon = document.querySelector("#cartExistIcon")
console.log(cartLink.getAttribute("href"));
const comprobarIdCart = async () =>{
    const storagedCartId = localStorage.getItem("cartId");
    if(storagedCartId){
        cartId = storagedCartId; 
        console.log(" si hay carrito y su iD es:",storagedCartId);
        cartLink.setAttribute("href","http://localhost:5000/carts/"+ storagedCartId)
        cartIcon.classList.remove("disabled")
        cartExistIcon.classList.remove("d-none")
        
    }   

    
    else{
        console.log("No hay carrito");
        cartLink.setAttribute("href","#")
        cartIcon.classList.add("disabled")
        cartExistIcon.classList.add("d-none")

    }
}
window.addEventListener("load",() =>{
    comprobarIdCart();
})

    
    
const alertaSuccess=() =>{
    Swal.fire({
        "icon":"success",
        "title":"producto agregado al carrito exitosamente"
    }); 
}

btnComprar.addEventListener("click", async(e) => {
    console.log("Product ID:", productId);
    console.log("Cart ID:", cartId);
    
    if(cartId == undefined || cartId==""){
        try{
            const res = await fetch("http://localhost:5000/api/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const newCartId = await res.text(); 
            const cleanCartId = newCartId.replace(/^"|"$/g, '');
            console.log(cleanCartId);
            cartId= cleanCartId;
            console.log("cart id:",cartId);
            
            const agregarProd = await fetch(`http://localhost:5000/api/carts/${cartId}/product/${productId}`,
                {
                    method:"POST"
                }

            )
            console.log("Peticion:",agregarProd);
            if(agregarProd.status==200){
                alertaSuccess();
            }
            
        cartLink.setAttribute("href","http://localhost:5000/carts/"+ cartId)
        cartIcon.classList.remove("disabled")
            localStorage.setItem("cartId",cartId)
            
            comprobarIdCart();
            
        }
        catch(e){
            Swal.fire({
                "icon":"error",
                "title":`${e}`
            })
        }

    }
    else{
    socket.emit("addProd", cartId, productId);
    
    }
    
});

socket.on("errorVista", (e) =>{
    Swal.fire({
        icon:"error",
        title:"Hubo un error al cargar el producto"
    })
})
socket.on("exitoVista", (e) =>{
    Swal.fire({
        icon:"success",
        title:"Peticion procesada correctamente"
    })
})
