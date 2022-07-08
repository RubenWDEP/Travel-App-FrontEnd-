import { useEffect, useState } from 'react';
import RatingComponent from './Components/Rating';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import './LocationCards.css'
import { deMayorAMenor, deMayorAMenorId, deMenorAMayor } from './AuxFunction/auxOps';

function LocationCards ({card, votes}) {
    let cardResults = card;
    let voteResults = votes;
    const [cardResultsOrder, setCardResultOrder] = useState();
    const [voteResultsOrder, setVoteResultsOrder] = useState();

    useEffect(()=>{
        setCardResultOrder(cardResults);
        setVoteResultsOrder(voteResults);
        console.log("Esto es votes", voteResultsOrder);
    }, [cardResults, voteResults])

    const handleOrder = (e)=>{
        e.preventDefault();
        for (let i = 0; i < voteResultsOrder.length; i++) {
            const weightedAverage = ((voteResultsOrder[i].resultUno)*5+(voteResultsOrder[i].resultDos)*10+(voteResultsOrder[i].resultTres)*20+(voteResultsOrder[i].resultCuatro)*25+(voteResultsOrder[i].resultCinco)*40)/(100);

            voteResults[i].WeightedAverage = weightedAverage;
            cardResults[i].WeightedAverage = weightedAverage;
        }
        if (e.target.value === "masMenos") {
            console.log("ordenando de mayor a menor")
            const cardResultsMayorMenor = [...cardResults].sort(deMayorAMenor);
            const voteResultsMayorMenor = [...voteResults].sort(deMayorAMenor);
            
            cardResults = cardResultsMayorMenor;
            voteResults = voteResultsMayorMenor;
            setCardResultOrder(cardResultsMayorMenor);
            setVoteResultsOrder(voteResultsMayorMenor);
            
            console.log(cardResultsMayorMenor);
            console.log(voteResultsMayorMenor);
        }
        if (e.target.value === "menosMas") {
            console.log("ordenando de menor a mayor")
            const cardResultsMenorMayor = [...cardResults].sort(deMenorAMayor);
            const voteResultsMenorMayor = [...voteResults].sort(deMenorAMayor);
            setCardResultOrder(cardResultsMenorMayor);
            setVoteResultsOrder(voteResultsMenorMayor);
            cardResults = cardResultsMenorMayor;
            voteResults = voteResultsMenorMayor;

            console.log(cardResultsMenorMayor);
            console.log(voteResultsMenorMayor);
        }
        if (e.target.value === "...") {
            console.log("ordenando por defecto las más recientes primero")
            const cardResultsMayorMenorId = [...cardResults].sort(deMayorAMenorId);
            const voteResultsMayorMenorId = [...voteResults].sort(deMayorAMenorId);
            setCardResultOrder(cardResultsMayorMenorId);
            setVoteResultsOrder(voteResultsMayorMenorId);

            console.log(cardResultsMayorMenorId);
            console.log(voteResultsMayorMenorId);
        }
        
    }
    
    useEffect(()=>{
        console.log("Esto es cardResults en location cards", cardResults);
        console.log("Esto es votes", voteResults);
    }, [cardResults, voteResults])

    return(
        <section className='searchLocationCard'>   
            {cardResultsOrder && 
            <>
                <label htmlFor='sortResults'>Ordenar los resultados por:</label>
                <select onChange={handleOrder}>
                    <option value="...">...</option>
                    <option value="masMenos">De mayor a menor votación</option>
                    <option value="menosMas">De menor a mayor votación</option>
                </select>
    
                <ul className="searchLocationCardList">
                    {cardResultsOrder.map((result,index) => 
                        <li key={index}>
                            <article className='card-style'>
                                <h3 className='searchLocationCardName'>{result.titulo}</h3>
                                <p className='searchLocationCardCategory'><span>Categoría:</span> {result.categoría}</p>
                                <p className='searchLocationCardPlace'><span>Lugar:</span> {result.lugar}</p>
                                <p className='searchLocationCardIntro'>{result.entradilla}</p>
                                {result.foto && <img src={`${process.env.REACT_APP_API}/upload/${result.foto}`} alt="Imágenes de lugares"/>}
                                <p className='searchLocationCardText'>{result.texto}</p>
                                <p className='searchLocationCardPosted'><span>Publicado: </span>{result.create_at}</p>
                                <RatingComponent idRec={result.id_rec} rating={result.id_user_rating} ></RatingComponent>
    
                                <ul className='stars-style'>
                                    <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                                    <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                                    <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                                    <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                                    <li><StarRateIcon fontSize="small"/></li>
                                    {/* <li><StarRateOutlinedIcon fontSize="small"/></li> */}
                                </ul>
                                {votes && 
                                <aside >
                                    <ul className='count-style'>
                                        <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultCinco}
                                        </li>
                                        <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultCuatro}
                                        </li> 
                                        <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultTres}
                                        </li>
                                        <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultDos}
                                        </li>
                                        <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultUno}
                                        </li>
                                        {/* <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultCero}
                                        </li> */}
                                    </ul>
                                </aside>
                                } 
                            </article>
                        </li>
                    )}
                </ul> 
            </>   
            }
        </section>
            
       );
   
}
export default LocationCards;