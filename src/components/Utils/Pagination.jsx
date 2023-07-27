import PropTypes from "prop-types";

const Pagination = ({ paginationLinks, changePage }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {paginationLinks.map((link, index) => (
          <li
            key={index}
            className={`page-item ${
              link.active || !link.url ? "disabled" : ""
            }`}
          >
            <button
              type="button"
              className={`page-link ${link.active && "bg-primary text-white"}`}
              onClick={() => changePage(link.url)}
              tabIndex={link.active ? "-1" : 1}
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    paginationLinks: PropTypes.array,
    changePage: PropTypes.func
}

export default Pagination;
