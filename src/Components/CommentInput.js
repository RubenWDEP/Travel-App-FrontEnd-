import { useState } from 'react';
import { sendUserComment } from '../AuxFunction/auxOps';
import { useToken } from '../Context/loginContext';
import './CommentInput.css';


function CommentInput({ setShow, id_rec, setReFetch, reFetch }) {
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const [userComment, setUserComment] = useState();
    const [createBy, setCreateBy] = useState(JSON.parse(localStorage.getItem("user")).email);
    const [statusMessage, setStatusMessage] = useState();
    const [error, setError] = useState(false);


    const handleDiscardComment = (e) => {
        e.preventDefault();
        setShow(false);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            setStatusMessage(null);
            setError(false);
            const sendComment = await sendUserComment(token, id_rec, userComment, createBy);
            if (!sendComment.res) {
                setError(true)
                throw new Error();
            } else {
                setStatusMessage("Comentario enviado correctamente")
            }
        } catch (error) {
            console.log(error.message);
            setStatusMessage("Envío fallido, por favor intentelo de nuevo")
        } finally {
            setTimeout(() => {
                setShow(false);
            }, 2000);
            setReFetch(!reFetch);

        }

    }


    return (
        <form className='commentForm'>
            <label>
                <textarea className='commentInputText' placeholder='Escribe tu comentario' name='userComment' rows='10' cols='50' maxLength="100" onChange={e => { setUserComment(e.target.value) }}>

                </textarea>
            </label>
            <button onClick={handleSubmitComment}>Comentar</button>
            <button onClick={handleDiscardComment}>Descartar</button>
            {statusMessage && <p>{statusMessage}</p>}
            {error && <p>{statusMessage}</p>}

        </form>
    )
}


export default CommentInput;