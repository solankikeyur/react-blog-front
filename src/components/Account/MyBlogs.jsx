import { useEffect, useState } from "react";
import BlogCard from "../Blog/BlogCard";
import { Link } from "react-router-dom";
import Request from "../../Request";
import Pagination from "../Utils/Pagination";
import Loader from "../Utils/Loader";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Request.get(`api/blog/getUserBlogs?page=${currentPage}`)
      .then(({ data: response }) => {
        if (response.code === 200) {
          setBlogs(response.data.blogs.data);
          setPaginationLinks(response.data.blogs.links);
          setCurrentPage(response.data.blogs.current_page);
        }
        setIsLoading(false);
      })
      .catch(({ error }) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage]);

  const changePage = (url) => {
    if (url) {
      let paramString = url.split("?")[1];
      let queryString = new URLSearchParams(paramString);
      setCurrentPage(queryString.get("page"));
    }
  };

  return (
    <div className="row gx-4 gx-lg-5 justify-content-center">
      <div className="col-md-10 col-lg-8 col-xl-7">
        <div className="m-4">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="text-primary">My Blogs</h2>
            <Link to="/blog/add">
              <button className="btn btn-primary btn-md">Add New Blog</button>
            </Link>
          </div>
          <hr />
          <div className="row">
            {isLoading ? (
              <Loader></Loader>
            ) : (
              <div className="col-12">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      shortDesc={blog.short_description}
                      createdAt={blog.created_at}
                      showActions={true}
                      postedBy={blog.user.name}
                    ></BlogCard>
                  ))
                ) : (
                  <p>No blogs found.</p>
                )}
                {paginationLinks && paginationLinks.length > 0 && (
                  <Pagination
                    paginationLinks={paginationLinks}
                    changePage={changePage}
                  ></Pagination>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
