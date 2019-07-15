const express = require('express');

const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

// import routes
const postsRoute = require('./routes/posts');

// middleware
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
app.use('/posts', postsRoute);

// routes
app.get('/', (req, res) => {
	res.send('We are on home.');
});

// conect to MongoDB
mongoose.connect(
	process.env.MONGODB_CONNECTION,
	{ useNewUrlParser: true },
	() => console.log('Connected to MongoDB')
);

app.listen(3000);
