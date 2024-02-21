const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const fetchChildcareFacilities = require('./src/controllers/childcare-facilities-controller');
const errorHandler = require('./src/middlewares/error-handler');
const fetchGeocode = require('./src/controllers/geocode-controller');

// define CORS
app.use(cors());

// Define middleware for parsing JSON requests
app.use(express.json());

app.get('/api/childcare-facilities', async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not provided
    const pageSize = req.query.pageSize; // Default to 10 if not provided
    const sortOrder = req.query.sortOrder || ''; // Default to ascending order if not provided

    const facilities = await fetchChildcareFacilities(
      page,
      pageSize,
      sortOrder
    );

    res.json(facilities);
  } catch (error) {
    errorHandler(
      req,
      res,
      error,
      'An error occurred while fetching childcare facility data.'
    );
  }
});

app.get('/api/geocode', async (req, res) => {
  try {
    const address = req.query.address;
    const location = await fetchGeocode(address);
    res.json(location);
  } catch (error) {
    errorHandler(
      req,
      res,
      error,
      'An error occurred while fetching geocode data.'
    );
  }
});

// Error handling middleware
app.use(errorHandler);

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/api/childcare-facilities');
  }, 100);
});

app.use(connectLiveReload());

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
