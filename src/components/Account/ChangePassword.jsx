import PropTypes from "prop-types";

const ChangePassword = ({setChangePassword}) => {
    
  return (
    <form className="m-4">
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input type="text" className="form-control" id="name"></input>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input type="text" className="form-control" id="name"></input>
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
