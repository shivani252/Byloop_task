import React from "react";
import "./Form.css";
import { Link } from "../../libraries/libraries.js";
import { signIn, signUp } from "../../routes/route";
export const Form = ({
  isSignInPage,
  formValue,
  formErr,
  handleChange,
  handleSubmit,
  handleNavigatation,
}) => {
  return (
    <>
      <div className="container form-outer-container" id="container">
        <div className="row">
          {isSignInPage ? (
            <>
              <div className="col-lg-6 col-md- col-sm-12 form-container">
                <form action="#" className="w-100" onSubmit={handleSubmit}>
                  <h1 className="center-class">Sign in</h1>
                  <div className="social-container center-class">
                    <Link href="#" className="social">
                      <i className="fa fa-facebook-f" />
                    </Link>
                    <Link href="#" className="social">
                      <i className="fa fa-google" />
                    </Link>
                    <Link href="#" className="social">
                      <i className="fa fa-linkedin" />
                    </Link>
                  </div>
                  <div className="center-class">or use your account</div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={formValue?.email}
                      placeholder="Email"
                    />
                    <small className="err-tag">{formErr?.email}</small>
                  </div>

                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="password"
                      value={formValue?.password}
                      type="password"
                      placeholder="Password"
                    />
                    <small className="err-tag">{formErr?.password}</small>
                  </div>
                  <div>
                    <Link className={` forgot-password-link `} href="#">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="center-class mt-5 w-100">
                  <button className="active-btn mt-3 center-class">Sign In</button>

                  </div>
                </form>
              </div>
              <div className="col-lg-6 col-md- col-sm-12 form-container1">
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    onClick={(e) => {
                      handleNavigatation(e, signUp);
                    }}
                    className="de-active-btn"
                    id="signUp"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-6 col-md- col-sm-12 form-container1">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    onClick={(e) => {
                      handleNavigatation(e, signIn);
                    }}
                    className="de-active-btn"
                    id="signIn"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div className="col-lg-6 col-md- col-sm-12 form-container">
                <form action="#" onSubmit={handleSubmit} className="w-100">
                  <h1 className="center-class">Create Account</h1>
                  <div className="social-container center-class">
                    <Link href="#" className="social">
                      <i className="fa fa-facebook-f" />
                    </Link>
                    <Link href="#" className="social">
                      <i className="fa fa-google" />
                    </Link>
                    <Link href="#" className="social">
                      <i className="fa fa-linkedin" />
                    </Link>
                  </div>
                  <span className="center-class">
                    or use your email for registration
                  </span>
                  <div>
                    <input
                      name="name"
                      onChange={(e) => handleChange(e)}
                      value={formValue?.name}
                      type="text"
                      placeholder="Name*"
                    />
                    <small className="err-tag">{formErr?.name}</small>
                  </div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={formValue?.email}
                      placeholder="Email*"
                    />
                    <small className="err-tag">{formErr?.email}</small>
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={(e) => handleChange(e)}
                      name="password"
                      value={formValue?.password}
                      placeholder="Password*"
                    />
                    <small className="err-tag">{formErr?.password}</small>
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={(e) => handleChange(e)}
                      name="confirmPassword"
                      value={formValue?.confirmPassword}
                      placeholder="Confirm Password*"
                    />
                    <small className="err-tag">
                      {formErr?.confirmPassword}
                    </small>
                  </div>
                  <div className={`${!(Object.keys(formErr).length>0)&& 'd-flex justify-content-center'}`}>
                    <button className="active-btn mt-5">Sign Up</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
