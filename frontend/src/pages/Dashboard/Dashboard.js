import React from "react";
import "./Dashboard.css"
import { useState } from "../../libraries/libraries.js";
import { HeaderLogic } from "../../component/index.js";
import { MyModal, Modal } from "../index.js";
export const Dashboard = ({
  handleSearchFilter,
  handleDeleteCar,
  handleSubmit,
  carData,
  formErr,
  formValue,
  handleChange,
  tableHeading,
  setFormValue,
  setFormErr,
  openNewModal, setNewModal,
  showModal,
  deletedId,
  handleOpenModal,
  handleCloseModal
}) => {
  const [editData, setEditData] = useState();
  return (
    <>
      <HeaderLogic />
      <Modal
        setFormErr={setFormErr}
        formErr={formErr}
        formValue={formValue}
        handleChange={handleChange}
        editData={editData}
        handleSubmit={handleSubmit}
        setFormValue={setFormValue}
        openNewModal={openNewModal}
        setNewModal={setNewModal}
      />
      <MyModal
        showModal={showModal}
        handleClose={handleCloseModal}
        deleteItemId={deletedId}
        handleDeleteCar={handleDeleteCar}
      />
      <div className="heading-outer-div">
        <div className="container">
          <div className="row mt-3">
            <h5 className="header-heading">CARS DATA</h5>
            <div className="header-row">
              <div className="header-search">
                <div className="form-group has-search me-2">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input type="search" onChange={(e) => handleSearchFilter(e)} className="form-control search-field" placeholder="Search" />
                </div>
                <div className="square-icon">
                  <i data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => setNewModal(true)} className="fa fa-plus-square"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive  mt-4 table-design">
            <table className="table table-bordered">
              <thead>
                <tr className="table-header" >
                  {tableHeading && tableHeading.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {carData && carData.length > 0 && carData.map((item, index) =>
                  <tr key={index} >
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td><i className="fa fa-pencil" onClick={() => setEditData(item)} data-bs-toggle="modal" data-bs-target="#myModal"></i>&nbsp;&nbsp;&nbsp;<i onClick={() => handleOpenModal(item._id)} className="fa fa-trash"></i></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};


