import { useParams } from "react-router-dom";
import Front from "../../Layout/Front";
import Request from "../../../Request";
import {useEffect, useState } from "react";
import { failure } from "../../Toast/Methods";

const BlogDetail = (props) => {
  const {blogId} = useParams();
  const [blog, setBlog] = useState("");
  useEffect(() => {
    Request.get(`api/blog/get/${blogId}`).then(({data:response}) => {
      if(response.code === 200) {
        setBlog(response.data.blog)
        console.log(blog)
      } else {
        failure(response.data.message);
      }
    }).catch((error) => {
      failure("Something went wrong");
    })
  }, [])

  if(blog) {
    return (
      <Front headerText={blog.title} subHeading={blog.short_description} headerImg={blog.image}>
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7 mb-4" dangerouslySetInnerHTML={{__html: blog.content}}>
        </div>
      </div>
    </Front>
    )
  } else {
    return (
      <h2>Loading...</h2>
   );
  }

  
};

export default BlogDetail;
