import {Router} from "express";
import {readFile,writeFile} from "fs/promises"
export const productosRoutes = Router();

class productos {
    constructor() {
        this.file="./services/products.json"
        this.products=[];
    }
    //Funcion que crea un producto
    async crearProducto( title,description,code,price,status,stock,category,thumbnail){
        let productos = JSON.parse(await readFile(this.file, "utf-8"));
        this.products=productos;
        const id = productos.length + 1;
        const producto ={title,description,thumbnail,code,price,status,stock,category,id}
        this.products.push(producto)
        const newProduct = JSON.stringify(this.products);
        writeFile(this.file,newProduct);
    }
    //Funcion que obtiene productos hasta un limite
    async consultarProducts(limit){
        let productos = await readFile(this.file, "utf-8");
        console.log(typeof productos);
        const productosAMostrar = JSON.parse(productos);
        let longArray= productosAMostrar.length;
        console.log(productosAMostrar.length);
        console.log(productosAMostrar);
        
        if(longArray > limit){
            return productosAMostrar;

        }
        else{
        return productos;
        }
    }
    //Funcion que elimina un producto
    async eliminarProduct(pid){
        
        
        let productos = JSON.parse(await readFile(this.file, "utf-8"))
        
        this.products = productos.filter(item => item.id !== parseInt(pid));
        console.log(productos);
        
        if(this.products){
            const newProducts=JSON.stringify(this.products);
            writeFile(this.file, newProducts)
            return productos;

        }
        return console.error("No se pudo borrar el archivo");
                

    }
    //Funcion que obtiene un producto
    async consultarUnProducto(id){
        let productos = await readFile(this.file, "utf-8");
        this.products=JSON.parse(productos);
        id= parseInt(id);
        console.log(typeof id,typeof this.products, Array.isArray(this.products));
        
        let productoAMostrar = this.products.filter(item => item.id == id);
            console.log("Devolviendo prod",  productoAMostrar);
        if(productoAMostrar){
            console.log("Devolviendo prod", productoAMostrar);
            
            return productoAMostrar;
        }
    }
    //Funcion modificar
    async modificarProducto (pid,title,description,code,price,status,stock,category,thumbnail){
        console.log(title,description,code,price,status,stock,category);
        
        this.products = JSON.parse(await readFile(this.file, "utf-8"));
        let oldProd = this.products.find(item => item.id == pid);
        console.log(oldProd);
        
        let indexOfItem = this.products.findIndex(item=> item.id == pid)
        this.products[indexOfItem] = {title: title== undefined? oldProd.title : title,
                       description: description == undefined ? oldProd.description :description ,
                       code: code == undefined? oldProd.code :code,
                       price: price == undefined ? oldProd.price :price,
                       status: status == undefined ? oldProd.status :status,
                       stock :stock == undefined ? oldProd.stock :stock,
                       category :category == undefined ? oldProd.category : category,
                       thumbnail :thumbnail == undefined ? oldProd.thumbnail :thumbnail,
                       id: oldProd.id
                    }
      
        let newProducts = JSON.stringify(this.products);
        writeFile(this.file,newProducts)
        return this.products
    }
}
const productosArray= new productos();
//Get all
productosRoutes.get("/", async (req,res)=>{
    const limit = parseInt(req.query.limit);
    let productos = productosArray.consultarProducts(limit);
        res.send(await productos);
})
//Get by id
productosRoutes.get("/:pid", async (req,res) =>{
    let {pid}= req.params;
    let products = await productosArray.consultarUnProducto(pid);
    if(products){
       let productToShow = products.find(item => item.id == pid);
       if(productToShow){
        res.send(productToShow);
       } 
       else{
        res.status(404).send("No se encontró el producto");
       }
    }
    else{
        res.status(500).send("Error interno.");
    }
})
//Post
 productosRoutes.post("/", async (req,res) =>{
     const {title,description,code,price,status,stock,category,thumbnail} =req.body;
     
     if( typeof title !=="string" && 
         typeof description !=="string" &&
         typeof title !=="string" && 
         typeof code !=="string" && 
         typeof price !=="number" && 
         typeof status !=="boolean" && 
         typeof stock !=="number" && 
         typeof category !=="string" &&
        typeof thumbnail !== "string"){
         res.status(400).send("Error se ha ingresado un tipo de dato incorrecto")
         }
     else{
         res.send(await productosArray.crearProducto(title,description,code,price,status,stock,category,thumbnail));
     }
 })
 //Update
 productosRoutes.put("/:pid",(req,res) =>{
    let {pid} = req.params;
    pid = parseInt(pid);

    const {title,description,code,price,status,stock,category,thumbnail} =req.body;
    let productoModif = productosArray.modificarProducto(pid,title,description,code,price,status,stock,category,thumbnail)
    res.send("producto modificado",productoModif)    
 })
 //Delete
 productosRoutes.delete("/:pid", (req,res) =>{
    let {pid} =req.params;
    productosArray.eliminarProduct(pid)
    res.send(`Producto ${pid} eliminado`)
 })
export default productosRoutes;