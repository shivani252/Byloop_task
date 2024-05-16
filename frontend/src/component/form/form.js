import { Form } from "../../pages/index.js";
import { useLocation, useNavigate,useState } from "../../libraries/libraries.js";
import {
  isValidConformPassword,
  validEmail,
  validName,
  validPassword,
} from "../../validation/validation";
import { dashboard, signIn } from "../../routes/route";
import { signInApi, signUpApi, handleErrorResponse, handleSuccessResponse } from "../../service/index.js";

export const FormLogic = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === signIn;
  const navigate = useNavigate();
  let intialValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValue, setFormValue] = useState(intialValue);
  const [formErr, setFormErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = checkValidation(formValue);
    setFormErr(err);

    if (Object.keys(err).length === 0) {
      try {
        const param = {
          email: formValue.email,
          password: formValue.password,
        };
        if (!isSignInPage) param.name = formValue.name;

        let response = !isSignInPage
          ? await signUpApi(param)
          : await signInApi(param);
        handleSuccessResponse(response, response?.data?.message);
        isSignInPage &&
          localStorage.setItem("access_token", response?.data?.admin?.token);
          localStorage.setItem("userName", response?.data?.admin?.name);
        navigate(isSignInPage ? dashboard : signIn);
      } catch (err) {
        handleErrorResponse(err);
      }
    }
  };

  const handleNavigatation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const checkValidation = (formValue) => {
    let error = {};
    error = validEmail(formValue.email, { ...error }, "email", "email");
    error = validPassword(
      formValue.password,
      { ...error },
      "password",
      "password"
    );
    if (!isSignInPage) {
      error = validName(formValue.name, { ...error }, "name", "name");
      error = isValidConformPassword(
        formValue.password,
        formValue.confirmPassword,
        { ...error },
        "confirmPassword",
        "confirm password"
      );
    }
    return error;
  };

  return (
    <>
      <Form
        isSignInPage={isSignInPage}
        handleNavigatation={handleNavigatation}
        formValue={formValue}
        formErr={formErr}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
