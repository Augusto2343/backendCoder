import { useState, useEffect, useContext } from "react";
import { useProdContext } from "./context/ProductContext";
import Swal from "sweetalert2";
const ProductsAdmin = () =>{
    const {postOneProduct,getProducts,updateProd,deleteProd} = useProdContext()
    const [productos,setProductos] = useState();
    const [postForm,setPostForm] =useState({
        title:"",
        description:"",
        price: 0,
        status:false,
        code:"",
        stock:0,
        category:"",
        thumbnail:""
    }) 
    const [updateProdForm,setUpdateProdForm] =useState({
        title:"",
        description:"",
        price: 0,
        status:false,
        code:"",
        stock:0,
        category:"",
        thumbnail:""
    })
    const [deleteIdProd, setDeleteIdProd] = useState();
    const obtainProds = async () =>{
        const prods = await getProducts();
        setProductos(prods);
    }
    useEffect(() =>{
        obtainProds();
    },[])
    const handleChangePost = async(e,input) =>{
        
        const inputsOfPost = postForm;
        switch (input){
            case "title":
                inputsOfPost.title=e
                break;
            case "category":
                inputsOfPost.category=e
                break;
            case "description":
                inputsOfPost.description=e
                break;
            case "code":
                inputsOfPost.code=e
                break;
            case "price":
                inputsOfPost.price=e
                break;
            case "stock":
                inputsOfPost.stock=e
                break;
            case "thumbnail":
                inputsOfPost.thumbnail=e
                break;
            default:
                break;
        }
        console.log(inputsOfPost);
        
        setPostForm(inputsOfPost);
    }
    const handleSubmitPost = async (e) =>{
        e.preventDefault();
        console.log(e);
        
        try {
            const product= postForm
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
    const handleIdPutChange =async(idProd) =>{
        const product = productos.find((prod) =>prod._id === idProd);
        console.log(product);
        setUpdateProdForm({...product})
    }
    const handleChangeUpdate = async(e,input) =>{
        
        const inputsOfUpdate = {...updateProdForm};
        switch (input){
            case "title":
                inputsOfUpdate.title=e
                break;
            case "category":
                inputsOfUpdate.category=e
                break;
            case "description":
                inputsOfUpdate.description=e
                break;
            case "code":
                inputsOfUpdate.code=e
                break;
            case "price":
                inputsOfUpdate.price=e
                break;
            case "stock":
                inputsOfUpdate.stock=e
                break;
            case "thumbnail":
                inputsOfUpdate.thumbnail=e
                break;
            case "status":
                inputsOfUpdate.status=e === "true"
                break;
            default:
                break;
        }
        console.log(inputsOfUpdate);
        
        setUpdateProdForm(inputsOfUpdate);
    }
    const handleUpdateForm = async (e) =>{
        e.preventDefault();
        console.log(e);
        
        try {
            const idProd = updateProdForm._id
            const newProduct= {
                title:updateProdForm.title,
                category:updateProdForm.category,
                description:updateProdForm.description,
                code:updateProdForm.code,
                stock:updateProdForm.stock,
                price:updateProdForm.price,
                thumbnail:updateProdForm.thumbnail,

            }

            const response = await updateProd(idProd,newProduct);
            console.log(response);
            
        } catch (error) {
            Swal.fire({
                title:"error",
                text:`${error}`
            })
        }   
    }
    const handleDeleteForm = async (e) =>{
        e.preventDefault();
        try {
            const response = await deleteProd(deleteIdProd)
        } catch (error) {
            
        }
    }
    return (
        <>
        <section className="flex flex-col items-center justify-center w-screen">
        <div className="grid grid-cols-2 w-full">
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
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}
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
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

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
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

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
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

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
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

                        className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-200 mb-1" htmlFor="thumbnail">Thumbnail (URL)</label>
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        
                        onChange={(e) =>{handleChangePost(e.target.value,e.target.id)}}

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
    <div className="mt-10 bg-gray-800/60 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h3 className="text-lg font-bold mb-4 text-gray-100 ">Actualizar producto</h3>
        <form onSubmit={(e) =>{handleUpdateForm(e)}} className="space-y-4 text-gray-900 w-full">
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="id">ID del producto</label>
                <select 
                    className="bg-gray-200 p-2 rounded-lg"
                    onChange={(e) =>{handleIdPutChange(e.target.value)}}
                >
                    <option value={null}>Seleccione un producto</option>
                    {
                        productos?.map((prod,index) =>(
                        <option key={index} value={prod._id}>
                            {prod.title}
                        </option>
                        ))
                    }
                    
                </select>
                </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="title">Nombre</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={updateProdForm.title || ""}
                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}

                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="code">Código</label>
                <input
                    id="code"
                    name="code"
                    type="text"
                    value={updateProdForm.code || ""}
                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="category">Categoría</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    value={updateProdForm.category || ""}
                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="status">Estado</label>
                <select
                    id="status"
                    name="status"
                    value={updateProdForm.status ? "true" : "false"}
                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
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
                    value={updateProdForm.description || ""}
                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
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
                    value={updateProdForm.price || ""}

                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={updateProdForm.stock || ""}

                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="thumbnail">Thumbnail (URL)</label>
                <input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={updateProdForm.thumbnail || ""}

                    onChange={(e) =>{handleChangeUpdate(e.target.value,e.target.id)}}
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
                Actualizar producto
            </button>
        </form>
    </div> 
    </div>
    <div className="mt-10 bg-gray-800/60 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-4 text-gray-100">Borrar producto</h3>
        <form onSubmit={(e) =>{handleDeleteForm(e)}} className="space-y-4 text-gray-900">
            <div>
                <label className="block text-gray-200 mb-1" htmlFor="id">ID del producto</label>
                <select 
                    className="bg-gray-200 p-2 rounded-lg"
                    onChange={(e) =>{setDeleteIdProd(e.target.value)}}
                    >
                    <option value={null}>Seleccione un producto</option>
                    {
                        productos?.map((prod,index) =>(
                        <option key={index} value={prod._id}>
                            {prod.title}
                        </option>
                        ))
                    }
                    
                </select>
                </div>
            <button
                type="submit"
                className="w-full mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
            >
                Borrar producto
            </button>
        </form>
    </div> 
    </section>
    </>
    )
    
}
export default ProductsAdmin