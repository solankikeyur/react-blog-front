import BlogCard from "../Blog/BlogCard";
import {Link} from "react-router-dom"

const MyBlogs = () => {
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
                <BlogCard showActions={true}></BlogCard>
                <BlogCard showActions={true}></BlogCard>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MyBlogs
