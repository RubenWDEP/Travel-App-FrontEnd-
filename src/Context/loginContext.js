import { createContext, useContext, useEffect, useState} from 'react';
import {verifyUserOperation} from '../AuxFunction/auxOps';

const LoginContext = createContext();

export function LoginContextProvider ({children}) {
    const [token, setToken] = useState(localStorage.getItem("Token"));
    const [user, setUser] = useState();
    const [id, setID] = useState();
    

    useEffect(()=>{
        localStorage.setItem("Token", token);
    },[token]);
    
    useEffect(()=>{
        const verifyToken = async ()=> {
            try {
                const verifiedUserData = await verifyUserOperation(token);
                setUser(verifiedUserData);
                localStorage.setItem("user", JSON.stringify(verifiedUserData.data));
            } catch (error) {
                console.log("fallo del fetch verifyToken")
                logout();
            }};

        if (token) {
            verifyToken();
        }
    },[token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <LoginContext.Provider value={[user,setUser, token, setToken, logout, id, setID]}>
            {children}
        </LoginContext.Provider>
    )
} 

export function useToken () {
    return useContext(LoginContext);
} 






