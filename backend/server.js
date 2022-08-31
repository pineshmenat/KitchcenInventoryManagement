const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config/config.env' });

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB)
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.log('error connecting mongoDB', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));
