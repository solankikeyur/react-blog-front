import { Link, useNavigate, useParams } from "react-router-dom";
import Front from "../../Layout/Front";
import Request from "../../../Request";
import {useEffect, useState } from "react";
import { failure } from "../../Toast/Methods";
import Loader from "../../Utils/Loader";

const BackBtn = ({fullW}) => {
  const navigate = useNavigate();
  return <button className={`btn btn-primary mb-4 ${fullW ? 'form-control' : ''}`} onClick={() => navigate(-1)}>Back</button>;
}

const BlogDetail = () => {
  const {blogId} = useParams();
  const [blog, setBlog] = useState("");
  useEffect(() => {
    Request.get(`api/blog/get/${blogId}`).then(({data:response}) => {
      if(response.code === 200) {
        setBlog(response.data.blog)
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
        <div className="col-md-10 col-lg-8 col-xl-7" style={{display: "flex", flexDirection: "row-reverse"}}>
          <BackBtn></BackBtn>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mb-4" dangerouslySetInnerHTML={{__html: blog.content}}>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7" >
          <BackBtn fullW={true}></BackBtn>
        </div>
      </div>
    </Front>
    )
  } else {
    return (
      <Loader></Loader>
   );
  }
};

export default BlogDetail;
