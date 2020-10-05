import React, { Fragment } from 'react'

const Modal = ({ handleClose, show, children }) => {

    const showBackground = show ? "outside-modal display-block" : "outside-modal display-none";
    const showModal = show ? "modal display-block" : "modal display-none";


    return (
        <Fragment>
            <div className={showBackground} onClick={handleClose}>
            </div>
            <div className={showModal}>
                {children}
            </div>
        </Fragment>
    )
}

export default Modal
