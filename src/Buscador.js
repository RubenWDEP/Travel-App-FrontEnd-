import { useState, useMemo, useCallback } from 'react'
import { countVotes, getUserRating, preSearch } from './AuxFunction/auxOps';
import './Buscador.css'
import { useToken } from './Context/loginContext';
import iconoLupa from './img/iconoLupa.png'


function Buscador({ setCard, setCardId, setFailSearch, setVotes, setPreSearchResponse, searchBar, setSearchBar, value, setValue, setClosePreSearchWindow, setOrder }) {
    const [criteria, setfilterCriteria] = useState();
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const userData = JSON.parse(localStorage.getItem("user"))


    const handlePreSearch = async e => {
        setValue(e.target.value)
        setSearchBar(e.target.value);
        if (userData && e.target.value.length > 0 && e.target.value !== null && e.target.value.startsWith(" ") !== true && criteria === "lugar") {
            const preSearchRequestValue = await preSearch(token, e.target.value);
            if (preSearchRequestValue.res) {
                setPreSearchResponse(preSearchRequestValue.results);
                setClosePreSearchWindow(false);
            }



        } else {
            setPreSearchResponse(null);
            setClosePreSearchWindow(true);
        }
    }


    const handleClick = async e => {
        e.preventDefault();
        setOrder(false);
        try {
            setVotes(null);
            const params = new URLSearchParams({ criteria, searchBar }).toString()
            const response = await fetch(`${process.env.REACT_APP_API}/getrecommendations?${params}`);
            const apiRes = await response.json();
            apiRes.res = response.ok;

            if (response.ok) {
                setCard(apiRes.results);
            } else {
                throw new Error(apiRes.message)
            }

            let cardIdResults = [];
            if (userData) {
                for (let i = 0; i < apiRes.results.length; i++) {
                    cardIdResults.push(apiRes.results[i].id_rec);
                }

                const resUserRatingTable = await getUserRating(token);
                const resUserRatingTableFiltered = resUserRatingTable.data.filter((rec) => cardIdResults.includes(rec.id_user_rating));
                setCardId(resUserRatingTableFiltered)

                if (apiRes) {
                    for (let i = 0; i < apiRes.results.length; i++) {
                        for (let y = 0; y < resUserRatingTableFiltered.length; y++) {

                            if (apiRes.results[i].id_rec === resUserRatingTableFiltered[y].id_user_rating) {
                                apiRes.results[i].id_user_rating = resUserRatingTableFiltered[y].votevalue
                            };
                        };
                    };
                }

            } else {
                for (let i = 0; i < apiRes.results.length; i++) {
                    cardIdResults.push(apiRes.results[i].id_rec);
                }

            }

            const globalVotes = await countVotes(cardIdResults);
            setVotes(globalVotes.results);


        } catch (error) {
            console.error(error);
            setFailSearch(error.message);
            e.target.reset();
            setCard(null);
        }

    };


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

    return (
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
                {criteria === "lugar" && <input className="search-box" placeholder={placeHolder} name="searchbox" id="searchbox" value={value ? value : ""} onChange={handlePreSearch}></input>}
                {criteria === "categoría" &&
                    <select className="category-search-box" name="searchbox" id="searchbox" onChange={handlePreSearch}>
                        <option>Selecciona una categoría</option>
                        <option value="evento">Eventos</option>
                        <option value="playa">Playa</option>
                        <option value="montaña">Montaña</option>
                        <option value="ciudad">Ciudad</option>
                        <option value="relax">Relax</option>
                    </select>}
                <button>
                    <img className='magnifying-glass' src={iconoLupa} alt="Lupa" />
                </button>
            </form>
        </div>


    );
}

export default Buscador;