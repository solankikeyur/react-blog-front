import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import Request from "../../Request";
import { useState } from "react";
import ErrorMessage from "../Error/ErrorMessage";
import userStore from "../../stores/UserStore";
import Toast from "../Toast/Toast";
import { success, failure } from "../Toast/Methods";

const Login = () => {
  const userState = userStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    grant_type: "password",
    scope: "users",
    client_id: "2",
    client_secret: "BblSLXXESBtyFTveVPSpaJXlcL46VGGTG8saaDst",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    formData.username = formData.email;
    Request.post("api/login", formData)
      .then((response) => {
        if (response.status === 200) {
          Request.post("oauth/token", formData)
            .then((response) => {
              setErrors({
                email: "",
                password: "",
              });
              userState.setAuthToken(response.data.access_token);
              success("Login successfull.");
              navigate("/");
              setIsSubmitting(false);

            })
            .catch((error) => {
              failure("Invalid login details");
              setIsSubmitting(false);
            });
        }
        setIsSubmitting(false);
      })
      .catch(({ response }) => {
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          failure("Please fix errors.");
        } else {
          failure("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className="back">
      <Toast></Toast>
      <div className="div-center">
        <div className="content">
          <h3>Login</h3>
          <hr />
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={handleEvent}
                name="email"
              />
              <ErrorMessage message={errors.email}></ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleEvent}
                name="password"
              />
              <ErrorMessage message={errors.password}></ErrorMessage>
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting ? true : false}>
              Login
            </button>
            <hr />
            <Link to="/register" type="button" className="btn btn-link">
              Register
            </Link>
            <Link
              to="/"
              type="button"
              className="btn btn-link"
              style={{ marginLeft: "20px" }}
            >
              Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
