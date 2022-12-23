const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const sessions = require('express-session');
const ejsMate = require('ejs-mate');
const twilio = require('twilio');

const PORT = process.env.PORT || 5000;

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).render('home');
});

app.post('/sms', (req, res) => {
    const { phone, text } = req.body;

    const numbers = phone.split(',');

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
        numbers.forEach(async (number) => {
            await client.messages
                .create({
                    to: number, // Text this number
                    body: text,
                    from: '+15642140258', // From a valid Twilio number
                })
                .then((message) => message.sid);
        });
    } catch (error) {
        console.log(error);
    }
    // Pass a text message to the page
    res.status(200).render('show', { text, phone });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
