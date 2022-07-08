import {useEffect} from 'react';
import './LatestPublications.css';
import {deletepost} from '../AuxFunction/auxOps'
import {useToken} from '../Context/loginContext'


function LatestPublications ({recs, setRecs}) {
    const [user,setUser, token, setToken, logout, id, setID]= useToken();
    const reversedRecs = [...recs].reverse();
    
    const handleDelete = async (e)=>{
        try {
            console.log("he hecho click", e.target.value)
            const deleteAction = await deletepost(token, e.target.value);
            console.log(deleteAction.updateResults);
            setRecs(deleteAction.updateResults)
        } catch (error) {
            console.error(error.message);
        }

    };

    useEffect(()=>{
        console.log("Esto es recs:", reversedRecs);
    },[recs])


    if(reversedRecs){
        return (
            <section className="homePage-latestPosts-styles">
                <h2>Últimas publicaciones:</h2>
                {reversedRecs.length===0 ? <p className='noLatestPosts'>No tienes recomendaciones</p> : null}
                <ul className="latest-cards-styles">
                    {reversedRecs.map(result => 
                        <li key={result.id_rec}>
                            <article className='latestPosts-card-style'>
                                <h3 className='locationCardName'>{result.titulo}</h3>
                                <p className='locationCard'><span>Categoría:</span> {result.categoría}</p>
                                <p className='locationCard'><span>Lugar:</span> {result.lugar}</p>
                                <p className='locationCard'>{result.entradilla}</p>
                                {result.foto ? <img src={`${process.env.REACT_APP_API}/upload/${result.foto}`} alt="Imágenes de lugares"/>:null}
                                <p className='locationCardText'>{result.texto}</p>
                                <p className='locationCard'><span>Publicado:</span> {result.create_at}</p>
                                <button value={result.id_rec} className="delete-button-style" onClick={handleDelete}>Eliminar recomendación</button>
                            </article>
                        </li>
                    )}
                </ul>
            </section>
        )
    }

}
     

export default LatestPublications;