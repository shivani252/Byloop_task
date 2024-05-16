import { apiCall } from "./base"

const addCar = async (param) => {
    let response = await apiCall("/car/add", "POST", param);
    return response;
}

const showCar = async () => {
    let response = await apiCall("/car/show", "GET");
    return response;
}
const updateCar = async (param) => {
    let response = await apiCall("/car/edit", "PUT", param);
    return response;
}
const deleteCar = async (param) => {
    let response = await apiCall(`/car/delete/${param}`, "DELETE");
    return response;
}

const searchKeyFilter = async (param) => {
    let response = await apiCall(`/car/search/${param.searchKey}`, "GET");
    return response;
}

export { addCar, showCar, updateCar, deleteCar,searchKeyFilter };