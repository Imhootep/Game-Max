const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser} = require('./middleware/auth.middleware');
const cors = require('cors');
let port = process.env.PORT || 8000;

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', '*'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);

app.use('/uploads', express.static('uploads')); 

app.use('/validate', userRoutes);

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})