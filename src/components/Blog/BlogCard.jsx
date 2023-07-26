import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Request from "../../Request";
import { failure, success } from "../Toast/Methods";
import { useRef } from "react";

const BlogCard = ({
  showActions,
  title,
  shortDesc,
  createdAt,
  postedBy,
  id,
}) => {
  const blogRef = useRef();
  const handleDelete = () => {
    if (confirm("Are you sure ?")) {
      Request.delete(`api/blog/delete/${id}`)
        .then(({ data: response }) => {
          if (response.code === 200) {
            success(response.data.message);
            blogRef.current.remove();
          } else {
            failure(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          failure("Unable to delete");
        });
    }
  };
  return (
    <div ref={blogRef}>
      {/* Post preview*/}
      <div className="post-preview">
        <Link to={`/blog/${id}`}>
          <h2 className="post-title">{title}</h2>
          <h3 className="post-subtitle">{shortDesc}</h3>
        </Link>
        <p className="post-meta">
          Posted by
          <a style={{ paddingLeft: "5px", paddingRight: "5px" }}>{postedBy}</a>
          on {createdAt}
        </p>
        {showActions && (
          <>
            <Link to={`/blog/edit/${id}`} className="btn btn-sm btn-primary text-white">Edit</Link>
            <button
              className="btn btn-sm btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
      {/* Divider*/}
      <hr className="my-4" />
    </div>
  );
};

BlogCard.propTypes = {
  showActions: PropTypes.bool,
  title: PropTypes.string,
  shortDesc: PropTypes.string,
  createdAt: PropTypes.string,
  postedBy: PropTypes.string,
  id: PropTypes.number,
};

export default BlogCard;
