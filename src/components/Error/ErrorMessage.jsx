import PropTypes from "prop-types";

const ErrorMessage = ({message}) => {
  return (
    <>
    { message && <small className="text-danger">{message}</small> }
    </>
  )
}

ErrorMessage.propTypes = {
    message: PropTypes.string
}

export default ErrorMessage
