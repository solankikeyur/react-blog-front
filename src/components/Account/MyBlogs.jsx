import { useEffect, useState } from "react";
import BlogCard from "../Blog/BlogCard";
import {Link} from "react-router-dom"
import Request from "../../Request";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Request.get("api/blog/getUserBlogs").then(({data: response}) => {
      if(response.code === 200) {
        setBlogs(response.data.blogs);
      }
    }).catch(({error}) => {
      console.log(error);
    })
  }, []);

  return (
    <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="m-4">
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h2 className="text-primary">My Blogs</h2>
              <Link to="/blog/add">
              <button className="btn btn-primary btn-md">Add New Blog</button>
              </Link>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                { blogs && blogs.length > 0 ? (
                  (
                    blogs.map((blog) => (
                      <BlogCard key={blog.id} id={blog.id} title={blog.title} shortDesc={blog.short_description} createdAt={blog.created_at} showActions={true} postedBy={blog.user.name} ></BlogCard>
                    ))
                  )
                ) : <p>No blogs found.</p> }
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MyBlogs
