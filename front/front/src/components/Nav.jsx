const Nav = ()=>{
    return (
        <nav className="flex flex-row gap-3">
            <a className="p-2 rounded-lg bg-blue-800/30 hover:bg-blue-800/100 " href="/">Home</a>
            <a className="p-2 rounded-lg bg-blue-800/30 hover:bg-blue-800/100 " href="/products">Products</a>
        </nav>
    )
}
export default Nav