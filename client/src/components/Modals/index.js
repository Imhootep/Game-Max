import React from 'react'

const Modal = ({showModal, children, hideModal}) => {
    return (
        showModal && (
            <div className="modalBackground" onClick={hideModal}>
                <div className="modal-container">
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal
