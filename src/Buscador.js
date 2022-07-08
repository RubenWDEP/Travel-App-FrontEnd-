import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { countVotes, getUserRating } from './AuxFunction/auxOps';
import './Buscador.css'
import { useToken } from './Context/loginContext';
import iconoLupa from './img/iconoLupa.png'


function Buscador ({setCard, setCardId, setFailSearch, setVotes}) {
    const [value, setValue] = useState();
    const [idArrayGlobalVotes, setIdArrayGlobalVotes] = useState();
    const [criteria, setfilterCriteria] = useState();
    const [searchBar, setSearchBar] = useState();
    const navigate = useNavigate();

    const [user,setUser, token, setToken, logout, id, setID] = useToken();
    const userData = JSON.parse(localStorage.getItem("user"))
    
    const handleClick = async e => {
        e.preventDefault();
        console.log(criteria);
        try {
                const params = new URLSearchParams({criteria, searchBar}).toString()
                const response = await fetch(`${process.env.REACT_APP_API}/getrecommendations?${params}`);
                const apiRes = await response.json();
                apiRes.res = response.ok;
                console.log("hola");
                if(response.ok) {
                    console.log(apiRes);
                    setCard(apiRes.results);
                } else {
                    throw new Error(apiRes.message)
                }
                
                let cardIdResults = [];
                if (userData) {
                    for (let i = 0; i < apiRes.results.length; i++) {
                        cardIdResults.push(apiRes.results[i].id_rec);
                    }
                    setIdArrayGlobalVotes(cardIdResults);
                    console.log("Esto es cardidresults del buble:", cardIdResults);
                    console.log("Esto es idArrayGlobalVotes:", idArrayGlobalVotes);
                    
                    const resUserRatingTable = await getUserRating(token);
                    console.log(resUserRatingTable.data);
                    const resUserRatingTableFiltered = resUserRatingTable.data.filter((rec)=> cardIdResults.includes(rec.id_user_rating));
                    console.log("Esto es resUserRatingTableFiltered en buscador:", resUserRatingTableFiltered);
                    setCardId(resUserRatingTableFiltered)
    
                    if (apiRes) {
                        for (let i = 0; i < apiRes.results.length; i++) {
                            for (let y = 0; y < resUserRatingTableFiltered.length; y++){
    
                                if (apiRes.results[i].id_rec === resUserRatingTableFiltered[y].id_user_rating) {   
                                    apiRes.results[i].id_user_rating = resUserRatingTableFiltered[y].votevalue
                                };
                            };
                        };
                    };
                } else {
                    for (let i = 0; i < apiRes.results.length; i++) {
                        cardIdResults.push(apiRes.results[i].id_rec);
                    }
                    setIdArrayGlobalVotes(cardIdResults);
                }

                const globalVotes = await countVotes(cardIdResults);
                setVotes(globalVotes.results);
                console.log("EStos es votes", globalVotes.results);         

        } catch (error) {
            console.error(error);
            setFailSearch(error.message);
            e.target.reset();
            setCard(null);
        }

    }


    let placeHolder;
    switch (criteria) {
        case "lugar":
            placeHolder = "Ej: Madrid, Chipiona..."
            break;
        case "categoría":
            placeHolder = "Evento, Playa, Montaña, Relax o Ciudad"
            break;
    
        default:
            break;
    }

    return(
        <div className='div-searchBox'>
            <form className='style-search-form' onSubmit={handleClick}>
                <label>
                    <span>Busca un lugar por</span> 
                    <select className='selectCategory' name="criteria" value={criteria} id="criteria" onChange={e => setfilterCriteria(e.target.value)}>
                        <option>...</option>
                        <option value="lugar">Lugar</option>
                        <option value="categoría">Categoría</option>
                    </select>
                </label>
                <label className="search-box" htmlFor="searchbox">Buscar</label>
                <input className="search-box" placeholder={placeHolder} name="searchbox" id="searchbox" value={value} onChange={(e)=>setSearchBar(e.target.value)}></input>
                <button>
                    <img className='magnifying-glass' src={iconoLupa} alt="Lupa"/>
                </button>
            </form>
        </div>


    );
}

export default Buscador