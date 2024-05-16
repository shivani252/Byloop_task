import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "../routes/route";

const baseUrl = "http://localhost:3000";
const headers = (token, isFormData) => {
  const baseHeaders = {
    Accept: "application/json",
    authorization: token,
  };

  if (isFormData) {
    return {
      ...baseHeaders,
      "Content-Type": "multipart/form-data",
    };
  } else {
    return {
      ...baseHeaders,
      "Content-Type": "application/json",
    };
  }
};

const apiCall = async (path, method, body = {}) => {
    const url = `${baseUrl}${path}`;
  const token = localStorage.getItem("access_token");
  const isFormData = body instanceof FormData;
  const config = {
    method,
    url,
    headers: headers(token, isFormData),
  };
  config.data = body;
  const response = await axios(config);
  return response;
};

const handleSuccessResponse = function (response, successMessage) {
  toast.success(successMessage);
};

const handleErrorResponse = function (error, errorMessage) {
  if (error?.response?.status === 401) {
    toast.error(error?.response?.data?.message);
    window.location.href = signIn;
  }
  else{
      toast.error(error?.response?.data?.error);

  }
};

export { apiCall, handleSuccessResponse, handleErrorResponse };
