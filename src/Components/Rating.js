import './Rating.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import Rating from '@mui/material/Rating';
import { getUserRating, rateRecommendation } from '../AuxFunction/auxOps';
import { useToken } from '../Context/loginContext';
import { useEffect, useState } from 'react';


function RatingComponent({ idRec, rating }) {
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const [valor, setValor] = useState(0);

    let value = 0;

    useEffect(() => {
        setValor(rating)
    }, [rating]);


    let ratingValue = "";
    const userData = JSON.parse(localStorage.getItem("user"));
    const userDataId = userData ? userData.id_reg : null;

    const rateAction = async () => {
        try {
            const rateRecommendationAction = await rateRecommendation(idRec, userDataId, ratingValue, token);

        } catch (error) {
            console.error(error.message);
        }
        return
    }



    const handleRate = (event, newValue) => {
        value = newValue;
        setValor(newValue);
        switch (value) {
            case 0:
                ratingValue = "ceroestrellas"
                break;
            case 1:
                ratingValue = "unaestrella";
                break;
            case 2:
                ratingValue = "dosestrellas";
                break;
            case 3:
                ratingValue = "tresestrellas";
                break;
            case 4:
                ratingValue = "cuatroestrellas";
                break;
            case 5:
                ratingValue = "cincoestrellas";
                break;
            default:
                // throw new Error();
                break;
        }
        rateAction()

    }


    return (
        <section className='rating-stars-style'>
            {userData && <>
                <h4>Califica esta recomendación</h4>
                <Rating className='rating-style'
                    name="simple-controlled"
                    value={valor ? valor : 0}
                    onChange={handleRate} />
            </>}

            {/* Esta parte esta en desarrollo... */}
            {/* <ul className='stars-style'>
                <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                <li><StarRateIcon fontSize="small"/><StarRateIcon fontSize="small"/></li>
                <li><StarRateIcon fontSize="small"/></li>
                <li><StarRateOutlinedIcon fontSize="small"/></li>
            </ul>
            <aside >
                <ul className='count-style'>
                    <li>
                        {"Recuento"}
                    </li>
                    <li>
                        {"Recuento"}
                    </li>
                    <li>
                        {"Recuento"}
                    </li>
                    <li>
                        {"Recuento"}
                    </li>
                    <li>
                        {"Recuento"}
                    </li>
                    <li>
                        {"Recuento"}
                    </li>
                </ul>
            </aside> */}
        </section>
    );
}

export default RatingComponent;