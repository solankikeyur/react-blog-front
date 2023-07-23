import { useState } from "react";
import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import Request from "../../Request";
import ErrorMessage from "../Error/ErrorMessage";
import Toast from "../Toast/Toast";
import { success, failure } from "../Toast/Methods";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Request.post("api/register", formData)
      .then((response) => {
        if(response.status === 200) {
          success("Registration successfull. Please login.");
          navigate("/login");
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
          <h3>Register</h3>
          <hr />
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                name="name"
              />
              <ErrorMessage message={errors.name}></ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <ErrorMessage message={errors.email}></ErrorMessage>

            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <ErrorMessage message={errors.password}></ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="password_confirmation"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting ? true : false}>
              Register
            </button>
            <hr />
            <Link to="/login" type="button" className="btn btn-link">
              Login
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

export default Register;
