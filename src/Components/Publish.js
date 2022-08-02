import { useState } from 'react';
import './Publish.css';
import { sendNewRecommentdation } from '../AuxFunction/auxOps';
import { useToken } from '../Context/loginContext';
import { create } from '@mui/material/styles/createTransitions';



function Publish({ setRecs }) {
    const [sending, setSending] = useState();
    const [error, setError] = useState();
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const [succesPublish, setSuccesPublish] = useState();
    const create_byOnLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(create_byOnLocalStorage.email);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSending(true)
            const newRecommendationData = new FormData(e.target);
            newRecommendationData.append("create_by", create_byOnLocalStorage.email)
            const newRecommendation = await sendNewRecommentdation(newRecommendationData, token);
            setRecs(newRecommendation.publishData);
            e.target.reset();
            setSuccesPublish(newRecommendation.message);
            if (newRecommendation.res) {
                setError(null)
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
            setTimeout(() => {
                setSuccesPublish(null)
            }, 2000);
        }
    }


    return (
        <section className='publish-page-style'>
            <h2 className='pub-h'>Publica una recomendación</h2>
            <form className='pub-form' onSubmit={handleSubmit}>
                <label className='publishCardLabel' htmlFor="titulo" placeholder="Título..." >Título</label>
                <input className='publishCardInput' type="text" name="titulo" id="titulo" required />

                <label className='publishCardLabel' htmlFor="categoria" placeholder="Categoría...">Categoría</label>
                <select className='publishCardInput' name='categoria'>
                    <option>Selecciona una categoría...</option>
                    <option value="evento">Eventos</option>
                    <option value="playa">Playa</option>
                    <option value="montaña">Montaña</option>
                    <option value="ciudad">Ciudad</option>
                    <option value="relax">Relax</option>
                </select>

                <label className='publishCardLabel' htmlFor="lugar" placeholder="Lugar...">Lugar</label>
                <input className='publishCardInput' type="text" name="lugar" id="lugar" required />

                <label className='publishCardLabel' htmlFor="entradilla" placeholder="Entradilla...">Entradilla</label>
                <input className='publishCardInput' type="text" name="entradilla" id="entradilla" required />

                <label className='publishCardLabel' htmlFor="texto" placeholder="Texto...">Texto</label>
                <textarea className='publishCardInput' name='texto' id='texto' rows="10" cols="40"></textarea>
                <label className='publishCardLabel' htmlFor="foto" placeholder='Insertar imagen...'>Foto (opcional)</label>
                <input className='publishCardInput' type="file" name="foto" id="foto" accept='image/png, image/jpeg' />
                <button>{sending ? "Enviando" : "Publicar"}</button>
                {succesPublish && <p className='successPublishMessage'>{succesPublish}</p>}
                {error && <p className='errorPostMessage'>{error}</p>}
            </form>

        </section>

    )
}

export default Publish;