const socketServer = io();

let cartId;
const cartLink = document.querySelector("#cartLink");
const cartIcon = document.querySelector("#cartIcon");
const quantityText = document.querySelector("#quantityCart")

window.addEventListener("load", function(){
    comprobarIdCart();
})
socketServer.on("realTimeProducts", productos =>{
    const contenido = document.getElementById("productList");
    let contenidoHTML = "";
    for (const producto of productos) {
        contenidoHTML += `<div class="card" style="width: 18rem;">
                            <img src="${producto.thumbnail}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.title}</h5>
                                <p class="card-text">${producto.description}</p>
                                <p class="card-text">${producto.price}</p>
                                
                            </div>
                            </div>`
    }
    contenido.innerHTML = contenidoHTML;
})
const crearNuevoProducto = (e) =>{
    e.preventDefault(); 
    console.log(e);
    
}
document.getElementById('newProductForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se recargue la página

  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const category = document.querySelector('input[name="category"]').value;
  const price = parseInt(document.querySelector('input[name="price"]').value);
  const code = document.querySelector('input[name="code"]').value;
  const imgLink= document.querySelector('input[name="imgLink"]').value;
  const status = document.querySelector('select[name="status"]').value;
  const stock = parseInt( document.querySelector('input[name="stock"]').value);

  const newProd= {title,description,code,price,status,stock,category,thumbnail:imgLink}
  console.log(newProd);
  
    socketServer.emit("subirProducto", newProd)

});
document.getElementById('deleteProdForm').addEventListener("submit",function(event){
    event.preventDefault();
    const idDelete = document.querySelector('input[name = "deleteProdId"').value;
    console.log(idDelete);
    socketServer.emit("borrarProd",idDelete);
    
})
document.getElementById('updateProductForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se recargue la página 
  const idProd = document.querySelector('input[name ="idProd').value
  const title = document.querySelector('input[name="updateTitle"]').value;
  const description = document.querySelector('input[name="updateDescription"]').value;
  const category = document.querySelector('input[name="updateCategory"]').value;
  const price = document.querySelector('input[name="updatePrice"]').value;
  const code = document.querySelector('input[name="updateCode"]').value;
  const imgLink= document.querySelector('input[name="updateImgLink"]').value;
  const status = document.querySelector('select[name="updateStatus"]').value;
  const stock = document.querySelector('input[name="updateStock"]').value;

  const newProd= {title : title =="" ? undefined : title,
    description : description == "" ? undefined : description,
    price: price == "" ? undefined: parseInt(price),
    code: code =="" ? undefined: code,
    status: status =="" ? undefined: status,
    stock: stock =="" ? undefined : parseInt(stock),
    category: category==""? undefined: category,thumbnail:imgLink==""? undefined : imgLink}
    console.log(newProd);
    console.log(idProd);
    
    socketServer.emit("updateProd", newProd,idProd)

});
socketServer.on("errorVista", async(res) =>{
    Swal.fire({
        icon:"error",
        title:`Hubo un error al cargar el producto:${res}`
    })
})
socketServer.on("exitoVista", (e) =>{
    Swal.fire({
        icon:"success",
        title:"Peticion procesada correctamente"
    })
})

socketServer.emit("comprobarCart");