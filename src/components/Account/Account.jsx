import { useState } from "react";
import Front from "../Layout/Front";
import ChangePassword from "./ChangePassword";
import MyBlogs from "./MyBlogs";

const Account = () => {
  const [changePassword, setChangePassword] = useState(false);
  return (
    <Front headerText="My Account">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          {!changePassword ? (
            <form className="m-4">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                    ></input>
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
                    ></input>
                  </div>
                </div>
              </div>
              <button
                className="form-control btn-md btn-primary btn mt-3"
                type="submit"
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
