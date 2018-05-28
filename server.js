const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

//passport
const passport = require('passport');

// bodyParser
const bodyParser = require('body-parser');

// routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
  console.log('App is running!');
});