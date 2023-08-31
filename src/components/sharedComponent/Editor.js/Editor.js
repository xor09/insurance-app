import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline',
    'color', 'background', 'align', 'link', 'image', 'video'
  ];

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleSave = () => {
    // Make an API call to send the editor data
    fetch('http://localhost:8080/save-editor-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ editorData: editorHtml }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Output the response from the server
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        placeholder="Write something..."
        modules={modules}
        formats={formats}
        style={{ height: '500px' }}
      />
      <div className="preview">
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
        <button onClick={handleSave}>Save Editor Data</button>
      </div>
    </div>
  );
};

export default Editor;
