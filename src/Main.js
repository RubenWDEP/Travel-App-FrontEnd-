import { useState } from 'react';
import './Main.css';
import Buscador from './Buscador.js';
import LocationCards from './LocationCards';


function Main () {
    const [card, setCard] = useState();    
    const [cardId, setCardId] = useState();
    const [votes, setVotes] = useState();
    const [failSearch, setFailSearch] = useState();
    console.log(votes);

    return (
        <div className='main'>
            <Buscador setCard={setCard} setCardId={setCardId} setFailSearch={setFailSearch} setVotes={setVotes}/>
            <section>
                {!card ? <p className='mainMessage-style'>{failSearch ? failSearch:"¡¡¡Miles de experiencias por compartir!!!"}</p>:null}
                <LocationCards card={card} cardId={cardId} votes={votes}/>
            </section>
        </div>
    );


}
export default Main