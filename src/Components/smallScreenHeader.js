import './Header.css'
import logoHeader from "../img/logoHeader.png"
import menuHeader from "../img/menu-desplegable.png"
import { Link,  useNavigate } from 'react-router-dom'
import { useToken } from '../Context/loginContext'
import { useEffect, useState } from 'react';


function SmallScreenHeader () {
    const [user,setUser, token, setToken, logout, id, setID] = useToken();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleLogoClick = ()=>{
        /* window.location.reload() 
        document.location.reload() */
        navigate("/");
        document.location.reload();

    } 

    const handleMenuClick = ()=>{
        setOpen(!open);
    }

    function useLogout () {
        logout()
        return navigate("/");
    }

    
    return (
        <>
        <header className="header">
            <img className="image-header" src={logoHeader} alt="logoHeader" onClick={handleLogoClick}/>
            <h1>Viajes-Recomendados</h1>
            <img className="menuHeader" src={menuHeader} alt="logoHeader" onClick={handleMenuClick}/>
            
            {/* <nav>
                {!user && 
                <ul>
                    <li className='headerLink-style'>
                        <Link to={"/"}>Buscador</Link>
                    </li>
                    <li>
                        <Link to={"/login"}> Inicio de sesión</Link>
                    </li>
                    <>
                        /
                    </>
                    <li>
                        <Link to={"/register"}>Regístrate</Link>
                    </li>
                </ul>
                }

                {user && 
                <ul>
                    <li className='headerLink-style'>
                        <Link to={"/"} className='headerLink-style'>Buscador</Link>
                    </li>
                    <li className='headerLink-style'>
                        <Link to={"/home"}>home</Link>
                    </li>
                    <li className='userName'>
                        Bienvenido {user.data.email}
                    </li>
                    <li>
                       <button onClick={useLogout}>Cerrar sesión</button>
                    </li>
                </ul>}

            </nav>
            */}
        </header> 
        {open && 
            <div className="menuBurguerHeader">
                {user &&
                    <nav>
                        <ul>
                            <li className='userName'>
                                Hola {user.data.email}
                            </li>
                            <li className='menuBurguerHeaderLink-style'>
                                <Link to={"/"} className='headerLink-style'>Buscador</Link>
                            </li>
                            <li className='menuBurguerHeaderLink-style'>
                                <Link to={"/home"}>Home</Link>
                            </li>
                            <li>
                                <button className='menuBurguerHeaderLink-buttonStyle' onClick={useLogout}>Cerrar sesión</button>
                            </li>
                        </ul> 
                    </nav>}
                {!user &&
                    <nav>
                        <ul>
                            <li className='menuBurguerHeaderLink-style'>
                                <Link to={"/"}>Buscador</Link>
                            </li>
                            <li className='menuBurguerHeaderLink-style'>
                                <Link to={"/login"}> Inicio de sesión</Link>
                            </li>
                            <li className='menuBurguerHeaderLink-style'>
                                <Link to={"/register"}>Regístrate</Link>
                            </li>
                        </ul> 
                    </nav>}

            </div>}
        </>
    )
}

export default SmallScreenHeader;