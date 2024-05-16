import { apiCall } from "./base";

const signInApi = async (param) => {
    let response = await apiCall("/admin/signin", "POST", param);
    return response;
};

const signUpApi = async (param) => {
  let response = await apiCall("/admin/signup", "POST", param);
  return response;
};

export { signInApi, signUpApi };
