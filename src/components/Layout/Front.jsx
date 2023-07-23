import Footer from "./Footer"
import Navbar from "./Navbar"
import PropTypes from "prop-types";
import Toast from "../Toast/Toast";

const Front = ({children, headerText, subHeading}) => {
  return (
    <>
    <Navbar headerText={headerText} subHeading={subHeading}></Navbar>
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
  subHeading: PropTypes.string
}

export default Front
 