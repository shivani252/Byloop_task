import React from 'react'
import './Modal.css'
import { useEffect } from "../../libraries/libraries"
export const Modal = ({ editData,
    formErr,
    formValue,
    handleChange,
    handleSubmit,
    setFormValue,
    setFormErr,
    openNewModal,
    setNewModal
}) => {

    useEffect(() => {
        if (openNewModal) {
            setFormValue((prevValue) => ({
                ...prevValue,
                name: "",
                brand: "",
                price: "",
                stock: ""
            }))
        }
        editData && setFormValue((prevValue) => ({
            ...prevValue,
            _id: editData?._id,
            name: editData?.name,
            brand: editData?.brand,
            price: editData?.price,
            stock: editData?.stock
        }))

        setFormErr({})

    }, [editData, openNewModal])

    const getButtonName = () => {
        return editData ? "Update" : "Submit"
    }
    const handleCloseModal = () => {
        setNewModal(false)
    }
    const closeButtonObject = document.getElementById("closeModal")
    return <>

        <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h4 className="modal-title">{editData ? <>Edit Car</> : <>Add Car</>}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formValue?.name}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <small className="err-tag">{formErr?.name}</small>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="dob">Brand :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="brand"
                                    value={formValue?.brand}
                                    onChange={(e) => handleChange(e)}
                                />
                                <small className="err-tag">{formErr?.brand}</small>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="email">Price :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    value={formValue?.price}
                                    onChange={(e) => handleChange(e)}
                                />
                                <small className="err-tag">{formErr?.price}</small>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="address">Stock :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="stock"
                                    value={formValue?.stock}
                                    onChange={(e) => handleChange(e)}
                                />
                                <small className="err-tag">{formErr?.stock}</small>
                            </div>
                            <div className="modal-btn-div mt-4">
                                <button data-bs-dismiss="modal" id="closeModal" onClick={() => handleCloseModal()} className="btn btn-danger mt-4" style={{ float: 'right' }}>Close</button>
                                <button className="btn btn-success mt-4" onClick={(e) => handleSubmit(e, getButtonName(), closeButtonObject)} style={{ float: 'right' }}>{getButtonName()}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}