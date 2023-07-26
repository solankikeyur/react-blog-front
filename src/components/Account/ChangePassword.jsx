import PropTypes from "prop-types";
import { useState } from "react";
import ErrorMessage from "../Error/ErrorMessage";
import Request from "../../Request";
import { success, failure } from "../Toast/Methods";

const ChangePassword = ({setChangePassword}) => {
  
  const [data, setData] = useState({password: "", password_confirmation: ""});
  const [errors, setErrors] = useState({password: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Request.post("api/changePassword", data).then(({data}) => {
      if(data && data.code === 500) {
        failure(data.message);
      } else {
        success("Password updated.");
        setData({password: "", password_confirmation: ""});
        setChangePassword(false);
      }
      setIsSubmitting(false);
      
    }).catch(({response}) => {
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        failure("Please fix errors.");
      } else {
        failure("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    })
  }

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value});
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange}></input>
            <ErrorMessage message={errors.password} ></ErrorMessage>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input type="password" className="form-control" id="passwordConfirmation" name="password_confirmation" onChange={handleChange}></input>
          </div>
        </div>
      </div>
      <button
        className="form-control btn-md btn-primary btn mt-3"
        type="submit"
        disabled={isSubmitting ? true : false}

      >
        Save
      </button>
      <button
        className="form-control btn-sm btn-secondary btn mt-3"
        type="button"
        onClick={() => setChangePassword(false)}
      >
        Cancel
      </button>
    </form>
  );
};

ChangePassword.propTypes = {
    setChangePassword: PropTypes.func
}

export default ChangePassword;
