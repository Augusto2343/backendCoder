import { useState, useEffect, useContext } from "react";
import { useProdContext } from "./context/productContext";
import Swal from "sweetalert2";
const ProductsAdmin = () =>{
    const {postOneProduct} = useProdContext()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState(true);
    const [stock, setStock] = useState("");
    const [thumbnail, setThumbnail] = useState("");


    const handleSubmitPost = async (e) =>{
        e.preventDefault();
        try {
            const product= {title:title,description:description,price:price,status:status,code:code,stock:stock,category:category,thumbnail:thumbnail}
            console.log(product);
            const response = await postOneProduct(product);
            console.log(response);
            
        } catch (error) {
            Swal.fire({
                title:"error",
                text:`${error}`
            })
        }   
    }
    return (
        <>
        <section className="flex flex-row items-center justify-center w-screen">
        <div className="w-full max-w-lg mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Agregar producto</h2>
            <form onSubmit={(e) =>{handleSubmitPost(e)}} className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="title">Título</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        onChange={(e) =>{setTitle(e.target.value)}}
                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="category">Categoría</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        required
                        onChange={(e) =>{setCategory(e.target.value)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="code">Código</label>
                    <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        onChange={(e) =>{setCode(e.target.value)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        onChange={(e) =>{setDescription(e.target.value)}}

                        rows="3"
                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="price">Precio</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        onChange={(e) =>{setPrice(e.target.value)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="stock">Stock</label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        required
                        onChange={(e) =>{setStock(e.target.value)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="thumbnail">Thumbnail (URL)</label>
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        required
                        onChange={(e) =>{setThumbnail(e.target.value)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition-colors"
                >
                    Agregar producto
                </button>
            </form>
        </div>
    {/* <div className="mt-10 bg-gray-800/60 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-4 text-gray-100">Actualizar producto</h3>
        <form className="space-y-4">
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="id">ID del producto</label>
                <input
                    id="id"
                    name="id"
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="ID del producto a actualizar"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="title">Nombre</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="code">Código</label>
                <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="category">Categoría</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="status">Estado</label>
                <select
                    id="status"
                    name="status"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows="3"
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                ></textarea>
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="price">Precio</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="thumbnail">Thumbnail (URL)</label>
                <input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
                Actualizar producto
            </button>
        </form>
    </div> */}
    </section>
    </>
    )
    
}
export default ProductsAdmin