import React from "react"; 
import "./MyModal.css";
import { Modal, Button } from "../../libraries/libraries";
export const MyModal = ({showModal, handleClose, deleteItemId,handleDeleteCar }) => {
    return (<>
        <Modal
            show={showModal}
            onHide={() => handleClose({ status: "cancel" })}
            dialogClassName="custom-modal customModal"
        >
            <Modal.Header closeButton className="headerLine" onClick={() => handleClose({ status: "cancel" })} />
            <Modal.Body>
                <div className="text-center">
                    <p className="delete-pop-up-message">Are You Sure You Want To <br />
                        Delete This Car
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center footerLine">
                <Button className="btn btn-light cancelbutton" onClick={() => handleClose({ status: "cancel" })}>
                    Cancel
                </Button>
                <Button className="btn btn-light deletebutton" onClick={() => handleDeleteCar(deleteItemId)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal >
    </>

    );
}; 