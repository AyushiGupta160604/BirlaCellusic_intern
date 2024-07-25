// feedbackController.js
const Request = require('./models/Request');

const saveFeedback = async (req, res) => {
  try {
    const { requestId, feedback } = req.body;
    const request = await Request.findById(requestId);
    request.feedback = feedback;
    await request.save();
    res.json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send('Server error');
  }
};