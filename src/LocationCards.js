import { useEffect, useState, memo } from 'react';
import RatingComponent from './Components/Rating';
import StarRateIcon from '@mui/icons-material/StarRate';
import './LocationCards.css'
import { deMayorAMenor, deMayorAMenorId, deMenorAMayor } from './AuxFunction/auxOps';
import Comments from './Components/Comments';

function LocationCards({ card, votes, order, setOrder }) {
    const cardResults = card;
    const voteResults = votes;
    const [cardResultsOrder, setCardResultsOrder] = useState();
    const [voteResultsOrder, setVoteResultsOrder] = useState();
    const [width, setWidth] = useState();




    useEffect(() => {
        setCardResultsOrder(cardResults);
        setVoteResultsOrder(voteResults);
    }, [cardResults, voteResults]);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleOrder = (e) => {
        e.preventDefault();
        if (!order) {
            console.log("Solo ejecuto esto una vez");
            for (let i = 0; i < voteResults.length; i++) {
                const weightedAverage = ((voteResultsOrder[i].resultUno) * 5 + (voteResultsOrder[i].resultDos) * 10 + (voteResultsOrder[i].resultTres) * 20 + (voteResultsOrder[i].resultCuatro) * 25 + (voteResultsOrder[i].resultCinco) * 40) / (100);

                voteResults[i].WeightedAverage = weightedAverage;
                cardResults[i].WeightedAverage = weightedAverage;
            }
        }
        setOrder(true);
        console.log(voteResults);

        if (e.target.value === "masMenos") {
            const cardResultsMayorMenor = [...cardResults].sort(deMayorAMenor);
            const voteResultsMayorMenor = [...voteResults].sort(deMayorAMenor);
            setCardResultsOrder(cardResultsMayorMenor);
            setVoteResultsOrder(voteResultsMayorMenor);
        }
        if (e.target.value === "menosMas") {
            const cardResultsMenorMayor = [...cardResults].sort(deMenorAMayor);
            const voteResultsMenorMayor = [...voteResults].sort(deMenorAMayor);
            setCardResultsOrder(cardResultsMenorMayor);
            setVoteResultsOrder(voteResultsMenorMayor);
            console.log(cardResultsMenorMayor);
            console.log(voteResultsMenorMayor);
        }
        if (e.target.value === "recientes") {
            const cardResultsMayorMenorId = [...cardResults].sort(deMayorAMenorId);
            const voteResultsMayorMenorId = [...voteResults].sort(deMayorAMenorId);
            setCardResultsOrder(cardResultsMayorMenorId);
            setVoteResultsOrder(voteResultsMayorMenorId);
        }

    }

    return (
        <section className='searchLocationCard'>
            {cardResultsOrder &&
                <>
                    <label className='sortResults' htmlFor='sortResults'>Ordenar los resultados por:</label>
                    <select className='sortResults' onChange={handleOrder}>
                        <option>...</option>
                        <option value="recientes">Recientes</option>
                        <option value="masMenos">De mayor a menor votación</option>
                        <option value="menosMas">De menor a mayor votación</option>
                    </select>

                    <ul className="searchLocationCardList">
                        {cardResultsOrder.map((result, index) => {
                            console.log('-----')
                            console.log('result', result);
                            console.log('index', index);
                            console.log('voteresultorder', voteResultsOrder);
                            console.log("Esto es cardResultsOrder", cardResultsOrder)
                            return <li key={index}>
                                <article className='card-style'>
                                    <h3 className='searchLocationCardName'>{result.titulo}</h3>
                                    <p className='searchLocationCardCategory'><span>Categoría:</span> {result.categoría}</p>
                                    <p className='searchLocationCardPlace'><span>Lugar:</span> {result.lugar}</p>
                                    <p className='searchLocationCardIntro'>{result.entradilla}</p>
                                    {result.foto && <img src={`${process.env.REACT_APP_API}/upload/${result.foto}`} alt="Imágenes de lugares" />}
                                    <p className='searchLocationCardText'>{result.texto}</p>
                                    <p className='searchLocationCardPosted'><span>Publicado el </span>{new Date(result.create_at).toLocaleDateString()} por {result.create_by}</p>
                                    <RatingComponent idRec={result.id_rec} rating={result.id_user_rating} ></RatingComponent>

                                    {votes &&
                                        <aside >
                                            <ul className='count-style'>
                                                <li>
                                                    <StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><span className='fivestars'>{voteResultsOrder ? voteResultsOrder[index].resultCinco : "..."}</span>
                                                </li>
                                                <li>
                                                    <StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><span className='fourstars'>{voteResultsOrder ? voteResultsOrder[index].resultCuatro : "..."}</span>
                                                </li>
                                                <li>
                                                    <StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><span className='threestars'>{voteResultsOrder ? voteResultsOrder[index].resultTres : "..."}</span>
                                                </li>
                                                <li>
                                                    <StarRateIcon fontSize="small" /><StarRateIcon fontSize="small" /><span className='twostars'>{voteResultsOrder ? voteResultsOrder[index].resultDos : "..."}</span>
                                                </li>
                                                <li>
                                                    <StarRateIcon fontSize="small" /><span className='onestars'>{voteResultsOrder ? voteResultsOrder[index].resultUno : "..."}</span>
                                                </li>
                                                {/* <li>
                                            {voteResultsOrder && voteResultsOrder[index].resultCero}
                                        </li> */}
                                            </ul>
                                        </aside>
                                    }
                                    <Comments width={width} id_rec={result.id_rec} />
                                </article>
                            </li>
                        }
                        )}
                    </ul>
                </>
            }
        </section >

    );

}
const MemoLocationCards = memo(LocationCards)

export default MemoLocationCards;