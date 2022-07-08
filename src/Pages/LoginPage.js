import { useEffect, useState } from 'react';
import './LoginPage.css';
import {loginOperation} from '../AuxFunction/auxOps';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../Context/loginContext';




function Login () {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const [successRegister, setSuccessRegister] = useState(null);
    const [user,setUser, token, setToken, logout, id, setID] = useToken();
    const [successRegisterMessage, setSuccessRegisterMessage] = useState(false);
    const navigate = useNavigate();

    /* const ShowSuccessRegisterMessage = ()=>{
        
        useEffect(()=>{
            const showMessage = setTimeout(() => {
                setSuccessRegisterMessage(true) 
            }, 2000);
            return () => clearTimeout(showMessage);
        }, [setSuccessRegister])
        return successRegisterMessage ? navigate("/home"):"";
    }   */ 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessRegister(null);
        setSuccessRegisterMessage(null);
        try {
            const loginAction = await loginOperation({email, password});
            if(!loginAction.res) {
                throw new Error()
            }
            console.log("token:", loginAction.Token)
            setToken(loginAction.Token);
            
           if (loginAction.Token) {
                setSuccessRegister("Usuario identificado correctamente");
                setSuccessRegisterMessage(true);
                setTimeout(() => {
                    console.log("Esto es el delay")
                    navigate("/home");
                    }, 2000); 
            } else {
                e.target.reset();
            }
        

            // ShowSuccessRegisterMessage();

            
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
       
    }

    return (
        <section className="login-page-style">
            <h2 className="log-h">¡¡¡Inicia sesión y publica tu experiencia!!!</h2>
            <form className='log-form' onSubmit={handleSubmit}>
                <label htmlFor="email" placeholder="Correo electrónico..." >Correo electrónico</label>
                <input type="email" name="email" id="email" required onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password" placeholder="Contraseña...">Contraseña</label>
                <input type="password" name="password" id="password" required onChange={(e)=>setPassword(e.target.value)}/>
                <button>Iniciar sesión</button>
                {error && <p className='errorLoginMessage'>{error}</p>}
                {successRegister && <p className='successLoginMessage'>{successRegister}</p>}
            </form>
        </section>
    );
}

export default Login;