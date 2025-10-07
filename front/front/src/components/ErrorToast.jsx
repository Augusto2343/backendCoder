const ErrorToast = ({titulo,mensaje}) =>{
    return(
        <>
        <div className="toast bg-red-900/30 z-999 w-auto h-auto">
            
            <h2 className="text-gray-100 text-xl">{titulo}</h2>
            <h3 className="text-gray-200 text-lg">{mensaje}</h3>
        </div>
        </>
    )
}
export default ErrorToast