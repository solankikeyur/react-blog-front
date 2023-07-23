import PropTypes from "prop-types";

const BlogCard = ({ showActions }) => {
  return (
    <>
      {/* Post preview*/}
      <div className="post-preview">
        <a href="post.html">
          <h2 className="post-title">
            Man must explore, and this is exploration at its greatest
          </h2>
          <h3 className="post-subtitle">
            Problems look mighty small from 150 miles up
          </h3>
        </a>
        <p className="post-meta">
          Posted by
          <a href="#!">Start Bootstrap</a>
          on September 24, 2023
        </p>
        {showActions && (
          <>
            <button className="btn btn-sm btn-primary">Edit</button>
            <button
              className="btn btn-sm btn-danger"
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </>
        )}
      </div>
      {/* Divider*/}
      <hr className="my-4" />
    </>
  );
};

BlogCard.propTypes = {
  showActions: PropTypes.bool,
};

export default BlogCard;
