import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import Request from "../../Request";
import Loader from "../Utils/Loader";
import userStore from "../../stores/UserStore";
import Pagination from "../Utils/Pagination";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationLinks, setPaginationLinks] = useState([]);
  // const [currentPage, setCurrentPage] = useState();
  const {currentPage, setCurrentPage} = userStore();

  useEffect(() => {
    setIsLoading(true);
    Request.get(`api/blog/getAllBlogs?page=${currentPage}`)
      .then(({ data: response }) => {
        if (response.code === 200) {
          setBlogs(response.data.blogs.data);
          setPaginationLinks(response.data.blogs.links);
          setCurrentPage(response.data.blogs.current_page);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        setIsLoading(false);
      })
      .catch((error) => {
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
    <div className="row gx-4 gx-lg-5 justify-content-center" >
      <div className="col-md-10 col-lg-8 col-xl-7">
        {isLoading ? (
          <Loader></Loader>
        ) : blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              shortDesc={blog.short_description}
              createdAt={blog.created_at}
              postedBy={blog.user.name}
              id={blog.id}
            ></BlogCard>
          ))
        ) : (
          <p>No blogs found.</p>
        )}

        {/* Pager*/}
        {paginationLinks && paginationLinks.length > 0 && (
          <Pagination paginationLinks={paginationLinks} changePage={changePage} ></Pagination>
        )}
      </div>
    </div>
  );
};

export default BlogList;
 