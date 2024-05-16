import { useEffect, useState } from "../../libraries/libraries.js";
import { Dashboard } from "../../pages/index.js";
import { handleErrorResponse, handleSuccessResponse,addCar, deleteCar, searchKeyFilter, showCar, updateCar  } from "../../service/index.js";
import { isEmpty, isNumeric } from "../../validation/validation";

export const DashboardLogic = () => {
  const [carData, setCarData] = useState();
  const [deletedId, setDeletedId] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (id) => {
    setDeletedId(id);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
  const intialValue = {
    _id: "",
    name: "",
    brand: "",
    price: "",
    stock: ""
  }

  const [formValue, setFormValue] = useState(intialValue);
  const [formErr, setFormErr] = useState({});
  const [openNewModal, setNewModal] = useState(false)
  const [editNew, setEditNew] = useState(false);
  const tableHeading = [
    "Name", "Brand", "Price", "Stock", "Action"
  ]
  useEffect(() => {
    fetchData();
  }, [editNew])


  const fetchData = async () => {
    try {
      let response = await showCar();
      setCarData(response.data.result);

    } catch (err) {
      handleErrorResponse(err);
    }
  }
  const handleSubmit = async (e, action, closeButtonObj) => {
    e.preventDefault();
    try {
      let err = {};
      err = checkValidation(formValue)
      setFormErr(err)
      if ((Object.keys(err).length === 0)) {
        let response;
        if (action === 'Submit') {
          const param = {
            name: formValue.name,
            brand: formValue.brand,
            price: formValue.price,
            stock: formValue.stock
          }
          response = await addCar(param)
          handleSuccessResponse(response?.data?.message)
          setEditNew(!editNew)
        }
        else {
          response = await updateCar(formValue)
          handleSuccessResponse(response?.data?.message)
          setEditNew(!editNew)

        }
        setNewModal(false);
        if (closeButtonObj) {
          closeButtonObj.click();
        }
      }
    }
    catch (err) {
      handleErrorResponse(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const checkValidation = (formValue) => {
    let error = {};

    error = isEmpty(formValue.name, { ...error }, "name", "name");
    error = isEmpty(formValue.brand, { ...error }, "brand", "brand");
    error = isNumeric(formValue.price, { ...error }, "price", "price");
    error = isNumeric(formValue.stock, { ...error }, "stock", "stock");
    return error;
  }


  const handleDeleteCar = async (_id) => {
    try {
      let response = await deleteCar(_id);
      handleSuccessResponse(response, 'Car deleted successfully !!!')
      setEditNew(!editNew)
      handleCloseModal();
    }
    catch (err) {
      handleErrorResponse(err);
    }
  }

  const handleSearchFilter = async (e) => {
    try {
      if (e.target.value === null || e.target.value === "") {
        fetchData();
      }
      else {
        let param = {
          searchKey: e.target.value
        }
        let response = await searchKeyFilter(param)
        setCarData(response.data.data);
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return <>
    <Dashboard
      handleSearchFilter={handleSearchFilter}
      handleDeleteCar={handleDeleteCar}
      formValue={formValue}
      formErr={formErr}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      carData={carData}
      tableHeading={tableHeading}
      setFormValue={setFormValue}
      setFormErr={setFormErr}
      openNewModal={openNewModal}
      setNewModal={setNewModal}
      showModal={showModal}
      deletedId={deletedId}
      handleOpenModal={handleOpenModal}
      handleCloseModal = {handleCloseModal}
    />
  </>
};
