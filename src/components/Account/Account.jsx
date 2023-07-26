import { useEffect, useState } from "react";
import Front from "../Layout/Front";
import ChangePassword from "./ChangePassword";
import MyBlogs from "./MyBlogs";
import Request from "../../Request";
import Toast from "../Toast/Toast";
import { success, failure } from "../Toast/Methods";
import ErrorMessage from "../Error/ErrorMessage";

const Account = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [user, setUser] = useState({name: "", email: ""});
  const [errors, setErrors] = useState({name: "", email: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUser({...user,[e.target.name]: e.target.value});
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Request.post("api/user/profile", user).then(({data}) => {
      success("Profile updated");
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

  useEffect(() => {
    setIsSubmitting(true);
    Request.get("api/user/profile").then(({data}) => {
      if(data && data.data) {
        setUser(data.data);
      }
      setIsSubmitting(false);
    }).catch((error) => {
      console.log(error);
      setIsSubmitting(false);
    })
  }, [])


  return (
    <Front headerText="My Account">
      <Toast></Toast>
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          {!changePassword ? (
            <form className="m-4" onSubmit={handleProfileSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={user.name}
                    ></input>
                    <ErrorMessage message={errors.name} ></ErrorMessage>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={user.email}
                    ></input>
                    <ErrorMessage message={errors.email} ></ErrorMessage>
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
                onClick={() => setChangePassword(true)}
                
              >
                Change Password
              </button>
            </form>
          ) : (
            <ChangePassword
              setChangePassword={setChangePassword}
            ></ChangePassword>
          )}
        </div>
      </div>
      <MyBlogs></MyBlogs>
    </Front>
  );
};

export default Account;
