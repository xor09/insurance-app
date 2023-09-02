import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { validateEmail } from '../../../service/validation';
import AleartBox from '../alertBox/AleartBox';
import { sendPromotionEmail } from '../../../service/agentApis';
import { useNavigate, useParams } from 'react-router-dom';
import AleartBoxSuccess from '../alertBoxSuccess/AleartBoxSuccess';

const Editor = () => {
  const username = useParams().username
  const navigation = useNavigate();
  const [editorHtml, setEditorHtml] = useState('');
  const [recievers, setRecievers] = useState([])
  const [subject, setSubject] = useState('')
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline',
    'color', 'background', 'align', 'link', 'image', 'video'
  ];

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleSave = async () => {
   
   const validRecievers = recievers.filter(email => validateEmail(email.trim()));
   if(validRecievers.length === 0){
      setAlert("Provide reciever(s) email");
      return;
   }

   if(subject.trim().length === 0){
      setAlert("Enter a subject");
      return;
   }

   if(editorHtml.length === 0){
    setAlert("Provide a body");
    return;
   }
   try{
    setAlertSuccess("Sending mail...")
    const response = await sendPromotionEmail(validRecievers, subject, editorHtml);
    const message = response.data;
    navigation(`/info/${username}/${message}`);
   }catch(e){
    setAlert(e.response.data)
   }
   return;
  };

  const handleRecipient = (e) => {
    const inputString = e.target.value;
    const recievers = inputString.split(',').map(value => value.trim());
    setRecievers(recievers);
  }

  return (
    <div>
      {alert && <AleartBox message={alert} setAlert={setAlert}/>}
      {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess} />}
      <div className="container mt-5 mb-5">
        <form id="emailForm">
            <div className="mb-3 text-start">
                <label for="recipient-email" class="form-label">Reciever email address
                  <small class="text-muted"> (Enter the multiple recipient's email seprated by comma (,) )</small>
                </label>
                <input type="email" class="form-control" id="recipient-email" 
                onChange={(e) => handleRecipient(e)}
                placeholder="recipient email(s)" required />
            </div>
            <div className="mb-3 text-start">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" class="form-control" id="subject" 
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject..." required />
            </div>
            <div className="mb-3 text-start">
                <label for="body" class="form-label">Body</label>
                <ReactQuill
                  value={editorHtml}
                  onChange={handleEditorChange}
                  placeholder="Write something..."
                  modules={modules}
                  formats={formats}
                  style={{ height: '500px' }}
                />
            </div>
            {/* <p className='form-control-lg mt-5'>Preview:</p>
            <div className="preview mb-5 border border-secondary">
              <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
            </div> */}
            <button type="button" class="btn btn-outline-success w-50 mt-5" onClick={handleSave}> <b>Send</b> 📤</button>
        </form>
      </div>
    </div>
  );
};

export default Editor;
