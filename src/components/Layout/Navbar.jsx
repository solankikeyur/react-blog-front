import defaultHeaderImg from "../../assets/img/home-bg.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userStore from "../../stores/UserStore";
import Request from "../../Request";
import { success } from "../Toast/Methods";


const Navbar = ({ headerText, subHeading, headerImg }) => {
  const { authToken, setAuthToken } = userStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    Request.post("api/logout")
      .then(() => {
        localStorage.removeItem("access_token");
        setAuthToken("");
        success("Logout successfull");
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/">
            React Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-lg-3 py-3 py-lg-4"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
              {authToken ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link px-lg-3 py-3 py-lg-4"
                      to="/my-account"
                    >
                      My Account
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link px-lg-3 py-3 py-lg-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link px-lg-3 py-3 py-lg-4"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link px-lg-3 py-3 py-lg-4"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header
        className="masthead"
        style={ !headerImg ? { backgroundImage: `url(${defaultHeaderImg})`} : {backgroundImage : `url(${headerImg})`}}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>{headerText ? headerText : "React Blog"}</h1>
                <span className="subheading">
                  {subHeading ? subHeading : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};

Navbar.propTypes = {
  headerText: PropTypes.string,
  subHeading: PropTypes.string,
  headerImg: PropTypes.string,
};

export default Navbar;
