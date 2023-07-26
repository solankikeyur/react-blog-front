import Footer from "./Footer"
import Navbar from "./Navbar"
import PropTypes from "prop-types";
import Toast from "../Toast/Toast";

const Front = ({children, headerText, subHeading, headerImg}) => {
  return (
    <>
    <Navbar headerText={headerText} subHeading={subHeading} headerImg={headerImg} ></Navbar>
    <Toast></Toast>
    <div className="container px-4 px-lg-5">
    {children}
    </div>
    <Footer></Footer>
    </>
  )
}

Front.propTypes = {
  children: PropTypes.any,
  headerText: PropTypes.string,
  subHeading: PropTypes.string,
  headerImg: PropTypes.string
}

export default Front
 