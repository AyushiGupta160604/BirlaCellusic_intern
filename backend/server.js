const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const agencyController = require('./routes/agencyController');
const houseController = require('./routes/houseController');
const colonyController = require('./routes/colonyController');
const requestController = require('./routes/requestController');
const userController = require('./routes/userController');

const Request = require('./models/requestSchema');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.options('/api/agencies/:id', cors());
app.options('/api/houses/:id', cors());
app.options('/api/colonies/:id', cors());
app.options('/api/requests/:id', cors());
app.options('/api/users/:id', cors());
app.options('*', cors());

app.use('/api/agencies', agencyController);
app.use('/api/houses', houseController);
app.use('/api/colonies', colonyController);
app.use('/api/requests', requestController);
app.use('/api/users', userController);

mongoose.connect('mongodb://0.0.0.0:27017/birlaCellulosedb', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


app.get('/api/agency-report', async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
    const requests = await Request.find({
      requestDate: { $gte: startDate, $lte: endDate }
    });

    res.json(requests);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});