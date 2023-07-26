import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Request from "../../Request";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Request.get("api/blog/getAllBlogs").then(({data:response}) => {

      if(response.code === 200) {
        setBlogs(response.data.blogs);
      }

    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className="row gx-4 gx-lg-5 justify-content-center">
      <div className="col-md-10 col-lg-8 col-xl-7">
        { blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} title={blog.title} shortDesc={blog.short_description} createdAt={blog.created_at}  postedBy={blog.user.name} id={blog.id} ></BlogCard>
          ))
        ) : ( <p>No blogs found.</p> )}
        
        {/* Pager*/}
        {/* <div className="d-flex justify-content-end mb-4">
          <a className="btn btn-primary text-uppercase" href="#!">
            Older Posts →
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default BlogList;
