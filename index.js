require('dotenv').config();
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const homeRoutes = require('./routes/home');
const smsRoutes = require('./routes/sms');

const PORT = process.env.PORT || 5000;

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/sms', smsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
