import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'header': [1, 2, false] },],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        }

  return (
    <div className="custom-quill-toolbar custom-quill-editor">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Compose your message here..."
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;