import React, { useState } from 'react';
import './QueryAsking.css'; // Import your CSS file for styling
import AleartBox from '../sharedComponent/alertBox/AleartBox';
import AleartBoxSuccess from '../sharedComponent/alertBoxSuccess/AleartBoxSuccess';
import { askQuestion } from '../../service/customerApis';
import questionMarkSVG from '../../assets/images/question-circle.svg';

function QueryAsking(props) {
  const token = localStorage.getItem('auth')
  const customerid = props.user.id;

  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('')
  const [responseData, setResponseData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!subject || subject.length===0){
      setAlert("Kindly add subject");
      return;
    }
    if(!question || question.length === 0){
      setAlert("Ask some question");
      return;
    }
    const query = {
      subject : subject,
      question : question
    }
    try {
      const response = await askQuestion(customerid, query, token);
      setAlertSuccess(response.data)
      setSubject('')
      setQuestion('')
    } catch (e) {
      setAlert(e.response.data);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
    {alert && <AleartBox message={alert} setAlert={setAlert}/>}
    {alertSuccess && <AleartBoxSuccess message={alertSuccess} setAlert={setAlertSuccess}/>}
    <button className={`button query-button floating-component ${!isVisible ? 'visible' : ''}`} onClick={toggleVisibility} >
        <img src={questionMarkSVG} alt="Question Mark" className="svg-image" />
    </button>
    <div className={`floating-component ${isVisible ? 'visible' : ''}`}>
     
      {isVisible && (
        <div className="content">
          <div data-bs-theme="dark">
          <button type="button" class="btn-close" onClick={toggleVisibility}></button>
        </div>
        <div className="bg-light p-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={subject}
                  onChange={(e)=>setSubject(e.target.value)}
                  placeholder="Write subject"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="query" className="form-label">Query</label>
                <textarea
                  className="form-control"
                  id="question"
                  rows={10}
                  cols={40}
                  value={question}
                  onChange={(e)=>setQuestion(e.target.value)}
                  placeholder="Write a question"
                />
              </div>
              <button type="submit" className="btn btn-success">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default QueryAsking;
