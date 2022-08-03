import { useEffect, useState } from 'react';
import { getUserComments } from '../AuxFunction/auxOps';
import { useToken } from '../Context/loginContext';
import './Comments.css';
import CommentButtonModal from './CommentButtonModal'
import CommentInput from './CommentInput';


function Comments({ width, id_rec }) {
    const [com, setCom] = useState();
    const [user, setUser, token, setToken, logout, id, setID] = useToken();
    const [show, setShow] = useState(false);
    const [reFetch, setReFetch] = useState(false)

    const handleCommentModal = (e) => {
        setShow(!show);
    };

    useEffect(() => {

        async function cardComments(id_rec) {
            const getCardComments = await getUserComments(id_rec);
            setCom(getCardComments.results);
        }
        cardComments(id_rec);
    }, [reFetch, id_rec])

    return (
        <>
            <CommentButtonModal show={show} setShow={setShow} id_rec={id_rec} setReFetch={setReFetch} reFetch={reFetch}>
                <CommentInput show={show} setShow={setShow} id_rec={id_rec} setReFetch={setReFetch} reFetch={reFetch} />
            </CommentButtonModal>
            {width >= 595 &&
                <div className='commentBox'>
                    {com &&
                        <>
                            <div className='commentBoxHeader'>
                                <h5 className='commentTitle'>Comentarios:</h5>
                                {user && <button onClick={handleCommentModal}>Comentar</button>}
                            </div>
                            <ul>
                                {com.map((result, index) => {
                                    return <li key={index}>
                                        <p className='create_by'>{result.create_by} </p>
                                        <p className='comment'>{result.comment}</p>
                                    </li>

                                })}
                                {com.length === 0 && <p>Esta recomendación no tiene comentarios</p>}
                            </ul>
                        </>
                    }
                </div>
            }
            {width < 595 && <div>Hola</div>}
        </>
    );
}

export default Comments;