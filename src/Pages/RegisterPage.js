import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerOperation } from "../AuxFunction/auxOps";
import './RegisterPage.css'


function RegisterPage () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [successRegister, setSuccessRegister] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        setError("");
        setSuccessRegister(null)

        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const registerAction = await registerOperation({email, password});
            if(registerAction) {
                setSuccessRegister("Usuario registrado correctamente, redirigiendo a iniciar sesión");
                navigate("/login"); //Me falta por poner settimeout...
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }

    }

    return(
        <section className="register-page-style">
            <h2 className="reg-h">¡¡¡Regístrate y comparte tus destinos!!!</h2>
            <form className="reg-form" onSubmit={handleSubmit}>
                {/* <label htmlFor="username" placeholder="Nombre de usuario..." >Nombre de usuario</label>
                <input type="text" name="username" id="username" required onChange={(e)=>setUsername(e.target.value)}/> */}
                <label htmlFor="email" placeholder="Correo electrónico..." >Correo electrónico</label>
                <input type="email" name="email" id="email" required onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password" placeholder="Contraseña...">Contraseña</label>
                <input type="password" name="password" id="password" required onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor="repeatPassword" placeholder="Repita contraseña...">Repita contraseña</label>
                <input type="password" name="repeatPassword" id="repeatPassword" required onChange={(e)=>setRepeatPassword(e.target.value)}/>
                <button>Registrar</button>
                {error && <p>{error}</p>}
                {successRegister && <p>{successRegister}</p>}
            </form>
        </section>
    );
}

export default RegisterPage;