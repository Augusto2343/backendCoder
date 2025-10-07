import cartModel from "./models/cartModel.js";
import MongoDao from "./mongo-dao.js";
class CartDao extends MongoDao{
    constructor(model){
        super(model);
    }
    getByIdPopulate = async(id)=>{
        try {
            return await this.model.findOne(id).populate("products.producto");
        } catch (error) {
            throw new Error(error)
        }
    }
    postProduct = async(idCart, product) =>{
        try {
                let continuar =true
                let carrito = await this.model.find(idCart)
                carrito = carrito[0]
                    for (const e in carrito.products) {
                        let idLocal =carrito.products[e].producto._id;
                        if(idLocal = product){
                        carrito.products[e].quantity ++;
                            const response = await this.model.updateOne({_id:idCart},carrito);
                            continuar = false;
                            return response
                            
                        }
                        else{
                            continuar= true;
                        }
                    }
                    console.log(continuar);
                    
                        
                    if(continuar ){
                        carrito.products.push({producto: product});
                        const response = await this.model.updateOne({_id:idCart},carrito);
                        return response
                    }
                }
        
        catch (error) {
              throw new Error(error);  
        }
    }
    deleteProduct = async( idCart,product) =>{
        try {
            const carrito = await this.model.findOne({_id:idCart});
            
            const productosEnCarrito = carrito.products;
            let continuar = true;
    
            for(const element in productosEnCarrito) {
                console.log(element);
                
                if(productosEnCarrito[element].producto._id == product){
                    if(productosEnCarrito[element].quantity <= 1 || productosEnCarrito[element].quantity == 0){
                        let productToModify = productosEnCarrito[element].producto;              
                        const response= await this.model.updateOne({ _id: idCart },{ $pull: {'products':{ 'producto':productToModify } } });
                        console.log(response);
                        return response;
                                                
                    }
                    else{console.log(element);
                        productosEnCarrito[element].quantity--;
                    
                        const response =await this.model.updateOne({_id:idCart,},{$set:{[`products.${element}.quantity`]:productosEnCarrito[element].quantity}});
                        console.log("response",response);
                        return response;
                    }
                }
            }
            if(continuar){
                throw new Error("No se encontró el producto en el carrito")
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartDao = new CartDao(cartModel)