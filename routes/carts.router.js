import {Router} from "express";
import {readFile, writeFile} from "fs/promises";

export const cartsRoutes = Router();
    //Funcion que verifica si existe el Id a ingresar
    const modificarProductos=(carrito,pid) =>{
        let productos = carrito.productosAMostrar;
        const productoExistente = productos.find(item => item.productoId == pid)

        if(productoExistente){
            productoExistente.quantity+=1;

        }
        else{
            productos.push({productoId: pid,quantity: 1})
        
        }
        
    return productos;


    }
    const consultarProd = async (products) => {
    for (const item of products) {
        if (typeof item === "number") {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${item}`);
                if (response.status === 404) {
                    console.log(`Producto ${item} no encontrado.`);
                    return false;
                }
            } catch (error) {
                console.log(`Error consultando producto ${item}:`, error);
                return false;
            }
        }
    }
    return true;
}
    class cart {
        constructor() {
        this.file = "./src/services/carrito.json";
        this.cart=[];
        }
        //Funcion que crea un carrito
        async crearCarrito(products){
            try {
                const continuar = await consultarProd(products);  

                console.log(continuar);

                if (continuar) {
                    const data = await readFile(this.file, "utf-8");
                    const cart = JSON.parse(data);
                    const id = cart.length + 1;
                    let productosAMostrar=[];
                    for (const producto of products) {
                         productosAMostrar.push({productoId:producto,quantity:1})
                    }
                    const newCart = { id, productosAMostrar };
                    cart.push(newCart);

                    await writeFile(this.file, JSON.stringify(cart, null, 2)); 
                    console.log("Devolviendo 200");
                    
                    return 200;
                } else {
                    console.log("devolviendo 404");       
                    return 404;
                }
            } catch (error) {
                console.error("Error creando el carrito:", error);
                return 500;  
            }     
            }
        //Funcion que obtiene un carrito
        async obtenerCarritoPorId(cid){
            this.cart = JSON.parse(await readFile(this.file, "utf-8"));

            let carritoSolicitado = this.cart.find(item => item.id == cid);
            return carritoSolicitado;

            
        }
        //Funcion que elimina un carrito
        async deleteCart(cid){
            console.log(cid);
            const oldArrCart=JSON.parse( await readFile(this.file, "utf-8"));
            const validarSiExiste = oldArrCart.filter(item => item.id == cid);
            if(validarSiExiste){
                this.cart = oldArrCart.filter(item => item.id != cid);
                this.cart= JSON.stringify(this.cart);
                console.log(this.cart);
                
                writeFile(this.file,this.cart);
                return 200;
            }
            else{
                return 404;
            }

        }
        async postProduct (cid, pid) {
            pid = parseInt(pid)
            const response = await fetch(`http://localhost:5000/api/products/${pid}`)
            console.log(response);
            if( response.status == 404){
                return 404
            }
            else{
                const arrCart = JSON.parse(await readFile(this.file, "utf-8"));
                this.cart=arrCart
                const cartToModif = arrCart.find(item=> item.id == cid)

                let cartIndex = this.cart.indexOf(cartToModif);
                const productos = modificarProductos(cartToModif,pid);
                this.cart[cartIndex].productosAMostrar=productos;
                this.cart=JSON.stringify(this.cart )
                writeFile(this.file,this.cart)
                return 200;
            }
        }
    }

const cartArray = new cart();
//Metodo Post 
cartsRoutes.post("/", async (req,res) =>{
    const {products} =req.body;
    
    console.log(products);
    
    let validacion= await cartArray.crearCarrito(products);

    res.status(validacion).send(validacion == 200 ? "Producto creado" : "Error");
})
//Metodo get by id
cartsRoutes.get("/:cid", async (req,res) =>{
    const {cid} = req.params;
    let carritoAMostrar = await cartArray.obtenerCarritoPorId(cid);

    
    if(carritoAMostrar){
        res.status(200).send(carritoAMostrar);

    }
    else{
        res.status(404).send("No encontramos un carrito con ese id")
    }
})
// Metodo delete
cartsRoutes.delete("/:cid", async (req,res) =>{
    const {cid} = req.params;
    let validacion= await cartArray.deleteCart(cid)
    console.log(validacion);
    
    res.status(validacion).send(validacion== 200? "Producto eliminado":"No se encontró el carrito" )

})
// Método postProd
cartsRoutes.post("/:cid/product/:pid",async (req,res) =>{
    const {cid}= req.params;
    const {pid} = req.params;
    console.log(cid, pid);
    let response =await cartArray.postProduct(cid,pid)
    res.status(response).send(response== 200? "Producto añadido":"No se encontró el producto" )

})
export default cartsRoutes;