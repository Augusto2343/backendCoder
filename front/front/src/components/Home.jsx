import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import Error from "./Error";
import Banner from "./Banner";
const Home = ()=>{
    const {isAuthenticated} = useAuth();

    return (
        
            isAuthenticated ? 
            <div>
                
                <Banner img="https://www.casio.com/content/casio/locales/es/es/products/watches/edifice/brand/collection/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1752159444130/eqb-1100d-1aer-edifice-2022-offigure-1920x612.jpeg">
                <div className=" absolute top-50 left-2">
                <h1 className="text-2xl " style={{maxWidth:"500px"}}>Bienvenido a Mercado  El Capitán</h1>

                </div>
                </Banner>
            </div>
            
        :
        <Error mensaje={"Sesión expirada"} type="sessionExp"></Error>

        
    )
}
export default Home