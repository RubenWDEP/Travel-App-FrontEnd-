import './Header.css'
import logoHeader from "../img/logoHeader.png"
import { Link,  useNavigate } from 'react-router-dom'
import { useToken } from '../Context/loginContext'
import { useEffect, useState } from 'react';


function Header () {
    const [user,setUser, token, setToken, logout, id, setID] = useToken();
    const navigate = useNavigate();
    
    const handleLogoClick = ()=>{
        /* window.location.reload() 
        document.location.reload() */
        navigate("/");
        document.location.reload();

    } 

    function useLogout () {
        logout()
        return navigate("/");
    }

    
    return (
        <header className="header">
            <img className="image-header" src={logoHeader} alt="logoHeader" onClick={handleLogoClick}/>
            <h1>Viajes-Recomendados</h1>
            <nav>
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
            
        </header>
    )
}

export default Header