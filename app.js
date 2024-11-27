const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs=require('fs');
const { addBulkData, createIndex } = require('./config/addIndex');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); 
app.use(cookieParser()); 

app.use('/search',require('./routes/searchRoute'))

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
