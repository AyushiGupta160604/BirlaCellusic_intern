import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ requestId }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', { requestId, feedback });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Feedback:</label>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;