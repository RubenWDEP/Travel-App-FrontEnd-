import { useEffect, useState } from "react";
import { getPostsFromCurrentUser } from "../AuxFunction/auxOps";
import { useToken } from "../Context/loginContext";


export function useLatestRec () {
    const [recs, setRecs] = useState([]);
    const [user,setUser, token, setToken, logout, id, setID] = useToken();
    
    useEffect(()=>{
        
        const getLatestsPost = async ()=>{
            try {
                if (user){
                const getLatestsPostAction = await getPostsFromCurrentUser(token, user.data.id_reg);
                setRecs(getLatestsPostAction.results);
                }           

            } catch (error) {
                console.error(error.message)
            }
        }
        getLatestsPost()
    }, [user]); 


    //No funciona y no sé por qué...
    /* function updatePost (newPost) { 
        setRecs([...recs, newPost]);
    }; */

    


    return [recs, setRecs];
};