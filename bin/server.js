const mongoose = require('mongoose');

const app = require('../app');

require('dotenv').config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Server launch error: ${error}`);
    process.exit(1);
  });
