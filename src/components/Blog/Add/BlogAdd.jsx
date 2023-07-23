import Front from "../../Layout/Front";
import ReactQuill from 'react-quill';
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

const BlogAdd = () => {
  const [value, setValue] = useState('');
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
  return (
    <Front headerText="Add New Blog">
      <div className="row gx-4 gx-lg-5 justify-content-center mt-4 mb-4">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <form>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="shortDesc">Short Description</label>
                  <textarea id="shortDesc" className="form-control"></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-4">Save</button>

          </form>
        </div>
      </div>
    </Front>
  );
};

export default BlogAdd;
