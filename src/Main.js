import { useEffect, useState } from 'react';
import './Main.css';
import Buscador from './Buscador.js';
import LocationCards from './LocationCards';
import PreSearchWindow from './Components/preSearchWindow';
import MemoLocationCards from './LocationCards';


function Main() {
    const [card, setCard] = useState();
    const [cardId, setCardId] = useState();
    const [votes, setVotes] = useState();
    const [failSearch, setFailSearch] = useState();
    const [preSearhBarResponse, setPreSearchResponse] = useState();
    const [searchBar, setSearchBar] = useState();
    const [value, setValue] = useState();
    const [closePreSearchWindow, setClosePreSearchWindow] = useState(false);
    const [order, setOrder] = useState(false);

    return (
        <div className='main'>
            <Buscador setCard={setCard} setCardId={setCardId} setFailSearch={setFailSearch} setVotes={setVotes} setPreSearchResponse={setPreSearchResponse} searchBar={searchBar} setSearchBar={setSearchBar} value={value} setValue={setValue} setClosePreSearchWindow={setClosePreSearchWindow} setOrder={setOrder} />
            {!closePreSearchWindow && <PreSearchWindow preSearhBarResponse={preSearhBarResponse} setValue={setValue} setPreSearchResponse={setPreSearchResponse} setSearchBar={setSearchBar} />}
            <section>
                {!card ? <p className='mainMessage-style'>{failSearch ? failSearch : "¡¡¡Miles de experiencias por compartir!!!"}</p> : null}
                <MemoLocationCards card={card} cardId={cardId} votes={votes} order={order} setOrder={setOrder} />
            </section>
        </div>
    );
}
export default Main;