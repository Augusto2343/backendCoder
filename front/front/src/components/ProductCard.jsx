import { Link } from "react-router-dom";

const ProductCard = ({product}) =>{
    return(

        <div className="card p-2 bg-stone-700/40 flex flex-col max-w-120 rounded-lg shadow-md/10 hover:shadow-lg/40 duration-700">
        { product.thumbnail?
            <img src={product.thumbnail}></img>
            :
            <div className="p-3 bg-gray-800/20">
               <h4>No hay una imagen disponible del producto</h4> 
            </div>
        }
            <h2 className="text-gray-100 text-xl">{product.title}</h2>
            <p className="text-gray-200 text-md">{product.description}</p>
            <Link className="p-3 bg-blue-900/20 shadow-sm/10 hover:shadow-lg/30 hover:bg-blue-900/70 duration-400 rounded-lg mt-2" to={`/product/${product._id}`}>Ver más</Link>
        </div>
    )
}
export default ProductCard;