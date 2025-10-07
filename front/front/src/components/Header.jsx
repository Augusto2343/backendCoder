import CartIcon from './CartIcon.jsx'
import Nav from './Nav.jsx'
import UserIcon from './UserIcon.jsx'
const Header = ()=>{
    return (
        <header className='flex flex-row items-center justify-between w-screen p-2 '>
            <h1>Mercado el capitán</h1>
            <Nav/>
            <div className='flex flex-row items-center gap-4'>
            <CartIcon></CartIcon>
            <UserIcon></UserIcon>
            </div>
            
        </header>
    )
}
export default Header