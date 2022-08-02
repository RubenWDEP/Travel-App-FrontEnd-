import './CommentButtonModal.css'

function CommentButtonModal({ children, show, setShow, setReFetch }) {
    return show && (
        <div className="modal-bg">
            <div className="modal-fg">
                {children}
            </div>
        </div>
    )
}

export default CommentButtonModal;
