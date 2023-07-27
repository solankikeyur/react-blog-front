import Front from "../../Layout/Front";
import ReactQuill from 'react-quill';
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ErrorMessage from "../../Error/ErrorMessage";
import Request from "../../../Request";
import { success, failure } from "../../Toast/Methods";
import Toast from "../../Toast/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogAdd = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {blogId} = useParams();
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const [data, setData] = useState({
    title: "",
    short_description: "",
    image: "",
    imagePrev : ""
  });

  const [imagePrev, setImagePrev] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    short_description: "",
    content: "",
    image: ""
  });

  const handleOnChange = (e) => {
    setData({...data, [e.target.name]:e.target.value});
    if(e.target.name === "image") {
      setImagePrev(URL.createObjectURL(e.target.files[0]));
      data.image = e.target.files[0];
      setData(data);
    }
    setErrors({
      title: "",
      short_description: "",
      content: "",
      image: ""
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    data.content = value;
    const URL = blogId ? `update/${blogId}` : "add";
    Request.post(`api/blog/${URL}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(({data:response}) => {
      if(response.code === 200) {
        success(response.data.message);
        navigate("/my-account");
      } else {
        failure(response.data.message);
      }
      setIsLoading(false);
    }).catch(({ response }) => {
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        failure("Please fix errors.");
      } else {
        failure("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if(blogId) {
      setIsLoading(true);
      Request.get(`api/blog/get/${blogId}`).then(({data: response}) => {
        if(response.code === 200) {
          const blog = response.data.blog;
          setData({
            title: blog.title,
            short_description: blog.short_description,
          });
          setImagePrev(blog.image);
          setValue(blog.content);
        }
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
    }
  }, [])

  return (
    <Front headerText={blogId ? `Edit Blog` : `Add New Blog`}>
      <Toast></Toast>
      <div className="row gx-4 gx-lg-5 justify-content-center mt-4 mb-4">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <form onSubmit={handleSubmit} >
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    name="title"
                    onChange={handleOnChange}
                    value={data.title}
                  ></input>
                  <ErrorMessage message={errors.title} ></ErrorMessage>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="shortDesc">Short Description</label>
                  <textarea id="shortDesc" className="form-control" name="short_description" value={data.short_description} onChange={handleOnChange} ></textarea>
                  <ErrorMessage message={errors.short_description} ></ErrorMessage>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <input type="file" onChange={handleOnChange} className="form-control" name="image" id="image" accept=".jpg,.jpeg,.png" ></input>
                  <ErrorMessage message={errors.image} ></ErrorMessage>
                  { imagePrev && <img src={imagePrev} width={200} height={200} className="mt-4" ></img> }
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                  <ErrorMessage message={errors.content} ></ErrorMessage>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-4" disabled={isLoading ? true : false}>Save</button>
            <Link className="btn btn-secondary mt-4" to={"/my-account"} style={{marginLeft: "10px"}} >Cancel</Link>
          </form>
        </div>
      </div>
    </Front>
  );
};

export default BlogAdd;
