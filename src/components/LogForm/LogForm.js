import './LogForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleButton from '../SingleButton/SingleButton';

const LogForm = () => {
  const { index } = useParams();
  const URL = process.env.REACT_APP_API_URL;
  console.log(index);
  const newForm = index === undefined;
  const navigate = useNavigate();
  console.log(newForm);
  const [log, setLog] = useState({
    captainName: '',
    title: '',
    post: '',
    daysSinceLastCrisis: 0,
    mistakesWereMadeToday: false,
  });

  useEffect(() => {
    const preFill = async () => {
      const oldLog = await axios.get(URL + '/logs/' + index);
      setLog(oldLog.data);
    };

    !newForm && preFill();
  }, []);

  const handleInputChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckChange = (event) => {
    setLog({ ...log, [event.target.id]: !log.mistakesWereMadeToday });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = async () => {
      await axios.post(URL + '/logs', log);
      navigate('/logs');
    };
    const editPost = async () => {
      await axios.put(URL + '/logs/' + index, log);
      navigate('/logs/' + index);
    };
    newForm ? newPost() : editPost();
  };

  return (
    <form className="LogForm" onSubmit={handleSubmit}>
      <label htmlFor="captainName">Captain's Name</label>
      <input
        type="text"
        id="captainName"
        value={log.captainName}
        onChange={handleInputChange}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={log.title}
        onChange={handleInputChange}
      />
      <label htmlFor="post">Post</label>
      <textarea id="post" value={log.post} onChange={handleInputChange} />
      <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis</label>
      <input
        type="number"
        id="daysSinceLastCrisis"
        value={log.daysSinceLastCrisis}
        onChange={handleInputChange}
      />
      <label htmlFor="mistakesWereMadeToday">Mistakes were made today</label>
      <input
        type="checkbox"
        id="mistakesWereMadeToday"
        checked={log.mistakesWereMadeToday}
        onChange={handleCheckChange}
      />
      <SingleButton buttonData={'Back'} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LogForm;