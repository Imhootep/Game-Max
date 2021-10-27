import React from 'react'

const Modal = ({showModal, children, hideModal, postId}) => {
    return (
        showModal && (
            <div className="modalBackground">
                <div className="modal-container">
                    {children}
                    {/* {console.log("children")}
                    {console.log(children)}
                    {console.log("showmodal ")}
                    {console.log(showModal )}
                    {console.log("hideModal ")}
                    {console.log(hideModal )}
                    {console.log("id:")}
                    {console.log(postId )} */}
                    
                    <div className="modal-footer"  onClick={hideModal}>
                        <button className="modal-btn">Fermer</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default Modal
