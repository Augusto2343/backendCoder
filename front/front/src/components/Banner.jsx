const Banner = ({img,children}) =>{
    return(
        <div className="w-screen relative" style={{"minHeight":"600px", "maxHeight":"900px","backgroundImage":`url(${img})`,"backgroundPosition":"center","backgroundRepeat":"no-repeat","backgroundSize":"100vw"}}>
            {children}
        </div>
    )
}
export default Banner